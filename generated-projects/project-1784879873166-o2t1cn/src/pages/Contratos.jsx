import { FileText } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const contratosData = [
  { id: 1, cliente: 'Carlos Silva', veiculo: 'Toyota Corolla', valor: 1800, status: 'ativo', assinatura: 'Sim' },
  { id: 2, cliente: 'Ana Oliveira', veiculo: 'Honda Civic', valor: 2400, status: 'ativo', assinatura: 'Sim' },
  { id: 3, cliente: 'Marcos Lima', veiculo: 'Ford Ranger', valor: 1050, status: 'encerrado', assinatura: 'Sim' },
];

export default function Contratos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contratos</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie os contratos de locação</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Contratos Ativos</p>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Contratos Encerrados</p>
          <p className="text-2xl font-bold text-gray-900">1</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Valor Total</p>
          <p className="text-2xl font-bold text-blue-600">R$ 5.250</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Cliente</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Veículo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Valor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Assinatura</th>
              </tr>
            </thead>
            <tbody>
              {contratosData.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.cliente}</td>
                  <td className="px-4 py-3 text-gray-600">{c.veiculo}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">R$ {c.valor}</td>
                  <td className="px-4 py-3">
                    <Badge variant={c.status === 'ativo' ? 'success' : 'default'}>{c.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{c.assinatura}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}