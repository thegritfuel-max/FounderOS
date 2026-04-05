import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Rocket, ArrowRight, Github, ArrowLeft } from 'lucide-react';
import { signInWithGoogle } from '../services/authService';

export const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    stage: 'idea'
  });

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row relative">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-white border-4 border-[#111111] rounded-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        BACK TO HOME
      </Link>

      {/* Left side - Branding/Info */}
      <div className="hidden md:flex md:w-1/2 bg-[#111111] p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-20">
            <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center text-white font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
              F
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">FounderOS</span>
          </Link>

          <h2 className="text-5xl font-black text-white tracking-tighter leading-tight mb-8">
            The only tool you need to <br />
            <span className="text-[#6C3BFF]">build and scale</span> <br />
            your next big thing.
          </h2>

          <div className="space-y-6">
            {[
              "AI-powered business planning",
              "Real-time market research",
              "Automated financial models",
              "Interactive execution roadmaps"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70 font-bold">
                <div className="w-6 h-6 bg-[#6C3BFF]/20 rounded-full flex items-center justify-center border border-[#6C3BFF]/30">
                  <ArrowRight className="w-3 h-3 text-[#6C3BFF]" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111111] bg-gray-800" />
            ))}
          </div>
          <div className="text-white/50 text-sm font-bold">JOIN 10,000+ FOUNDERS</div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#6C3BFF] rounded-full blur-[120px] opacity-20" />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tighter mb-2">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-gray-500 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Link to={isLogin ? '/signup' : '/login'} className="text-[#6C3BFF] font-bold ml-2 hover:underline">
                {isLogin ? 'Sign up for free' : 'Login here'}
              </Link>
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-4 bg-white border-4 border-[#111111] rounded-2xl font-black flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              CONTINUE WITH GOOGLE
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-[#EAEAEA]"></div></div>
            <div className="relative flex justify-center text-xs font-black uppercase tracking-widest"><span className="bg-[#FAFAFA] px-4 text-gray-400">OR EMAIL</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-white border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-white border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-white border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Startup Stage</label>
                <select 
                  className="w-full px-5 py-4 bg-white border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] appearance-none transition-all"
                  value={formData.stage}
                  onChange={e => setFormData({...formData, stage: e.target.value})}
                >
                  <option value="idea">Just an idea</option>
                  <option value="mvp">Building MVP</option>
                  <option value="growth">In Growth</option>
                  <option value="scale">Scaling</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#6C3BFF] text-white text-lg font-black rounded-2xl border-4 border-[#111111] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
            >
              {loading ? 'PROCESSING...' : isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 font-bold leading-relaxed">
            By continuing, you agree to FounderOS AI's <br />
            <span className="text-gray-900 underline cursor-pointer">Terms of Service</span> and <span className="text-gray-900 underline cursor-pointer">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
