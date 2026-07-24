import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import TransactionTable from '../components/TransactionTable';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Resumo financeiro do mês</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Saldo Total"
          value={12450}
          icon={Wallet}
          variant="blue"
          trend={12.5}
        />
        <Card
          title="Receitas"
          value={8500}
          icon={TrendingUp}
          trend={8.2}
        />
        <Card
          title="Despesas"
          value={3200}
          icon={TrendingDown}
          trend={-3.1}
        />
        <Card
          title="Economia"
          value={5300}
          icon={PiggyBank}
          trend={15.7}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Chart />
        <TransactionTable />
      </div>
    </div>
  );
}