export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              NexusCode
            </h3>
            <p className="text-sm leading-relaxed">
              Transformamos ideias em software de alto impacto. Tecnologia, design e estratégia para o seu negócio decolar.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {['Serviços', 'Como Funciona', 'Portfólio', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/ /g, '-'))}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li>Desenvolvimento Web</li>
              <li>Aplicativos Mobile</li>
              <li>APIs & Backend</li>
              <li>UI/UX Design</li>
              <li>Cloud & DevOps</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>contato@nexuscode.dev</li>
              <li>+55 (11) 99999-8888</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} NexusCode. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
