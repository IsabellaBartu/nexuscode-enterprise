import { User, Bell, Shield, Palette, CreditCard } from 'lucide-react';

export default function Settings() {
  const sections = [
    { icon: User, title: 'Perfil', description: 'Nome, email e foto' },
    { icon: Bell, title: 'Notificações', description: 'Alertas e lembretes' },
    { icon: Shield, title: 'Segurança', description: 'Senha e autenticação' },
    { icon: Palette, title: 'Aparência', description: 'Tema e cores' },
    { icon: CreditCard, title: 'Contas', description: 'Bancos e cartões' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-sm text-gray-500">Personalize sua experiência</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <button
            key={section.title}
            className="flex items-start gap-4 rounded-2xl bg-white p-5 text-left shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <section.icon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{section.title}</h3>
              <p className="mt-0.5 text-xs text-gray-500">{section.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Preferências Gerais</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Moeda padrão</p>
              <p className="text-xs text-gray-500">BRL (R$)</p>
            </div>
            <select className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>BRL</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Início do mês fiscal</p>
              <p className="text-xs text-gray-500">Dia 1 de cada mês</p>
            </div>
            <select className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Dia 1</option>
              <option>Dia 15</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações por email</p>
              <p className="text-xs text-gray-500">Receba alertas semanais</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}