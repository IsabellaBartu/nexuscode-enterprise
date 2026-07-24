import React from 'react';

const packages = [
  {
    name: 'Escapada Romântica',
    price: 'A partir de $2.500',
    features: ['3 noites em villa overwater', 'Jantar à luz de velas', 'Spa para casal', 'Passeio de barco ao pôr do sol'],
    popular: false,
  },
  {
    name: 'Pacote All-Inclusive',
    price: 'A partir de $4.200',
    features: ['7 noites em villa beachfront', 'Todas as refeições', 'Bebidas premium', 'Excursão de mergulho', 'Acesso ao spa'],
    popular: true,
  },
  {
    name: 'Aventura Aquática',
    price: 'A partir de $3.800',
    features: ['5 noites em villa overwater', 'Mergulho certificado', 'Snorkel com tartarugas', 'Passeio de jet ski', 'Aula de surf'],
    popular: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Pacotes Exclusivos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o pacote ideal para sua viagem dos sonhos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl ${
                pkg.popular
                  ? 'border-amber-400 bg-amber-50 shadow-lg'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 text-xs font-semibold px-4 py-1 rounded-full">
                  Mais Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
              <p className="text-2xl font-semibold text-teal-600 mb-4">{pkg.price}</p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className={`block text-center font-semibold py-3 rounded-full transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-amber-400 hover:bg-amber-500 text-gray-900'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                Reservar agora
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
