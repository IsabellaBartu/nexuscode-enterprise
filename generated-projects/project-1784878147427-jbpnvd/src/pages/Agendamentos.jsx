import { Clock, PawPrint } from 'lucide-react';

const appointments = [
  { id: 1, horario: '08:00', pet: 'Thor', tutor: 'Ana Silva', status: 'Em atendimento' },
  { id: 2, horario: '09:00', pet: 'Mimi', tutor: 'Carlos Souza', status: 'Aguardando' },
  { id: 3, horario: '10:30', pet: 'Bolinha', tutor: 'Mariana Costa', status: 'Finalizado' },
  { id: 4, horario: '11:00', pet: 'Luna', tutor: 'Pedro Alves', status: 'Aguardando' },
  { id: 5, horario: '14:00', pet: 'Rex', tutor: 'Fernanda Lima', status: 'Em atendimento' },
  { id: 6, horario: '15:30', pet: 'Pipoca', tutor: 'João Santos', status: 'Finalizado' },
];

const statusColors = {
  'Aguardando': 'bg-yellow-100 text-yellow-700',
  'Em atendimento': 'bg-blue-100 text-blue-700',
  'Finalizado': 'bg-green-100 text-green-700',
};

export default function Agendamentos() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agendamentos de Hoje</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {appointments.map((app) => (
            <div key={app.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2 text-teal-600 font-medium min-w-[80px]">
                <Clock size={16} />
                <span>{app.horario}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <PawPrint size={16} className="text-gray-400" />
                  <span className="font-semibold text-gray-800">{app.pet}</span>
                </div>
                <p className="text-sm text-gray-500">{app.tutor}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
