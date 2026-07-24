import { CalendarDays, DollarSign, PawPrint, ShoppingBag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const stats = [
  { label: 'Atendimentos Hoje', value: 12, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Faturamento Mês', value: 'R$ 24.580', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Pets Cadastrados', value: 187, icon: PawPrint, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Produtos Vendidos', value: 342, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const data = [
  { day: 'Seg', atendimentos: 8 },
  { day: 'Ter', atendimentos: 12 },
  { day: 'Qua', atendimentos: 10 },
  { day: 'Qui', atendimentos: 15 },
  { day: 'Sex', atendimentos: 9 },
  { day: 'Sáb', atendimentos: 6 },
  { day: 'Dom', atendimentos: 3 },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${item.bg}`}>
                <Icon className={item.color} size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-xl font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Movimento da Semana</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="atendimentos" fill="#14b8a6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
