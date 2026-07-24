import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Agendamentos from './pages/Agendamentos';
import Produtos from './pages/Produtos';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pacientes':
        return <Pacientes />;
      case 'agendamentos':
        return <Agendamentos />;
      case 'produtos':
        return <Produtos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {renderPage()}
      </main>
    </div>
  );
}
