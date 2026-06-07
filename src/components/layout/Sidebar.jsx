import React from 'react';
import { LayoutDashboard, Users, User, Bus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'vehicles', label: 'Veículos', icon: Bus, path: '/vehicles' },
  { id: 'drivers', label: 'Motoristas', icon: User, path: '/drivers' },
  { id: 'passengers', label: 'Passageiros', icon: Users, path: '/passengers' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1e2d4a] text-slate-300 flex flex-col">
      <div className="p-6 text-white font-bold text-xl flex items-center gap-2 border-b border-slate-700">
        <Bus className="text-blue-400" /> TFD Admin
      </div>
      <nav className="flex-1 mt-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                ? 'bg-[#2a4070] text-white border-l-4 border-blue-400'
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
