export default function Card({ title, value, icon: Icon, trend, variant = 'default' }) {
  const variants = {
    default: 'bg-white text-gray-900',
    blue: 'bg-blue-600 text-white',
  };

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-md ${variants[variant]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium opacity-80">{title}</span>
        {Icon && (
          <div className={`rounded-lg p-2 ${variant === 'blue' ? 'bg-white/20' : 'bg-blue-50'}`}>
            <Icon className={`h-5 w-5 ${variant === 'blue' ? 'text-white' : 'text-blue-600'}`} />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold">
          {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>
  );
}