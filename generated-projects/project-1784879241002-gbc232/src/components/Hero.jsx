import React from 'react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide mb-4 animate-fade-in-down">
          Azure Maldives
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl mb-8 animate-fade-in-up">
          O refúgio definitivo de luxo no paraíso
        </p>
        <a
          href="#booking"
          className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-300/50 animate-fade-in"
        >
          Reserve sua experiência
        </a>
      </div>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.3s both;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out 0.6s both;
        }
      `}</style>
    </section>
  );
}
