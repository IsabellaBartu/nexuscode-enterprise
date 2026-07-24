import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft, PiggyBank, Target, Settings, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: ArrowRightLeft, label: 'Transações' },
    { to: '/budgets', icon: PiggyBank, label: 'Orçamentos' },
    { to: '/goals', icon: Target, label: 'Metas' },
    { to: '/settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-md md:hidden"
        aria-label="Abrir menu"
      >
        <LayoutDashboard className="h-5 w-5 text-blue-600" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">F</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Finanças</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 hover:bg-gray-100 md:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}