const testimonials = [
  {
    name: 'Ana Oliveira',
    role: 'CEO, FinFlow',
    text: 'A NexusCode transformou nossa visão em um produto incrível. O processo foi ágil e a comunicação impecável.',
  },
  {
    name: 'Carlos Mendes',
    role: 'CTO, MedConnect',
    text: 'Profissionalismo e qualidade técnica excepcionais. Entregaram no prazo e superaram nossas expectativas.',
  },
  {
    name: 'Juliana Costa',
    role: 'Fundadora, EcoTrack',
    text: 'A equipe entendeu profundamente nosso negócio e sugeriu soluções que nem imaginávamos ser possíveis.',
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Depoimentos</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            O que nossos clientes dizem sobre trabalhar conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic leading-relaxed">"{item.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
