import { PiggyBank } from 'lucide-react';

export default function BudgetCard({ title, spent, limit, color = 'blue' }) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-blue-600" />
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        </div>
        <span className="text-xs text-gray-500">
          {spent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /{' '}
          {limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
        <div
          className={`h-2 rounded-full transition-all ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">{Math.round(percentage)}% utilizado</p>
    </div>
  );
}