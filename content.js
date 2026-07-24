console.log("[NexusCode Enterprise] Interceptor blindado ativo.");

let arquivoAnexadoGlobal = null;

// ==========================================
// 1. INTERCEPTADOR GLOBAL BLINDADO (BLOQUEIA O LOVABLE)
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        const elementoAlvo = e.target;
        const isCaixaDeTexto = elementoAlvo.tagName === 'TEXTAREA' || 
                               elementoAlvo.tagName === 'INPUT' ||
                               elementoAlvo.isContentEditable;

        if (isCaixaDeTexto) {
            const promptOriginal = elementoAlvo.value || elementoAlvo.innerText;
            if (!promptOriginal || !promptOriginal.trim()) return;

            // BLOQUEIA O EVENTO PARA O LOVABLE NUNCA RECEBER E GASTAR CRÉDITO
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Limpa a caixa de texto nativa do site deles
            if (elementoAlvo.value !== undefined) elementoAlvo.value = '';
            else elementoAlvo.innerText = '';
            
            // Abre o seu painel exclusivo imediatamente
            abrirPainelNexusCode();
            atualizarStatusNexus("Estabelecendo conexão local...", "#3b82f6");

            processarEnvioComAnexo(promptOriginal);
        }
    }
}, true);

// Também intercepta cliques no botão nativo de enviar do Lovable, caso o usuário clique com o mouse
document.addEventListener('click', (e) => {
    const botaoEnviarLovable = e.target.closest('button[type="submit"]') || e.target.closest('button svg');
    if (botaoEnviarLovable) {
        const containerChat = botaoEnviarLovable.closest('form') || botaoEnviarLovable.parentElement;
        const inputTexto = containerChat?.querySelector('textarea') || document.querySelector('textarea');
        
        if (inputTexto && inputTexto.value.trim()) {
            const promptOriginal = inputTexto.value;
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            inputTexto.value = '';
            abrirPainelNexusCode();
            atualizarStatusNexus("Estabelecendo conexão local...", "#3b82f6");
            processarEnvioComAnexo(promptOriginal);
        }
    }
}, true);


// ==========================================
// 2. PROCESSAMENTO DE ARQUIVOS E MÍDIA
// ==========================================
function processarEnvioComAnexo(promptOriginal) {
    const promptBase = `[Diretriz de Sistema: Atenda plenamente à solicitação a seguir gerando uma solução completa, estruturada e de altíssimo nível técnico. Se envolver interface web, estruture blocos de código limpos e prontos para uso.]\n\nSolicitação: ${promptOriginal}`;

    if (arquivoAnexadoGlobal) {
        atualizarStatusNexus("Lendo arquivo/mídia anexada...", "#eab308");
        const reader = new FileReader();

        const tipoArquivo = arquivoAnexadoGlobal.type || "";
const nomeArquivo = arquivoAnexadoGlobal.name || "";

const ehTextoOuCodigo =
    tipoArquivo.includes("text") ||
    nomeArquivo.endsWith(".js") ||
    nomeArquivo.endsWith(".json") ||
    nomeArquivo.endsWith(".html") ||
    nomeArquivo.endsWith(".css");

        if (ehTextoOuCodigo) {
            reader.onload = function(event) {
                const conteudoArquivo = event.target.result;
                const promptFinal = `${promptBase}\n\n[Conteúdo do arquivo anexado (${arquivoAnexadoGlobal.name}):]\n${conteudoArquivo}`;
                dispararRequisicaoBackend(promptFinal);
                arquivoAnexadoGlobal = null;

document.getElementById("nexus-file-input").value = "";

document.getElementById("nexus-attached-file-name").textContent =
    "Nenhum arquivo";
            };
            reader.readAsText(arquivoAnexadoGlobal);
        } else {
            reader.onload = function(event) {
                const promptFinal = `${promptBase}\n\n[Mídia anexada: ${arquivoAnexadoGlobal.name} (Tipo: ${arquivoAnexadoGlobal.type})]`;
                dispararRequisicaoBackend(promptFinal);
                arquivoAnexadoGlobal = null;
            };
            reader.readAsDataURL(arquivoAnexadoGlobal);
        }
    } else {
        dispararRequisicaoBackend(promptBase);
    }
}

function dispararRequisicaoBackend(promptFinal) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['userEmail', 'licenseKey'], (credenciais) => {
            console.log("[Nexus] Credenciais do storage:", credenciais);
            enviarParaBackend(promptFinal, credenciais);
            console.log("[Nexus] Recebido em enviarParaBackend:", credenciais);
        });
    } else {
        
        enviarParaBackend(promptFinal, { userEmail: '', licenseKey: '' });
    }
}


// ==========================================
// 3. COMUNICAÇÃO COM O BACKEND
// ==========================================
async function enviarParaBackend(prompt, credenciais) {
    const timer1 = setTimeout(() => atualizarStatusNexus("Sintetizando arquitetura e lógica...", "#eab308"), 3000);
    const timer2 = setTimeout(() => atualizarStatusNexus("Escrevendo códigos complexos...", "#f97316"), 7000);

    try {
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: credenciais.userEmail,
                licenseKey: credenciais.licenseKey,
                prompt: prompt
            })
        });

        clearTimeout(timer1);
        clearTimeout(timer2);

        const result = await response.json();

       if (result.success) {

    atualizarStatusNexus("Tarefa concluída", "#10b981");

    console.log("[Nexus] Resultado recebido:", result);

    injetarResultadoNoPainel(result);

}
 else {
            atualizarStatusNexus("Erro na execução", "#ef4444");
            alert("NexusCode: " + result.message);
        }
    } catch (error) {
        clearTimeout(timer1);
        clearTimeout(timer2);
        atualizarStatusNexus("Falha de conexão com o servidor local", "#ef4444");
        console.error("Erro de rede:", error);
    }
}


// ==========================================
// 4. INTERFACE VISUAL DO PAINEL LATERAL
// ==========================================
function atualizarStatusNexus(texto, cor) {
    const statusEl = document.getElementById('nexus-status-text');
    if (statusEl) {
        statusEl.innerHTML = `<span style="color: ${cor}; font-size: 8px; vertical-align: middle;">■</span> ${texto}`;
    }
}

function abrirPainelNexusCode() {
    let painel = document.getElementById('nexus-sidebar-widget');
    if (painel) painel.remove();

    painel = document.createElement('div');
    painel.id = 'nexus-sidebar-widget';
    
    painel.style.cssText = `
        position: fixed; top: 20px; bottom: 20px; right: 20px; width: 560px;
        background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.02);
        z-index: 999999; display: flex; flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
        overflow: hidden; animation: slideInClean 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    painel.innerHTML = `
        <style>
            @keyframes slideInClean { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes softPulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
            
            .nexus-input-clean {
                width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px;
                font-size: 13px; resize: none; outline: none; font-family: inherit; box-sizing: border-box;
                color: #0f172a !important; background-color: #ffffff !important;
            }
            .nexus-input-clean::placeholder { color: #94a3b8 !important; }
            .nexus-input-clean:focus { border-color: #0f172a; box-shadow: 0 0 0 2px rgba(15,23,42,0.08); }
            
            .nexus-tab { background: none; border: none; padding: 12px 18px; font-weight: 500; font-size: 13px; cursor: pointer; color: #64748b; border-bottom: 2px solid transparent; transition: all 0.2s; }
            .nexus-tab.active { color: #0f172a; border-bottom: 2px solid #0f172a; font-weight: 600; }
            .nexus-panel-view { display: none; flex-grow: 1; overflow: hidden; }
            .nexus-panel-view.active { display: flex; flex-direction: column; }
            
            .nexus-shortcut-pill {
                background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 8px;
                font-size: 12px; font-weight: 500; color: #334155; cursor: pointer;
                display: flex; align-items: center; gap: 6px; transition: all 0.15s ease;
            }
            .nexus-shortcut-pill:hover { background: #f1f5f9; border-color: #cbd5e1; color: #0f172a; }
        </style>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; background: #ffffff;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 28px; height: 28px; background: #0f172a; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 15px; font-weight: 600; color: #0f172a;">NexusCode Enterprise</h3>
                    <div id="nexus-status-text" style="font-size: 11px; color: #64748b; margin-top: 1px; animation: softPulse 2s infinite;">Inicializando...</div>
                </div>
            </div>
            <button id="nexus-btn-fechar" style="background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <div id="nexus-loading-box" style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; background: #fafafa;">
            <div style="width: 32px; height: 32px; border: 2px solid #e2e8f0; border-top-color: #0f172a; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <span style="color: #64748b; font-size: 13px; font-weight: 500;">Processando código com DeepSeek...</span>
            <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        </div>

        <div id="nexus-loaded-box" style="display: none; flex-grow: 1; flex-direction: column; overflow: hidden;">
            <div style="padding: 10px 20px; background: #f8fafc; font-size: 12px; color: #475569; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #f1f5f9;">
                <span style="font-weight: 600; color: #0f172a;">Arquivos:</span>
                <span id="nexus-file-badges" style="display:flex; gap: 6px;"></span>
            </div>

            <div style="display: flex; border-bottom: 1px solid #e2e8f0; background: #ffffff; padding: 0 10px;">
                <button class="nexus-tab active" data-target="nexus-view-preview">Visualização</button>
                <button class="nexus-tab" data-target="nexus-view-code">Código-Fonte</button>
            </div>

            <div id="nexus-view-preview" class="nexus-panel-view active" style="background: #ffffff;">
                <iframe id="nexus-iframe-render" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
                 style="width: 100%; height: 100%; border: none;"></iframe>
            </div>

            <div id="nexus-view-code" class="nexus-panel-view" style="background: #0f172a; color: #f8fafc; overflow-y: auto;">
                <div style="padding: 10px 16px; display: flex; justify-content: flex-end; position: sticky; top: 0; background: rgba(15,23,42,0.95); border-bottom: 1px solid #1e293b;">
                    <button id="nexus-btn-copiar" style="background: #ffffff; color: #0f172a; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">Copiar</button>
                </div>
                <div id="nexus-raw-source" style="padding: 16px 20px; font-family: ui-monospace, monospace; font-size: 12px; white-space: pre-wrap; line-height: 1.6; color: #cbd5e1;"></div>
            </div>
        </div>

        <div style="background: #ffffff; border-top: 1px solid #f1f5f9; padding: 14px 20px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="nexus-shortcut-pill" data-prompt="Refine a arquitetura aplicando um design system moderno e limpo">✨ Refinar UI</button>
                <button class="nexus-shortcut-pill" data-prompt="Otimize a lógica, adicione tratamentos de erro e responsividade mobile">📱 Otimizar Código</button>
                <button class="nexus-shortcut-pill" data-prompt="Adicione interatividade dinâmica e funcionalidades avançadas">⚡ Expandir Lógica</button>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #64748b;">
                <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; color: #2563eb; font-weight: 500;">
                    📎 Anexar arquivo/mídia
                    <input type="file" id="nexus-file-input" style="display: none;" accept="image/*,video/*,.txt,.js,.json,.html,.css">
                </label>
                <span id="nexus-attached-file-name" style="color: #059669; font-weight: 500; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Nenhum arquivo</span>
            </div>

            <div style="display: flex; gap: 8px;">
                <textarea id="nexus-followup-input" class="nexus-input-clean" rows="1" placeholder="Digite modificações ou novos recursos..."></textarea>
                <button id="nexus-btn-enviar-extra" style="background: #0f172a; color: white; border: none; padding: 0 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Enviar</button>
            </div>
        </div>
    `;

    document.body.appendChild(painel);
    vincularEventosPainel(painel);
}


// ==========================================
// 5. RENDERIZAÇÃO DA RESPOSTA NO PAINEL
// ==========================================
function injetarResultadoNoPainel(resultado) {

    console.log("===== RESULTADO RECEBIDO =====");
    console.log(resultado);

    // =====================
    // Atualiza a interface
    // =====================

    document.getElementById("nexus-loading-box").style.display = "none";
    document.getElementById("nexus-loaded-box").style.display = "flex";

    // =====================
    // Lista de arquivos
    // =====================

    const badgeContainer = document.getElementById("nexus-file-badges");
    badgeContainer.innerHTML = "";

    if (Array.isArray(resultado.files)) {

        resultado.files.forEach(file => {

            const span = document.createElement("span");

            span.textContent = file;

            span.style.background = "#f1f5f9";
            span.style.color = "#0f172a";
            span.style.padding = "2px 6px";
            span.style.borderRadius = "4px";
            span.style.marginRight = "6px";
            span.style.marginBottom = "6px";
            span.style.display = "inline-block";

            badgeContainer.appendChild(span);

        });

    }

    // =====================
    // Código fonte
    // =====================

    document.getElementById("nexus-raw-source").textContent =
        JSON.stringify(resultado, null, 2);

    // =====================
    // Preview React
    // =====================

    const iframe = document.getElementById("nexus-iframe-render");

    console.log("Preview URL:", resultado.previewUrl);
    console.log("Iframe encontrado:", iframe);

    if (!iframe) {
        console.error("Iframe não encontrado.");
        return;
    }

    iframe.onload = () => {
        console.log("✅ IFRAME CARREGOU");
        iframe.addEventListener("load", () => {
    try {
        console.log(
            iframe.contentWindow.location.href
        );
    } catch(e) {
        console.log("Cross Origin", e);
    }
});
    };

    iframe.onerror = (e) => {
        console.error("❌ ERRO AO CARREGAR IFRAME", e);
    };

    iframe.removeAttribute("srcdoc");

    try {

        iframe.src = resultado.previewUrl;

        console.log("iframe.src =", iframe.src);

    } catch (err) {

        console.error("Erro ao definir iframe.src:", err);

    }

}
// ==========================================
// 6. EVENTOS DO PAINEL LATERAL
// ==========================================
function vincularEventosPainel(painel) {
    document.getElementById('nexus-btn-fechar').addEventListener('click', () => painel.remove());

    const fileInputEl = document.getElementById('nexus-file-input');
    fileInputEl.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            arquivoAnexadoGlobal = file;
            document.getElementById('nexus-attached-file-name').textContent = file.name;
        }
    });

    const tabs = painel.querySelectorAll('.nexus-tab');
    const views = painel.querySelectorAll('.nexus-panel-view');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-target')).classList.add('active');
        });
    });

    const btnCopiar = document.getElementById('nexus-btn-copiar');
    btnCopiar.addEventListener('click', () => {
        const codigo = document.getElementById('nexus-raw-source').textContent;
        navigator.clipboard.writeText(codigo).then(() => {
            btnCopiar.innerText = "Copiado!";
            btnCopiar.style.background = "#10b981";
            btnCopiar.style.color = "#ffffff";
            setTimeout(() => {
                btnCopiar.innerText = "Copiar";
                btnCopiar.style.background = "#ffffff";
                btnCopiar.style.color = "#0f172a";
            }, 2000);
        });
    });

    painel.querySelectorAll('.nexus-shortcut-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.getElementById('nexus-followup-input').value = pill.getAttribute('data-prompt');
            document.getElementById('nexus-btn-enviar-extra').click();
        });
    });

    const btnEnviarExtra = document.getElementById('nexus-btn-enviar-extra');
    const inputExtra = document.getElementById('nexus-followup-input');

    const executarModificacao = () => {
        const texto = inputExtra.value;
        if (!texto.trim()) return;

        inputExtra.value = '';
        atualizarStatusNexus("Refinando projeto...", "#3b82f6");
        
        document.getElementById('nexus-loaded-box').style.display = 'none';
        document.getElementById('nexus-loading-box').style.display = 'flex';

        const promptContinuo = `[Diretriz de Sistema: O usuário solicitou um ajuste na solução anterior: "${texto}". Forneça o código atualizado e completo.]`;

        processarEnvioComAnexo(promptContinuo);
    };

    btnEnviarExtra.addEventListener('click', executarModificacao);
    inputExtra.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            executarModificacao();
        }
    });
}