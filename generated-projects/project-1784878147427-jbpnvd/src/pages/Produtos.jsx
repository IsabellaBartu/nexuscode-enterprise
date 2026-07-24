import { ShoppingBag } from 'lucide-react';

const products = [
  { id: 1, nome: 'Ração Premium Cães', preco: 89.90, estoque: 45, image: 'https://images.unsplash.com/photo-1565708097881-bbf4b5b0f1c3?w=200&h=200&fit=crop' },
  { id: 2, nome: 'Brinquedo Kong', preco: 59.90, estoque: 22, image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=200&h=200&fit=crop' },
  { id: 3, nome: 'Coleira Antipulgas', preco: 45.00, estoque: 18, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop' },
  { id: 4, nome: 'Shampoo Pet', preco: 29.90, estoque: 34, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop' },
  { id: 5, nome: 'Ração Gatos Adultos', preco: 79.90, estoque: 30, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200&h=200&fit=crop' },
  { id: 6, nome: 'Cama Pet Conforto', preco: 129.90, estoque: 12, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200&h=200&fit=crop' },
];

export default function Produtos() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Produtos / Estoque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((prod) => (
          <div key={prod.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={prod.image}
              alt={prod.nome}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag size={16} className="text-teal-500" />
                <h3 className="font-semibold text-gray-800 text-sm">{prod.nome}</h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal-600">R$ {prod.preco.toFixed(2)}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${prod.estoque > 20 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {prod.estoque} em estoque
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
