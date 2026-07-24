const projects = [
  {
    title: 'FinFlow',
    description: 'Plataforma de gestão financeira para pequenas empresas com dashboards em tempo real.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'MedConnect',
    description: 'Aplicativo de telemedicina com agendamento, videochamada e prontuário eletrônico.',
    tags: ['React Native', 'WebRTC', 'Firebase'],
  },
  {
    title: 'EcoTrack',
    description: 'SaaS de monitoramento ambiental com IoT e visualização de dados georreferenciados.',
    tags: ['Vue.js', 'Python', 'MongoDB'],
  },
  {
    title: 'ShopNow',
    description: 'E-commerce completo com checkout otimizado, gestão de estoque e recomendações por IA.',
    tags: ['Next.js', 'Stripe', 'Redis'],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Portfólio</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Projetos que entregamos com excelência para clientes de diversos setores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-6xl opacity-40">📁</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
