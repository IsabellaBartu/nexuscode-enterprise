import { useState } from 'react';

const faqs = [
  {
    question: 'Quanto tempo leva para desenvolver um projeto?',
    answer: 'Depende da complexidade. Projetos simples podem levar de 2 a 4 semanas, enquanto soluções mais robustas podem levar de 2 a 6 meses. Após a descoberta, fornecemos um cronograma detalhado.',
  },
  {
    question: 'Vocês trabalham com startups?',
    answer: 'Sim! Temos experiência com startups em estágio inicial e oferecemos condições especiais para MVPs e validação de ideias.',
  },
  {
    question: 'Oferecem suporte após o lançamento?',
    answer: 'Sim, oferecemos planos de manutenção e suporte contínuo para garantir que seu software continue funcionando perfeitamente.',
  },
  {
    question: 'Como é o processo de comunicação?',
    answer: 'Utilizamos ferramentas como Slack, Notion e reuniões semanais para manter total transparência e alinhamento durante todo o projeto.',
  },
  {
    question: 'Quais tecnologias vocês utilizam?',
    answer: 'Trabalhamos com React, Next.js, React Native, Node.js, Python, AWS, entre outras. Escolhemos a melhor stack para cada projeto.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Perguntas Frequentes</h2>
          <p className="mt-4 text-lg text-gray-600">
            Tire suas dúvidas sobre nosso processo e serviços.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
