const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const { exec, spawn } = require("child_process");
const { promisify } = require('util');

const previews = new Map();
const execAsync = promisify(exec);
dotenv.config();

console.log("SERVIDOR NOVO INICIADO");
console.log(__filename);
// Carrega o arquivo de chaves exatamente como estava funcionando no seu projeto original
const serviceAccount = JSON.parse(fs.readFileSync('./firebase-key.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com'
});
async function chamarDeepSeek(promptSistema) {

    const completion = await openai.chat.completions.create({
        model: 'deepseek-chat',

        messages: [
            {
                role: 'system',
                content: promptSistema
            }
        ],

        temperature: 0.45,
        max_tokens: 16000
    });

    let respostaIA = completion.choices?.[0]?.message?.content || '';

    if (!respostaIA) {
        throw new Error(
            'A DeepSeek não retornou nenhum conteúdo.'
        );
    }

    console.log(
        `[Backend] Resposta recebida da DeepSeek (${respostaIA.length} caracteres).`
    );

    // Remove possíveis blocos Markdown
    respostaIA = respostaIA
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

    let dados;

    try {
        dados = JSON.parse(respostaIA);
    } catch (err) {

        console.error(
            '[Backend] JSON inválido retornado pela IA.'
        );

        console.error(respostaIA);

        throw new Error(
            'A IA retornou um JSON inválido.'
        );
    }

    // ===============================
    // DEPENDÊNCIAS
    // ===============================

    let dependencies = [];

    if (Array.isArray(dados.dependencies)) {
        dependencies = dados.dependencies.filter(
            dep => typeof dep === 'string'
        );
    }

    // ===============================
    // ARQUIVOS
    // ===============================

    let files = [];

    // Caso:
    // [
    //   { path, content }
    // ]

    if (Array.isArray(dados)) {

        files = dados;

    }

    // Caso:
    // {
    //    files: [...]
    // }

    else if (Array.isArray(dados.files)) {

        files = dados.files;

    }

    // Caso:
    // {
    //    files: {
    //       "src/App.jsx": "..."
    //    }
    // }

    else if (
        dados.files &&
        typeof dados.files === 'object'
    ) {

        files = Object.entries(dados.files).map(
            ([path, content]) => ({
                path,
                content
            })
        );

    }

    // Garante estrutura válida

    files = files.filter(file =>
        file &&
        typeof file.path === 'string' &&
        typeof file.content === 'string'
    );

    if (!files.length) {
        throw new Error(
            'A IA não retornou arquivos válidos.'
        );
    }

    return {
        dependencies,
        files
    };

}
// ==========================================
// FUNÇÃO PARA SALVAR ARQUIVOS DO PROJETO
// ==========================================

async function salvarArquivosProjeto(projectDir, files) {
    for (const file of files) {

        let content = file.content;

        // Impede que a IA tente criar arquivos fora
        // da pasta do projeto
        const caminhoSeguro = path
            .normalize(file.path)
            .replace(/\\/g, '/');

        if (
            caminhoSeguro.startsWith('..') ||
            path.isAbsolute(caminhoSeguro)
        ) {
            throw new Error(
                `Caminho de arquivo inválido: ${file.path}`
            );
        }

        const caminhoCompleto = path.join(
            projectDir,
            caminhoSeguro
        );

        // Cria automaticamente as pastas necessárias
        await fsExtra.ensureDir(
            path.dirname(caminhoCompleto)
        );

        if (caminhoSeguro.endsWith('.jsx') || caminhoSeguro.endsWith('.tsx')) {
    content = content.replace(/BrowserRouter/g, 'HashRouter');
    }

        await fsExtra.writeFile(
            caminhoCompleto,
            content,
            'utf8'
        );
    }
}
// ==========================================
// CRIAR NOVO PROJETO A PARTIR DO BUILDER
// ==========================================

async function criarProjetoBase(projectDir) {
    const builderDir = path.join(__dirname, 'builder');

    await fsExtra.copy(
        builderDir,
        projectDir,
        {
            filter: (src) => {
                // Não copia node_modules nem dist
                // para cada projeto gerado
                return !src.includes('node_modules') &&
                       !src.includes('dist');
            }
        }
    );
}
// ==========================================
// INSTALAR DEPENDÊNCIAS DO PROJETO
// ==========================================

async function instalarDependencias(projectDir, dependencies = []) {
    console.log('[Backend] Instalando dependências do projeto...');

    await execAsync('npm install', {
        cwd: projectDir
    });

    if (dependencies.length) {
        console.log(`[Backend] Instalando dependências extras: ${dependencies.join(', ')}`);

        await execAsync(
            `npm install ${dependencies.join(' ')}`,
            {
                cwd: projectDir
            }
        );
    }

    console.log('[Backend] Dependências instaladas.');
}
async function gerarBuildProjeto(projectDir) {

    console.log('[Backend] Gerando build...');

    try {
        await execAsync('npm run build', {
            cwd: projectDir
        });

        console.log('[Backend] Build concluído.');

        return {
            success: true
        };

    } catch (err) {

        return {
            success: false,
            error: err.stderr || err.stdout || err.message
        };
    }

}
async function corrigirProjeto(buildError, promptOriginal, projetoGerado) {
console.log("[Backend] Corrigindo projeto...");

const caminhosComErro = [
    ...buildError.matchAll(/src\/[^\s:\]]+/g)
].map(match => match[0]);

const arquivosTexto = projetoGerado.files
    .filter(file => caminhosComErro.includes(file.path))
    .map(file => {
        return `ARQUIVO: ${file.path}

${file.content}`;
    })
    .join('\n\n====================\n\n');

    const promptCorrecao = `
Você gerou um projeto React que falhou na compilação.

PROMPT ORIGINAL:
${promptOriginal}

ARQUIVOS DO PROJETO:

${arquivosTexto}

ERRO DE COMPILAÇÃO:
${buildError}

IMPORTANTE

Você está atuando como um Engenheiro Frontend Staff responsável apenas por corrigir erros de compilação.

Sua missão NÃO é reescrever o projeto.

Sua missão é corrigir somente o necessário para que o projeto compile novamente.

==================================================
REGRAS
==================================================

Analise cuidadosamente o erro informado.

Localize a verdadeira causa do problema.

Nunca faça alterações desnecessárias.

Nunca altere a arquitetura do projeto.

Nunca recrie componentes que já existem.

Nunca remova funcionalidades que não estejam relacionadas ao erro.

Sempre preserve:

- aparência
- layout
- responsividade
- comportamento
- arquitetura
- organização dos arquivos

==================================================
IMPORTS
==================================================

Nunca invente:

- componentes
- funções
- hooks
- ícones
- exports
- bibliotecas

Se um import estiver incorreto:

corrija para um export REAL existente.

Se um componente não existir:

substitua por outro equivalente existente.

Nunca invente nomes.

==================================================
DEPENDÊNCIAS
==================================================

Se o erro ocorrer por biblioteca ausente:

utilize somente bibliotecas amplamente utilizadas.

Nunca substitua uma biblioteca inteira quando apenas um import está incorreto.

==================================================
ALTERAÇÕES
==================================================

Altere SOMENTE os arquivos envolvidos no erro.

Nunca altere arquivos saudáveis.

Nunca reescreva o projeto inteiro.

Nunca gere arquivos novos sem necessidade.

==================================================
OBJETIVO
==================================================

O projeto deve:

✓ compilar

✓ manter o mesmo comportamento

✓ manter a mesma interface

✓ manter a mesma arquitetura

✓ manter a mesma experiência visual

A correção deve ser a menor possível.

==================================================
RESPOSTA
==================================================

Retorne SOMENTE um JSON válido.

Formato obrigatório:

{
  "files": [
    {
      "path": "src/arquivo.ext",
      "content": "conteúdo completo do arquivo"
    }
  ]
}

Não escreva explicações.

Não utilize Markdown.

Não utilize blocos .

Não escreva texto antes ou depois do JSON.

==================================================
ARQUIVOS COM ERRO
==================================================

Os caminhos informados no erro indicam exatamente quais arquivos precisam ser modificados.

Analise cuidadosamente.

Altere SOMENTE esses arquivos.

Nunca reescreva arquivos que não aparecem no erro.
`;

    return await chamarDeepSeek(promptCorrecao);
}

async function iniciarPreview(projectId, projectDir) {

    if (previews.has(projectId)) {
        return previews.get(projectId);
    }

    const port = 4000 + previews.size;

    const processo = spawn(
        "npm",
        ["run", "dev", "--", "--host", "0.0.0.0", "--port", port],
        {
            cwd: projectDir,
            shell: true
        }
    );

    processo.stdout.on("data", data => {
        console.log(`[Preview ${projectId}] ${data}`);
    });

    processo.stderr.on("data", data => {
        console.error(`[Preview ${projectId}] ${data}`);
    });

    processo.on("close", () => {
        previews.delete(projectId);
    });

    const preview = {
        process: processo,
        port,
        url: `http://localhost:${port}`
    };

    previews.set(projectId, preview);

    return preview;
}

app.post('/generate', async (req, res) => {
    try {
        const { email, licenseKey, prompt } = req.body;

        // ==========================================
        // 1. VALIDAÇÕES
        // ==========================================

        if (!licenseKey) {
            return res.status(401).json({
                success: false,
                message: 'Licença não informada.'
            });
        }

        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Nenhuma solicitação foi informada.'
            });
        }

        console.log('[Backend] Validando licença para geração...');

        // ==========================================
        // 2. VALIDAR LICENÇA NO FIREBASE
        // ==========================================

        const licensesRef = db.collection('keys');

        const snapshot = await licensesRef
            .where('key_token', '==', licenseKey)
            .get();

        if (snapshot.empty) {
            console.log('[Backend] Licença inválida ou expirada.');

            return res.status(401).json({
                success: false,
                message: 'Licença inválida ou expirada.'
            });
        }

        console.log('[Backend] Licença válida.');
        console.log('[Backend] Enviando solicitação para DeepSeek...');

        // ==========================================
        // 3. PEDIR PROJETO ESTRUTURADO À DEEPSEEK
        // ==========================================

        const projetoGerado = await chamarDeepSeek(`
Você é um Engenheiro Frontend Staff especializado em:

- React 19
- Vite
- Tailwind CSS
- UI/UX
- Design Systems
- Arquitetura Frontend
- Componentização
- Responsividade
- Performance
- Acessibilidade

Seu objetivo é gerar aplicações React de qualidade profissional, prontas para produção.

Sua resposta deve conter APENAS um JSON válido.

NÃO escreva explicações.

NÃO utilize Markdown.

NÃO utilize blocos .

NÃO escreva texto antes ou depois do JSON.

==================================================
FORMATO OBRIGATÓRIO
==================================================

{
  "dependencies": [],
  "files": [
    {
      "path": "src/App.jsx",
      "content": "..."
    }
  ]
}

Nada além disso.

==================================================
ARQUITETURA
==================================================

A aplicação será executada utilizando:

- React
- Vite
- Tailwind CSS

Crie somente os arquivos realmente necessários.

Organize corretamente em:

src/components/
src/pages/
src/hooks/
src/services/
src/utils/
src/assets/
src/context/

Sempre utilize componentes reutilizáveis.

Evite repetição de código.

Separe responsabilidades.

Utilize boas práticas de arquitetura.

==================================================
ARQUIVOS PROIBIDOS
==================================================

NUNCA retorne:

src/main.jsx

src/index.css

package.json

vite.config.js

package-lock.json

node_modules

arquivos binários

Esses arquivos já existem.

==================================================
DEPENDÊNCIAS
==================================================

Sempre que utilizar bibliotecas externas adicione em:

dependencies

Nunca adicione:

react

react-dom

vite

tailwindcss

@vitejs/plugin-react

Se nenhuma biblioteca adicional for necessária:

"dependencies": []

==================================================
INTERFACE
==================================================

O design deve parecer desenvolvido por uma equipe profissional.

Nunca gere interfaces simples.

Nunca gere aparência de projeto acadêmico.

Nunca gere páginas vazias.

Utilize excelente hierarquia visual.

Utilize excelente espaçamento.

Utilize excelente tipografia.

Utilize excelente contraste.

Utilize excelente organização.

Sempre produza uma interface equivalente a softwares modernos.

Inspire-se no nível de qualidade de:

Linear

Stripe

Vercel

Supabase

Framer

Notion

Raycast

Shadcn UI

Não copie nenhum layout.

Somente o nível de qualidade.

==================================================
DESIGN
==================================================

Utilize:

Cards

Containers

Flexbox

Grid

Gap

Padding consistente

Margin consistente

Border Radius modernos

Sombras suaves

Hover

Focus

Active

Transitions

Micro animações

Responsividade

Nunca utilize elementos gigantes.

Nunca deixe componentes desalinhados.

Nunca deixe espaços vazios sem propósito.

==================================================
RESPONSIVIDADE
==================================================

IMPORTANTE.

A aplicação será visualizada dentro de um painel lateral estreito.

Portanto:

Desenvolva Mobile First.

Toda interface deve funcionar entre:

380px

420px

480px

768px

1024px

Nunca utilize largura fixa.

Prefira:

w-full

max-w

flex

grid

wrap

Evite overflow horizontal.

==================================================
CORES
==================================================

Escolha automaticamente uma identidade visual coerente com o projeto.

Não utilize sempre Dark Mode.

Não utilize sempre Glassmorphism.

Não utilize sempre Gradientes.

Não utilize sempre Bento Grid.

Cada projeto deve possuir identidade própria.

==================================================
UX
==================================================

Todo botão deve funcionar.

Toda navegação deve funcionar.

Não gere elementos mortos.

Campos devem possuir validação.

Estados de loading quando fizer sentido.

Estados vazios quando fizer sentido.

Estados de erro quando fizer sentido.

==================================================
CÓDIGO
==================================================

Sempre:

Imports corretos

Componentes completos

Código funcional

Sem TODO

Sem comentários desnecessários

Sem funções vazias

Sem pseudo código

Sem placeholders

==================================================
QUALIDADE
==================================================

Antes de finalizar revise mentalmente:

✓ Todos os imports existem.

✓ Todos os componentes existem.

✓ Não há arquivos faltando.

✓ Não há erros de compilação.

✓ Não há JSX inválido.

✓ Todos os caminhos relativos estão corretos.

✓ Todos os componentes utilizados foram criados.

✓ Todas as páginas estão conectadas.

✓ O projeto compila.

✓ O layout é bonito.

✓ A responsividade funciona.

✓ O código está completo.

Somente após essa revisão retorne o JSON.

Nenhuma explicação.

Nenhum texto.

Somente JSON válido.
SOLICITAÇÃO DO USUÁRIO:
${prompt}
`);
console.log(projetoGerado.files);

        // ==========================================
        // 7. VALIDAR ESTRUTURA
        // ==========================================

        if (
            !projetoGerado.files ||
            !Array.isArray(projetoGerado.files) ||
            projetoGerado.files.length === 0
        ) {
            throw new Error(
                'A IA não retornou arquivos válidos para o projeto.'
            );
        }

        // ==========================================
        // 8. CRIAR ID ÚNICO DO PROJETO
        // ==========================================

        const projectId =
            `project-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}`;

        const projectDir = path.join(
            __dirname,
            'generated-projects',
            projectId
        );

        // ==========================================
        // 9. CRIAR PROJETO BASE
        // ==========================================

        console.log(
            `[Backend] Criando projeto: ${projectId}`
        );
        console.log("==================================");
console.log("CHEGUEI AQUI");
console.log("==================================");
        await criarProjetoBase(projectDir);

        // ==========================================
        // 10. SALVAR ARQUIVOS GERADOS PELA IA
        // ==========================================

        console.log(
            `[Backend] Salvando ${projetoGerado.files.length} arquivos...`
        );
        console.log(
    projetoGerado.files.map(f => f.path)
);
const app = projetoGerado.files.find(
    f => f.path === 'src/App.jsx'
);

console.log(app?.content);

        await salvarArquivosProjeto(
            projectDir,
            projetoGerado.files
        );
        console.log(projetoGerado.dependencies);
        await instalarDependencias(
    projectDir,
    projetoGerado.dependencies || []
);
const build = await gerarBuildProjeto(projectDir);

console.log(build);

if (!build.success) {

    const arquivosCorrigidos = await corrigirProjeto(
    build.error,
    prompt,
    projetoGerado
);

    console.log(arquivosCorrigidos);
    
    console.log(
    "Resposta da DeepSeek:",
    JSON.stringify(arquivosCorrigidos, null, 2)
);

    await salvarArquivosProjeto(
    projectDir,
    arquivosCorrigidos
);

const novoBuild = await gerarBuildProjeto(projectDir);

console.log("[Backend] Segundo build:", novoBuild);
}

// ==========================================
// INICIAR PREVIEW
// ==========================================

console.log("[Backend] Iniciando preview...");

const preview = await iniciarPreview(
    projectId,
    projectDir
);

console.log("[Backend] Preview iniciado:", preview.url);

        // ==========================================
        // 11. RETORNAR RESULTADO
        // ==========================================

        return res.json({
    success: true,

    projectId,

    previewUrl: preview.url,

    files: projetoGerado.files.map(file => file.path),

    message: "Projeto criado com sucesso."
});

    } catch (error) {
        console.error(
            '[Erro na geração do projeto]:',
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                'Erro interno ao gerar o projeto.'
        });
    }
});

const PORT = process.env.PORT || 3000;
// Rota dedicada para validar a licença pelo Popup da Extensão
app.post('/validate-license', async (req, res) => {
  try {
    const { email, licenseKey } = req.body;

    console.log(`[Backend] Validando licença via popup para chave: ${licenseKey}`);

    const licensesRef = db.collection('keys');
    const snapshot = await licensesRef.where('key_token', '==', licenseKey).get();

    if (snapshot.empty) {
      console.log(`[Backend] Chave não encontrada.`);
      return res.status(200).json({ valid: false, message: 'Chave de licença inválida.' });
    }

    console.log(`[Backend] Licença ativada com sucesso!`);
    return res.status(200).json({ valid: true, message: 'Licença ativada com sucesso!' });

  } catch (error) {
    console.error('[Erro na validação]:', error);
    return res.status(500).json({ valid: false, message: 'Erro interno no servidor.' });
  }
});
app.use(
    '/preview',
    express.static(
        path.join(__dirname, 'generated-projects'),
        {
            extensions: ['html']
        }
    )
);
app.listen(PORT, () => {
  console.log(`[Backend] Servidor rodando na porta ${PORT}`);
});