import Card from '../components/Card';
import Badge from '../components/Badge';

const pagamentosData = [
  { id: 1, cliente: 'Carlos Silva', forma: 'Cartão de Crédito', valor: 900, data: '20/06/2025', status: 'pago' },
  { id: 2, cliente: 'Ana Oliveira', forma: 'Pix', valor: 1200, data: '22/06/2025', status: 'pendente' },
  { id: 3, cliente: 'Marcos Lima', forma: 'Boleto', valor: 1050, data: '18/06/2025', status: 'pago' },
  { id: 4, cliente: 'Juliana Costa', forma: 'Cartão de Débito', valor: 650, data: '15/06/2025', status: 'cancelado' },
];

export default function Pagamentos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pagamentos</h1>
        <p className="text-sm text-gray-500 mt-1">Histórico de pagamentos</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Cliente</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Forma</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Valor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Data</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {pagamentosData.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.cliente}</td>
                  <td className="px-4 py-3 text-gray-600">{p.forma}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">R$ {p.valor}</td>
                  <td className="px-4 py-3 text-gray-600">{p.data}</td>
                  <td className="px-4 py-3">
                    <Badge variant={p.status === 'pago' ? 'success' : p.status === 'pendente' ? 'warning' : 'danger'}>{p.status}</Badge>
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