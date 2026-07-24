import BudgetCard from '../components/BudgetCard';

export default function Budgets() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orçamentos</h1>
          <p className="mt-1 text-sm text-gray-500">Gerencie seus limites mensais</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          + Novo Orçamento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BudgetCard title="Alimentação" spent={1200} limit={1500} color="blue" />
        <BudgetCard title="Transporte" spent={450} limit={600} color="green" />
        <BudgetCard title="Lazer" spent={800} limit={500} color="red" />
        <BudgetCard title="Moradia" spent={2200} limit={2500} color="yellow" />
        <BudgetCard title="Saúde" spent={300} limit={400} color="blue" />
        <BudgetCard title="Educação" spent={600} limit={800} color="green" />
      </div>
    </div>
  );
}