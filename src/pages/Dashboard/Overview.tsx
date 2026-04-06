import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Plus,
  Globe,
  AlertCircle,
  Loader2,
  Map as MapIcon,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStartupsByUser } from '../../services/startupService';
import { useAuth } from '../../services/authService';
import { fetchTrendingProblems } from '../../services/geminiService';

export const Overview = () => {
  const { user } = useAuth();
  const [ideaCount, setIdeaCount] = useState(0);
  const [trendingProblems, setTrendingProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [startupData, setStartupData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const startups = await getStartupsByUser(user.uid);
        setIdeaCount(startups.length);

        const analysis = localStorage.getItem('founder_os_startup_analysis');
        if (analysis) {
          const parsed = JSON.parse(analysis);
          setStartupData(parsed);
          const problems = await fetchTrendingProblems(parsed.domain || 'Technology');
          setTrendingProblems(problems);
        } else {
          const problems = await fetchTrendingProblems('Technology');
          setTrendingProblems(problems);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Global startup ecosystem and your progress.</p>
        </div>
        <Link to="/dashboard/analysis">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#6C3BFF] text-white font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111] hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
            <Plus className="w-5 h-5" /> NEW ANALYSIS
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-4 border-[#111111] p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#F8F7FF] rounded-2xl border-2 border-[#111111] flex items-center justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-[#6C3BFF]" />
          </div>
          <div className="text-4xl font-black mb-1">{ideaCount}</div>
          <div className="text-xs font-black uppercase tracking-widest text-gray-400">Ideas Listed</div>
        </div>

        <div className="md:col-span-2 bg-[#111111] text-white border-4 border-[#111111] p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(108,59,255,0.3)]">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#6C3BFF]" />
            <h3 className="text-xl font-black uppercase tracking-widest">Trending Problems ({startupData?.domain || 'Global'})</h3>
          </div>
          
          {loading ? (
            <div className="flex items-center gap-3 text-white/40 font-bold">
              <Loader2 className="w-4 h-4 animate-spin" /> Fetching market gaps...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingProblems.map((p, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border-2 border-white/10 hover:border-[#6C3BFF]/50 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 bg-[#6C3BFF] rounded text-white uppercase">{p.region}</span>
                  </div>
                  <div className="font-black text-sm mb-1 group-hover:text-[#6C3BFF] transition-colors">{p.problem}</div>
                  <p className="text-[10px] text-white/40 font-medium leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-4 border-[#111111] rounded-[32px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-8 border-b-4 border-[#111111] flex justify-between items-center bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#6C3BFF]" />
            <h3 className="text-xl font-black uppercase tracking-widest">Live Startup Incubation Map</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-black">1,240 ACTIVE INCUBATORS</span>
            </div>
          </div>
        </div>
        <div className="h-[500px] bg-[#F8F7FF] relative overflow-hidden flex items-center justify-center">
          {/* Placeholder for a map visualization */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <MapIcon className="w-full h-full" />
          </div>
          
          {/* Simulated data points */}
          {[
            { top: '20%', left: '30%', label: 'Y-Combinator', city: 'SF, USA' },
            { top: '45%', left: '25%', label: 'Techstars', city: 'Boulder, USA' },
            { top: '35%', left: '50%', label: 'Station F', city: 'Paris, FR' },
            { top: '60%', left: '70%', label: 'Antler', city: 'Singapore' },
            { top: '55%', left: '65%', label: 'T-Hub', city: 'Hyderabad, IN' },
            { top: '40%', left: '75%', label: 'Startup Tokyo', city: 'Tokyo, JP' },
            { top: '70%', left: '40%', label: 'Startup Chile', city: 'Santiago, CL' },
          ].map((point, i) => (
            <div 
              key={i}
              className="absolute group cursor-pointer"
              style={{ top: point.top, left: point.left }}
            >
              <div className="w-4 h-4 bg-[#6C3BFF] rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                <div className="bg-[#111111] text-white p-3 rounded-xl border-2 border-[#6C3BFF] whitespace-nowrap shadow-xl">
                  <div className="font-black text-xs">{point.label}</div>
                  <div className="text-[10px] text-white/50 font-bold">{point.city}</div>
                </div>
                <div className="w-2 h-2 bg-[#111111] border-r-2 border-b-2 border-[#6C3BFF] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>
          ))}

          <div className="text-center z-10 p-8 max-w-md">
            <div className="text-3xl font-black mb-4 tracking-tight">Global Incubation Network</div>
            <p className="text-gray-500 font-bold leading-relaxed">
              Real-time tracking of startups currently in incubation programs worldwide. Click on a hub to see active cohorts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
