import React from 'react';

const rooms = [
  {
    title: 'Villa Overwater',
    description: 'Vista panorâmica do oceano, piscina privativa e deck suspenso.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Villa Beachfront',
    description: 'Acesso direto à praia, jardim tropical e banheira ao ar livre.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Suíte Presidencial',
    description: 'Ampla suíte com sala de estar, mordomo pessoal e spa privativo.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Villa Família',
    description: 'Duas suítes, piscina infantil e área de lazer exclusiva.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Nossos Quartos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada espaço foi pensado para oferecer conforto, privacidade e uma
            conexão única com o paraíso.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {room.title}
                </h3>
                <p className="text-sm text-gray-500">{room.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
