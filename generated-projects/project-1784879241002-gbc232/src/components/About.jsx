import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Bem-vindo ao Azure Maldives
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Situado em um dos atóis mais exclusivos das Maldivas, o Azure Maldives
              oferece uma experiência de hospedagem incomparável. Cada villa foi
              projetada para harmonizar luxo contemporâneo com a beleza natural
              intocada que nos rodeia.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              De águas cristalinas a pores do sol dourados, cada momento aqui é
              uma celebração da vida. Nossa equipe dedicada está pronta para
              transformar sua estadia em memórias eternas.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <span className="block text-3xl font-bold text-teal-600">50+</span>
                <span className="text-sm text-gray-500">Villas de luxo</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-teal-600">12</span>
                <span className="text-sm text-gray-500">Experiências exclusivas</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-teal-600">98%</span>
                <span className="text-sm text-gray-500">Satisfação dos hóspedes</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Vista aérea do resort"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-amber-400 text-gray-900 rounded-xl p-4 shadow-lg hidden sm:block">
              <p className="text-sm font-semibold">Desde 2010</p>
              <p className="text-xs">Excelência em hospitalidade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
