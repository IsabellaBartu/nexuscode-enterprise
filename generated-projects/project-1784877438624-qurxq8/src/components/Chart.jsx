import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', receita: 8500, despesa: 3200 },
  { name: 'Fev', receita: 9200, despesa: 2800 },
  { name: 'Mar', receita: 7800, despesa: 3500 },
  { name: 'Abr', receita: 10200, despesa: 2900 },
  { name: 'Mai', receita: 8800, despesa: 3100 },
  { name: 'Jun', receita: 9500, despesa: 2700 },
];

export default function Chart() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Receitas vs Despesas</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <Bar dataKey="receita" fill="#2563eb" radius={[6, 6, 0, 0]} />
          <Bar dataKey="despesa" fill="#f43f5e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}