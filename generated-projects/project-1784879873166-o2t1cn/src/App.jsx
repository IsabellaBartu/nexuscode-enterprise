import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Veiculos from './pages/Veiculos';
import Clientes from './pages/Clientes';
import Reservas from './pages/Reservas';
import Contratos from './pages/Contratos';
import Pagamentos from './pages/Pagamentos';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';

export default function App() {
  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/veiculos" element={<Veiculos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/pagamentos" element={<Pagamentos />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}