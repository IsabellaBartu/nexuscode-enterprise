import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Card from '../components/Card';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

const clientesData = [
  { id: 1, nome: 'Carlos Silva', cpf: '123.456.789-00', cnh: '12345678901', telefone: '(11) 99999-0001', email: 'carlos@email.com', historico: 5 },
  { id: 2, nome: 'Ana Oliveira', cpf: '987.654.321-00', cnh: '98765432101', telefone: '(11) 98888-0002', email: 'ana@email.com', historico: 3 },
  { id: 3, nome: 'Marcos Lima', cpf: '456.789.123-00', cnh: '45678912301', telefone: '(11) 97777-0003', email: 'marcos@email.com', historico: 8 },
];

export default function Clientes() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = clientesData.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.cpf.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie seus clientes</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Novo Cliente
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Card className="overflow-hidden">
        <Table headers={['Nome', 'CPF', 'CNH', 'Telefone', 'Email', 'Locações', '']}>
          {filtered.map((c) => (
            <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium text-gray-900">{c.nome}</td>
              <td className="px-4 py-3 text-gray-600">{c.cpf}</td>
              <td className="px-4 py-3 text-gray-600">{c.cnh}</td>
              <td className="px-4 py-3 text-gray-600">{c.telefone}</td>
              <td className="px-4 py-3 text-gray-600">{c.email}</td>
              <td className="px-4 py-3"><Badge variant="info">{c.historico} locações</Badge></td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:underline text-sm">Ver</button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Cadastrar Cliente">
        <form className="space-y-4">
          <Input label="Nome Completo" placeholder="Nome do cliente" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="CPF" placeholder="000.000.000-00" />
            <Input label="CNH" placeholder="Número da CNH" />
            <Input label="Telefone" placeholder="(11) 99999-0000" />
            <Input label="Email" type="email" placeholder="cliente@email.com" />
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