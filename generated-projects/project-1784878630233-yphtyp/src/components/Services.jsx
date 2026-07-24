const services = [
  {
    title: 'Desenvolvimento Web',
    description: 'Sites e aplicações web responsivas, rápidas e escaláveis com as tecnologias mais modernas do mercado.',
    icon: '🌐',
  },
  {
    title: 'Aplicativos Mobile',
    description: 'Apps nativos e híbridos para iOS e Android com experiência de usuário fluida e design consistente.',
    icon: '📱',
  },
  {
    title: 'APIs & Backend',
    description: 'Arquiteturas robustas e seguras para conectar sistemas, processar dados e escalar sem limites.',
    icon: '⚙️',
  },
  {
    title: 'UI/UX Design',
    description: 'Interfaces intuitivas e atraentes que encantam usuários e aumentam a retenção e conversão.',
    icon: '🎨',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Infraestrutura em nuvem, CI/CD, monitoramento e automação para entregas contínuas e confiáveis.',
    icon: '☁️',
  },
  {
    title: 'Consultoria Técnica',
    description: 'Orientação especializada para arquitetura de software, revisão de código e otimização de performance.',
    icon: '🧠',
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nossos Serviços</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Soluções completas para transformar sua visão em realidade digital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
