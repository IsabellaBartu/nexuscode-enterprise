import GoalCard from '../components/GoalCard';

export default function Goals() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Metas Financeiras</h1>
          <p className="mt-1 text-sm text-gray-500">Acompanhe seus objetivos</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          + Nova Meta
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <GoalCard title="Viagem para Europa" current={15000} target={30000} deadline="Dez 2025" />
        <GoalCard title="Fundo de Emergência" current={12000} target={20000} deadline="Jun 2025" />
        <GoalCard title="Carro Novo" current={25000} target={80000} deadline="Dez 2026" />
        <GoalCard title="Curso Profissional" current={3500} target={5000} deadline="Ago 2025" />
        <GoalCard title="Aposentadoria" current={45000} target={200000} deadline="2040" />
        <GoalCard title="Reforma da Casa" current={8000} target={25000} deadline="Mar 2026" />
      </div>
    </div>
  );
}