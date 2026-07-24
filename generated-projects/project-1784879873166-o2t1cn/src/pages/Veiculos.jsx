import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

const veiculosData = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: 2023, categoria: 'Sedan', diaria: 180, km: 15000, combustivel: 'Flex', status: 'disponivel' },
  { id: 2, marca: 'Honda', modelo: 'Civic', ano: 2024, categoria: 'Sedan', diaria: 200, km: 8000, combustivel: 'Flex', status: 'alugado' },
  { id: 3, marca: 'Ford', modelo: 'Ranger', ano: 2023, categoria: 'Pickup', diaria: 350, km: 22000, combustivel: 'Diesel', status: 'disponivel' },
  { id: 4, marca: 'Chevrolet', modelo: 'Onix', ano: 2024, categoria: 'Hatch', diaria: 130, km: 5000, combustivel: 'Flex', status: 'reservado' },
  { id: 5, marca: 'Volkswagen', modelo: 'T-Cross', ano: 2023, categoria: 'SUV', diaria: 250, km: 18000, combustivel: 'Flex', status: 'manutencao' },
];

export default function Veiculos() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = veiculosData.filter(v =>
    v.marca.toLowerCase().includes(search.toLowerCase()) ||
    v.modelo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Veículos</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie sua frota</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Novo Veículo
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar veículo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
          <Filter className="w-4 h-4" /> Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{v.marca} {v.modelo}</h3>
                <Badge variant={v.status === 'disponivel' ? 'success' : v.status === 'alugado' ? 'warning' : v.status === 'reservado' ? 'info' : 'danger'}>
                  {v.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <span>{v.ano} • {v.categoria}</span>
                <span className="text-right">{v.km.toLocaleString()} km</span>
                <span>{v.combustivel}</span>
                <span className="text-right font-semibold text-blue-600">R$ {v.diaria}/dia</span>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Eye className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition"><Edit className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Cadastrar Veículo">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Marca" placeholder="Ex: Toyota" />
            <Input label="Modelo" placeholder="Ex: Corolla" />
            <Input label="Ano" type="number" placeholder="2025" />
            <Input label="Categoria" placeholder="Sedan, SUV..." />
            <Input label="Valor da Diária" type="number" placeholder="180" />
            <Input label="Quilometragem" type="number" placeholder="0" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}