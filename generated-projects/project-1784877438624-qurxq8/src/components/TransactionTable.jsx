import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const transactions = [
  { id: 1, description: 'Salário', amount: 8500, type: 'income', date: '2025-04-01', category: 'Trabalho' },
  { id: 2, description: 'Aluguel', amount: -2200, type: 'expense', date: '2025-04-02', category: 'Moradia' },
  { id: 3, description: 'Freelance', amount: 3200, type: 'income', date: '2025-04-03', category: 'Extra' },
  { id: 4, description: 'Supermercado', amount: -580, type: 'expense', date: '2025-04-04', category: 'Alimentação' },
  { id: 5, description: 'Academia', amount: -120, type: 'expense', date: '2025-04-05', category: 'Saúde' },
  { id: 6, description: 'Investimentos', amount: 1500, type: 'income', date: '2025-04-06', category: 'Investimentos' },
];

export default function TransactionTable() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Transações Recentes</h3>
      <div className="space-y-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {t.type === 'income' ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownRight className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{t.description}</p>
                <p className="text-xs text-gray-500">{t.category} • {t.date}</p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${
                t.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {t.amount > 0 ? '+' : ''}
              {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}