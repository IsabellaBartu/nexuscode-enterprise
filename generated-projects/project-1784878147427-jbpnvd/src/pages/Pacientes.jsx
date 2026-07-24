import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const initialPets = [
  { id: 1, nome: 'Thor', especie: 'Cachorro', raca: 'Golden Retriever', tutor: 'Ana Silva', telefone: '(11) 99999-0001' },
  { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Siamês', tutor: 'Carlos Souza', telefone: '(11) 99999-0002' },
  { id: 3, nome: 'Bolinha', especie: 'Cachorro', raca: 'Bulldog Francês', tutor: 'Mariana Costa', telefone: '(11) 99999-0003' },
  { id: 4, nome: 'Luna', especie: 'Gato', raca: 'Persa', tutor: 'Pedro Alves', telefone: '(11) 99999-0004' },
  { id: 5, nome: 'Rex', especie: 'Cachorro', raca: 'Pastor Alemão', tutor: 'Fernanda Lima', telefone: '(11) 99999-0005' },
  { id: 6, nome: 'Pipoca', especie: 'Hamster', raca: 'Sírio', tutor: 'João Santos', telefone: '(11) 99999-0006' },
];

export default function Pacientes() {
  const [pets, setPets] = useState(initialPets);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPet, setNewPet] = useState({ nome: '', especie: '', raca: '', tutor: '', telefone: '' });

  const filtered = pets.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.tutor.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPet.nome || !newPet.especie || !newPet.raca || !newPet.tutor || !newPet.telefone) return;
    const id = pets.length ? Math.max(...pets.map(p => p.id)) + 1 : 1;
    setPets([...pets, { id, ...newPet }]);
    setNewPet({ nome: '', especie: '', raca: '', tutor: '', telefone: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Pacientes</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Adicionar Novo Pet
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nome ou tutor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Nome</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Espécie</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Raça</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Tutor</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">Nenhum paciente encontrado.</td>
              </tr>
            ) : (
              filtered.map((pet) => (
                <tr key={pet.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{pet.nome}</td>
                  <td className="py-3 px-4 text-gray-600">{pet.especie}</td>
                  <td className="py-3 px-4 text-gray-600">{pet.raca}</td>
                  <td className="py-3 px-4 text-gray-600">{pet.tutor}</td>
                  <td className="py-3 px-4 text-gray-600">{pet.telefone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Cadastrar Novo Pet</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <input
                placeholder="Nome do Pet"
                value={newPet.nome}
                onChange={(e) => setNewPet({ ...newPet, nome: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                placeholder="Espécie"
                value={newPet.especie}
                onChange={(e) => setNewPet({ ...newPet, especie: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                placeholder="Raça"
                value={newPet.raca}
                onChange={(e) => setNewPet({ ...newPet, raca: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                placeholder="Nome do Tutor"
                value={newPet.tutor}
                onChange={(e) => setNewPet({ ...newPet, tutor: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                placeholder="Telefone"
                value={newPet.telefone}
                onChange={(e) => setNewPet({ ...newPet, telefone: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
