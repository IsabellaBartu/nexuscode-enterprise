import { Target } from 'lucide-react';

export default function GoalCard({ title, current, target, deadline }) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        </div>
        <span className="text-xs text-gray-500">{deadline}</span>
      </div>
      <div className="mt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-bold text-gray-900">
            {current.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className="text-xs text-gray-500">
            de {target.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">{Math.round(percentage)}% concluído</p>
      </div>
    </div>
  );
}