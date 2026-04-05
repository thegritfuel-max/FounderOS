import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ArrowLeft } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuth = location.pathname === '/login' || location.pathname === '/signup';

  if (isDashboard || isAuth) return null;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="px-8 h-16 flex items-center justify-between">
        {isAuth ? (
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 group text-[#111111] font-black uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        ) : (
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111] group-hover:rotate-[-5deg] transition-transform">
              F
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#111111] drop-shadow-sm">FounderOS</span>
          </Link>
        )}

        {!isAuth && (
          <>
            <div className="hidden md:flex items-center gap-10">
              <Link to="/features" className="text-sm font-black text-[#111111] hover:text-[#6C3BFF] transition-colors uppercase tracking-widest">Features</Link>
              <Link to="/pricing" className="text-sm font-black text-[#111111] hover:text-[#6C3BFF] transition-colors uppercase tracking-widest">Pricing</Link>
              <Link to="/about" className="text-sm font-black text-[#111111] hover:text-[#6C3BFF] transition-colors uppercase tracking-widest">About</Link>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-black text-[#111111] hover:text-[#6C3BFF] transition-colors uppercase tracking-widest">Login</Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-2.5 bg-[#6C3BFF] text-white text-sm font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
