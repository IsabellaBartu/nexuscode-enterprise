import { Car, Users, CalendarCheck, DollarSign, AlertTriangle } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const stats = [
  { label: 'Receita Mensal', value: 'R$ 458.900', icon: DollarSign, variant: 'success' },
  { label: 'Veículos Disponíveis', value: '42', icon: Car, variant: 'info' },
  { label: 'Veículos Alugados', value: '28', icon: Car, variant: 'warning' },
  { label: 'Reservas Ativas', value: '15', icon: CalendarCheck, variant: 'info' },
  { label: 'Clientes Cadastrados', value: '1.234', icon: Users, variant: 'success' },
];

const receitaData = [
  { mes: 'Jan', receita: 320 },
  { mes: 'Fev', receita: 380 },
  { mes: 'Mar', receita: 420 },
  { mes: 'Abr', receita: 390 },
  { mes: 'Mai', receita: 450 },
  { mes: 'Jun', receita: 470 },
];

const ultimasReservas = [
  { cliente: 'Carlos Silva', veiculo: 'Toyota Corolla', data: '15/06/2025', status: 'confirmada' },
  { cliente: 'Ana Oliveira', veiculo: 'Honda Civic', data: '16/06/2025', status: 'pendente' },
  { cliente: 'Marcos Lima', veiculo: 'Ford Ranger', data: '17/06/2025', status: 'confirmada' },
  { cliente: 'Juliana Costa', veiculo: 'Chevrolet Onix', data: '18/06/2025', status: 'cancelada' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Visão geral da operação</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${stat.variant === 'success' ? 'green' : stat.variant === 'info' ? 'blue' : 'yellow'}-50`}>
              <stat.icon className={`w-6 h-6 text-${stat.variant === 'success' ? 'green' : stat.variant === 'info' ? 'blue' : 'yellow'}-600`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Receita Mensal (R$ mil)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={receitaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="receita" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimas Reservas</h2>
          <div className="space-y-3">
            {ultimasReservas.map((reserva, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{reserva.cliente}</p>
                  <p className="text-xs text-gray-500">{reserva.veiculo} - {reserva.data}</p>
                </div>
                <Badge variant={reserva.status === 'confirmada' ? 'success' : reserva.status === 'pendente' ? 'warning' : 'danger'}>
                  {reserva.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Alerta</h3>
            <p className="text-sm text-gray-600 mt-1">3 veículos estão com revisão atrasada. Verifique a frota.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}