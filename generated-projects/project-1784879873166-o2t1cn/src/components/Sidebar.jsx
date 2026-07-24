import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Users, CalendarCheck, FileText, CreditCard, BarChart3, Settings } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/veiculos', icon: Car, label: 'Veículos' },
    { to: '/clientes', icon: Users, label: 'Clientes' },
    { to: '/reservas', icon: CalendarCheck, label: 'Reservas' },
    { to: '/contratos', icon: FileText, label: 'Contratos' },
    { to: '/pagamentos', icon: CreditCard, label: 'Pagamentos' },
    { to: '/relatorios', icon: BarChart3, label: 'Relatórios' },
    { to: '/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <Car className="w-8 h-8 text-orange-500" />
        <span className="text-xl font-bold text-gray-900">DriveNow</span>
      </div>
      <nav className="flex-1 py-4 space-y-1 px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          Sistema Online
        </div>
      </div>
    </aside>
  );
}