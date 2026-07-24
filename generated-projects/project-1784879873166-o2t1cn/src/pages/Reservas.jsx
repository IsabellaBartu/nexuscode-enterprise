import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Card from '../components/Card';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

const reservasData = [
  { id: 1, cliente: 'Carlos Silva', veiculo: 'Toyota Corolla', retirada: '20/06/2025', devolucao: '25/06/2025', valor: 900, status: 'confirmada' },
  { id: 2, cliente: 'Ana Oliveira', veiculo: 'Honda Civic', retirada: '22/06/2025', devolucao: '28/06/2025', valor: 1200, status: 'pendente' },
  { id: 3, cliente: 'Marcos Lima', veiculo: 'Ford Ranger', retirada: '18/06/2025', devolucao: '21/06/2025', valor: 1050, status: 'confirmada' },
];

export default function Reservas() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = reservasData.filter(r =>
    r.cliente.toLowerCase().includes(search.toLowerCase()) ||
    r.veiculo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservas</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie as reservas</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Nova Reserva
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar reserva..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Card className="overflow-hidden">
        <Table headers={['Cliente', 'Veículo', 'Retirada', 'Devolução', 'Valor', 'Status', '']}>
          {filtered.map((r) => (
            <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium text-gray-900">{r.cliente}</td>
              <td className="px-4 py-3 text-gray-600">{r.veiculo}</td>
              <td className="px-4 py-3 text-gray-600">{r.retirada}</td>
              <td className="px-4 py-3 text-gray-600">{r.devolucao}</td>
              <td className="px-4 py-3 font-medium text-gray-900">R$ {r.valor}</td>
              <td className="px-4 py-3">
                <Badge variant={r.status === 'confirmada' ? 'success' : 'warning'}>{r.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:underline text-sm">Detalhes</button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nova Reserva">
        <form className="space-y-4">
          <Input label="Cliente" placeholder="Nome do cliente" />
          <Input label="Veículo" placeholder="Modelo do veículo" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Data de Retirada" type="date" />
            <Input label="Data de Devolução" type="date" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button>Confirmar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}