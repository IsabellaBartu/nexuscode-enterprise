const steps = [
  {
    step: '01',
    title: 'Descoberta',
    description: 'Entendemos seu negócio, objetivos e desafios para alinhar expectativas e definir o escopo.',
  },
  {
    step: '02',
    title: 'Planejamento',
    description: 'Criamos roadmap, protótipos e definimos tecnologias para garantir entregas previsíveis.',
  },
  {
    step: '03',
    title: 'Desenvolvimento',
    description: 'Codificamos com agilidade, testando continuamente para manter a qualidade do início ao fim.',
  },
  {
    step: '04',
    title: 'Entrega & Suporte',
    description: 'Disponibilizamos o produto, treinamos sua equipe e oferecemos suporte contínuo pós-lançamento.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Como Funciona</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Um processo transparente e eficiente para transformar sua ideia em software.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl font-extrabold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
