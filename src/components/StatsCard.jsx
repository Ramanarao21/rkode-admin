export default function StatsCard({ title, value, icon: Icon, color = 'purple' }) {
  const colors = {
    purple: {
      bg: 'bg-white',
      border: 'border-purple-100',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      accent: 'border-l-purple-500',
    },
    blue: {
      bg: 'bg-white',
      border: 'border-blue-100',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      accent: 'border-l-blue-500',
    },
    green: {
      bg: 'bg-white',
      border: 'border-green-100',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      accent: 'border-l-green-500',
    },
  };

  return (
    <div className={`${colors[color].bg} rounded-xl border ${colors[color].border} border-l-4 ${colors[color].accent} p-6 hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colors[color].iconBg} flex items-center justify-center`}>
          <Icon className={`text-2xl ${colors[color].iconColor}`} />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
        <p className="text-3xl font-bold text-[#0f0d1a]">{value}</p>
      </div>
    </div>
  );
}
