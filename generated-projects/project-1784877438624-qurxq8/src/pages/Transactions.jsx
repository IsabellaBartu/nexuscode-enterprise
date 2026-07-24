import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const transactions = [
  { id: 1, description: 'Salário', amount: 8500, type: 'income', date: '2025-04-01', category: 'Trabalho' },
  { id: 2, description: 'Aluguel', amount: -2200, type: 'expense', date: '2025-04-02', category: 'Moradia' },
  { id: 3, description: 'Freelance', amount: 3200, type: 'income', date: '2025-04-03', category: 'Extra' },
  { id: 4, description: 'Supermercado', amount: -580, type: 'expense', date: '2025-04-04', category: 'Alimentação' },
  { id: 5, description: 'Academia', amount: -120, type: 'expense', date: '2025-04-05', category: 'Saúde' },
  { id: 6, description: 'Investimentos', amount: 1500, type: 'income', date: '2025-04-06', category: 'Investimentos' },
  { id: 7, description: 'Restaurante', amount: -95, type: 'expense', date: '2025-04-07', category: 'Lazer' },
  { id: 8, description: 'Venda de item', amount: 450, type: 'income', date: '2025-04-08', category: 'Extra' },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
          <p className="mt-1 text-sm text-gray-500">Histórico completo</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          + Nova Transação
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar transações..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Filtros
        </button>
      </div>

      <div className="rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-4 font-medium text-gray-500">Descrição</th>
                <th className="px-5 py-4 font-medium text-gray-500">Categoria</th>
                <th className="px-5 py-4 font-medium text-gray-500">Data</th>
                <th className="px-5 py-4 text-right font-medium text-gray-500">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="flex items-center gap-3 px-5 py-4">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {t.type === 'income' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{t.description}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{t.category}</td>
                  <td className="px-5 py-4 text-gray-600">{t.date}</td>
                  <td className={`px-5 py-4 text-right font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.amount > 0 ? '+' : ''}
                    {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}