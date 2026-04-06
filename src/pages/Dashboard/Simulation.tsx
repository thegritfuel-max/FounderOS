import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Play, RefreshCw, TrendingUp, AlertTriangle, DollarSign, Users, Zap, ShieldAlert, Target } from 'lucide-react';
import { ChartCard } from '../../components/ChartCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export const Simulation = () => {
  const [params, setParams] = useState({
    price: 49,
    marketing: 5000,
    growth: 15,
    churn: 5,
    viralCoefficient: 0.2,
    retentionRate: 85,
    burnRate: 100000
  });
  const [simulating, setSimulating] = useState(false);
  
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    runSimulation();
  }, []);

  const runSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      const data = [];
      let users = 1000;
      let revenue = 0;
      
      const multiplier = (params.price / 49) * (params.marketing / 5000) * (params.growth / 15);

      for (let i = 1; i <= 6; i++) {
        const newUsers = users * (params.growth / 100) * (1 + params.viralCoefficient) * multiplier;
        const churnedUsers = users * (params.churn / 100);
        users = users + newUsers - churnedUsers;
        revenue = users * params.price;
        
        data.push({
          month: `M${i}`,
          revenue: Math.round(revenue),
          profit: Math.round(revenue - params.burnRate),
          users: Math.round(users)
        });
      }
      setResults(data);
      setSimulating(false);
    }, 800);
  };

  const currentResults = results[results.length - 1] || { revenue: 0, profit: 0, users: 0 };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter mb-1">Simulation Lab</h1>
        <p className="text-gray-500 font-medium">Test business scenarios before you build.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-white border-4 border-[#111111] rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#F8F7FF] rounded-lg border-2 border-[#111111]">
              <FlaskConical className="w-6 h-6 text-[#6C3BFF]" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest">Variables</h3>
          </div>

          <div className="space-y-6">
            {[
              { label: 'PRICE POINT (₹)', key: 'price', min: 9, max: 499, step: 1, icon: DollarSign },
              { label: 'MARKETING (₹)', key: 'marketing', min: 1000, max: 50000, step: 1000, icon: Target },
              { label: 'USER GROWTH %', key: 'growth', min: 1, max: 100, step: 1, icon: TrendingUp },
              { label: 'CHURN RATE %', key: 'churn', min: 1, max: 50, step: 1, icon: AlertTriangle },
              { label: 'VIRAL COEFF.', key: 'viralCoefficient', min: 0, max: 2, step: 0.1, icon: Zap },
              { label: 'RETENTION %', key: 'retentionRate', min: 0, max: 100, step: 1, icon: ShieldAlert },
              { label: 'MONTHLY BURN (₹)', key: 'burnRate', min: 10000, max: 1000000, step: 10000, icon: DollarSign },
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex justify-between font-black text-[10px] uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1"><item.icon className="w-3 h-3" /> {item.label}</span>
                  <span className="text-[#6C3BFF]">{(params as any)[item.key]}</span>
                </div>
                <input 
                  type="range" 
                  min={item.min} 
                  max={item.max} 
                  step={item.step}
                  value={(params as any)[item.key]} 
                  onChange={(e) => setParams({ ...params, [item.key]: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-[#F0F0F0] rounded-lg appearance-none cursor-pointer accent-[#6C3BFF]" 
                />
              </div>
            ))}
          </div>

          <button 
            onClick={runSimulation}
            disabled={simulating}
            className="w-full py-4 bg-[#111111] text-white font-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(108,59,255,0.5)] hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {simulating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-white" />}
            RUN SIMULATION
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-4 border-[#111111] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <TrendingUp className="w-3 h-3" /> REVENUE
              </div>
              <div className="text-2xl font-black text-green-500">₹{currentResults.revenue.toLocaleString()}</div>
            </div>
            <div className="bg-white border-4 border-[#111111] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <AlertTriangle className="w-3 h-3" /> PROFIT/LOSS
              </div>
              <div className={`text-2xl font-black ${currentResults.profit >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                ₹{currentResults.profit.toLocaleString()}
              </div>
            </div>
            <div className="bg-white border-4 border-[#111111] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <Users className="w-3 h-3" /> USERS
              </div>
              <div className="text-2xl font-black text-[#6C3BFF]">{currentResults.users.toLocaleString()}</div>
            </div>
          </div>

          <ChartCard title="Simulation Projection" description="Projected growth based on selected variables">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '2px solid #111111', fontWeight: 700 }}
                />
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone" dataKey="revenue" stroke="#6C3BFF" strokeWidth={4} dot={{r: 6, fill: '#6C3BFF', strokeWidth: 2, stroke: '#fff'}} />
                <Line type="monotone" dataKey="profit" stroke="#111111" strokeWidth={4} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="bg-[#111111] text-white border-4 border-[#111111] rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(108,59,255,0.3)]">
            <h3 className="text-xl font-black uppercase tracking-widest mb-4">Simulation Insight</h3>
            <p className="text-white/60 font-medium leading-relaxed">
              Based on your current parameters, your startup will reach profitability in 
              <span className="text-white font-black mx-1">
                {results.findIndex(r => r.profit > 0) + 1 || 'more than 6'} months
              </span>.
              Focus on increasing <span className="text-[#6C3BFF] font-black">Viral Coefficient</span> to reduce CAC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
