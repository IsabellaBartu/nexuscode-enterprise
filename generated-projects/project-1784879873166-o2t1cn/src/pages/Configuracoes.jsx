import { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie sua conta e preferências</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Perfil da Empresa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Nome da Locadora" defaultValue="DriveNow Locadora" />
          <Input label="CNPJ" defaultValue="00.000.000/0001-00" />
          <Input label="Telefone" defaultValue="(11) 3000-0000" />
          <Input label="Email" defaultValue="contato@drivenow.com" />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tema</h2>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">Claro</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">Escuro</button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notificações</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Receber notificações por email</span>
          <button
            onClick={() => setNotificacoes(!notificacoes)}
            className={`relative w-12 h-6 rounded-full transition-colors ${notificacoes ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notificacoes ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usuários</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">admin@drivenow.com</p>
            </div>
            <span className="text-xs text-gray-500">Administrador</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">João Operador</p>
              <p className="text-xs text-gray-500">joao@drivenow.com</p>
            </div>
            <span className="text-xs text-gray-500">Operador</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button>Salvar Alterações</Button>
      </div>
    </div>
  );
}