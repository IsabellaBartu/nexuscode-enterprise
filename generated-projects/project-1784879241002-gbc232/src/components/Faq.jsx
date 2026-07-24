import React, { useState } from 'react';

const faqData = [
  {
    question: 'Qual é o período de check-in e check-out?',
    answer: 'O check-in é a partir das 14h e o check-out até as 12h. Oferecemos late check-out mediante disponibilidade.',
  },
  {
    question: 'Vocês oferecem traslado do aeroporto?',
    answer: 'Sim, oferecemos traslado de lancha ou hidroavião a partir do Aeroporto Internacional de Malé. Consulte nossos pacotes.',
  },
  {
    question: 'Há opções para crianças?',
    answer: 'Sim, temos clubes infantis, babás certificadas e atividades especiais para crianças de todas as idades.',
  },
  {
    question: 'Qual a melhor época para visitar as Maldivas?',
    answer: 'O clima é agradável o ano todo. A alta temporada vai de novembro a abril, com céu ensolarado e mar calmo.',
  },
  {
    question: 'É necessário visto para brasileiros?',
    answer: 'Não, brasileiros recebem visto de turista gratuito por até 30 dias na chegada.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Perguntas Frequentes
          </h2>
        </div>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-800">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-40 p-5 pt-0' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
