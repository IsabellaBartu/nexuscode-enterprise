import React from 'react';

const testimonials = [
  {
    name: 'Ana e Carlos',
    text: 'A experiência mais incrível das nossas vidas. Cada detalhe foi pensado com carinho. Voltaremos com certeza!',
    rating: 5,
  },
  {
    name: 'Marina S.',
    text: 'O spa é divino, a comida é espetacular e o atendimento é impecável. Superou todas as expectativas.',
    rating: 5,
  },
  {
    name: 'Ricardo M.',
    text: 'Mergulhar com as tartarugas foi mágico. O resort é um verdadeiro paraíso na Terra.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            O Que Nossos Hóspedes Dizem
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-4">"{t.text}"</p>
              <p className="font-semibold text-gray-800">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
