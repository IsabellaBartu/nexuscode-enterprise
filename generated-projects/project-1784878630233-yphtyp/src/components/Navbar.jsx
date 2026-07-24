import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button onClick={() => scrollTo('hero')} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          NexusCode
        </button>

        <div className="hidden md:flex items-center gap-8">
          {['Serviços', 'Como Funciona', 'Portfólio', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/ /g, '-'))}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Abrir menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-6 pt-2 space-y-3">
          {['Serviços', 'Como Funciona', 'Portfólio', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/ /g, '-'))}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
