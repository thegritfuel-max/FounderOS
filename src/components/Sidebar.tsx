import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Rocket, 
  BarChart3, 
  Milestone, 
  FlaskConical, 
  FileText, 
  MessageSquare, 
  Settings,
  LogOut,
  Zap,
  Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';
import { logout } from '../services/authService';
import { UpgradeModal } from './UpgradeModal';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Lightbulb, label: 'Idea Analysis', path: '/dashboard/analysis' },
  { icon: Search, label: 'Market Research', path: '/dashboard/market' },
  { icon: Rocket, label: 'Product Builder', path: '/dashboard/product' },
  { icon: BarChart3, label: 'Finance', path: '/dashboard/finance' },
  { icon: Milestone, label: 'Roadmap', path: '/dashboard/roadmap' },
  { icon: FlaskConical, label: 'Simulation Lab', path: '/dashboard/simulation' },
  { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { icon: MessageSquare, label: 'AI Mentor', path: '/dashboard/mentor' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <aside className="w-64 h-screen bg-white border-r-2 border-[#EAEAEA] flex flex-col fixed left-0 top-0 z-40">
        <div className="p-6 border-b-2 border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6C3BFF] rounded-lg flex items-center justify-center text-white font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
              F
            </div>
            <span className="text-xl font-black tracking-tighter">FounderOS</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 border-transparent",
                isActive 
                  ? "bg-[#F8F7FF] text-[#6C3BFF] border-[#6C3BFF] shadow-[2px_2px_0px_0px_rgba(108,59,255,0.1)]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t-2 border-[#EAEAEA]">
          <div className="bg-[#FFF9F0] border-2 border-[#FFB84D] rounded-xl p-4 mb-4 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#B45309] font-bold text-xs mb-1">
                <Zap className="w-3 h-3 fill-[#FFB84D]" />
                PRO PLAN
              </div>
              <p className="text-[10px] text-[#B45309] font-medium mb-2">Unlock all AI features and exports.</p>
              <button 
                onClick={() => setIsUpgradeOpen(true)}
                className="w-full py-2 bg-[#FFB84D] text-white text-xs font-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-[-1px] active:translate-y-[1px] transition-all"
              >
                UPGRADE NOW
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 opacity-10 rotate-12">
              <Rocket className="w-full h-full" />
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={() => setIsUpgradeOpen(false)} 
        onSuccess={() => {}} 
      />
    </>
  );
};
