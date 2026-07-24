import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const receitaMensal = [
  { mes: 'Jan', receita: 320 },
  { mes: 'Fev', receita: 380 },
  { mes: 'Mar', receita: 420 },
  { mes: 'Abr', receita: 390 },
  { mes: 'Mai', receita: 450 },
  { mes: 'Jun', receita: 470 },
];

const veiculosAlugados = [
  { nome: 'Toyota Corolla', alugueis: 45 },
  { nome: 'Honda Civic', alugueis: 38 },
  { nome: 'Ford Ranger', alugueis: 22 },
  { nome: 'Chevrolet Onix', alugueis: 55 },
];

const ocupacao = [
  { name: 'Ocupado', value: 65 },
  { name: 'Disponível', value: 35 },
];

const COLORS = ['#2563eb', '#e5e7eb'];

export default function Relatorios() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-sm text-gray-500 mt-1">Análise da operação</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Receita por Mês (R$ mil)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={receitaMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="receita" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Veículos Mais Alugados</h2>
          <div className="space-y-3">
            {veiculosAlugados.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{v.nome}</span>
                <span className="text-sm font-semibold text-gray-900">{v.alugueis} aluguéis</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Taxa de Ocupação da Frota</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ocupacao} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                {ocupacao.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Clientes Mais Ativos</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Carlos Silva</span>
              <span className="text-sm font-semibold text-gray-900">8 locações</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Ana Oliveira</span>
              <span className="text-sm font-semibold text-gray-900">6 locações</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Marcos Lima</span>
              <span className="text-sm font-semibold text-gray-900">5 locações</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}