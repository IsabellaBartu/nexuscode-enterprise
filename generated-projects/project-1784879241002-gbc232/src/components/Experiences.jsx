import React from 'react';

const experiences = [
  {
    title: 'Mergulho',
    description: 'Explore recifes de corais e nade com arraias, tartarugas e golfinhos.',
    icon: (
      <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Spa & Bem-Estar',
    description: 'Massagens, tratamentos ayurvédicos e ioga ao amanhecer.',
    icon: (
      <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Gastronomia',
    description: 'Chefs internacionais, frutos do mar frescos e jantares na praia.',
    icon: (
      <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    title: 'Passeios Exclusivos',
    description: 'Passeios de barco, ilhas desertas e piqueniques privativos.',
    icon: (
      <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Experiências Inesquecíveis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada atividade foi cuidadosamente curada para proporcionar momentos únicos.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {exp.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
