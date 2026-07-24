import { LayoutDashboard, PawPrint, Calendar, Package } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pacientes', label: 'Pacientes', icon: PawPrint },
  { id: 'agendamentos', label: 'Agendamentos', icon: Calendar },
  { id: 'produtos', label: 'Produtos', icon: Package },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-16 md:w-56 bg-white border-r border-gray-200 flex flex-col items-center md:items-stretch py-6 px-2 md:px-4 shadow-sm">
      <div className="mb-8 flex items-center justify-center md:justify-start gap-2">
        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
          <PawPrint className="text-white" size={18} />
        </div>
        <h1 className="hidden md:block text-lg font-bold text-teal-700">PetCure</h1>
      </div>
      <nav className="flex flex-col gap-2 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-teal-50 text-teal-700 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="hidden md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
