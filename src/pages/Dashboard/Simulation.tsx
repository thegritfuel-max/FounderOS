import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Play, RefreshCw, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { ChartCard } from '../../components/ChartCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const Simulation = () => {
  const [price, setPrice] = useState(49);
  const [marketing, setMarketing] = useState(5000);
  const [growth, setGrowth] = useState(15);
  const [simulating, setSimulating] = useState(false);
  
  const [results, setResults] = useState({
    revenue: 125000,
    risk: 32,
    profit: 45000,
    data: [
      { month: 'M1', rev: 10000 },
      { month: 'M2', rev: 15000 },
      { month: 'M3', rev: 22000 },
      { month: 'M4', rev: 35000 },
      { month: 'M5', rev: 55000 },
      { month: 'M6', rev: 85000 },
    ]
  });

  const runSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      const multiplier = (price / 49) * (marketing / 5000) * (growth / 15);
      setResults({
        revenue: Math.round(125000 * multiplier),
        risk: Math.round(32 * (1 + (growth - 15) / 100)),
        profit: Math.round(45000 * multiplier * 0.8),
        data: results.data.map(d => ({ ...d, rev: Math.round(d.rev * multiplier) }))
      });
      setSimulating(false);
    }, 1000);
  };

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
            <h3 className="text-xl font-black">Variables</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between font-black text-sm">
                <span>PRICE POINT</span>
                <span className="text-[#6C3BFF]">₹{price}</span>
              </div>
              <input 
                type="range" min="9" max="499" value={price} 
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="w-full h-2 bg-[#F0F0F0] rounded-lg appearance-none cursor-pointer accent-[#6C3BFF]" 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-black text-sm">
                <span>MARKETING BUDGET</span>
                <span className="text-[#6C3BFF]">₹{marketing}</span>
              </div>
              <input 
                type="range" min="1000" max="50000" step="1000" value={marketing} 
                onChange={(e) => setMarketing(parseInt(e.target.value))}
                className="w-full h-2 bg-[#F0F0F0] rounded-lg appearance-none cursor-pointer accent-[#6C3BFF]" 
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-black text-sm">
                <span>USER GROWTH %</span>
                <span className="text-[#6C3BFF]">{growth}%</span>
              </div>
              <input 
                type="range" min="1" max="100" value={growth} 
                onChange={(e) => setGrowth(parseInt(e.target.value))}
                className="w-full h-2 bg-[#F0F0F0] rounded-lg appearance-none cursor-pointer accent-[#6C3BFF]" 
              />
            </div>
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
            <div className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <TrendingUp className="w-3 h-3" /> REVENUE IMPACT
              </div>
              <div className="text-2xl font-black text-green-500">₹{results.revenue.toLocaleString()}</div>
            </div>
            <div className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <AlertTriangle className="w-3 h-3" /> RISK CHANGE
              </div>
              <div className="text-2xl font-black text-red-500">{results.risk}%</div>
            </div>
            <div className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <DollarSign className="w-3 h-3" /> PROFIT IMPACT
              </div>
              <div className="text-2xl font-black text-[#6C3BFF]">₹{results.profit.toLocaleString()}</div>
            </div>
          </div>

          <ChartCard title="Simulation Projection" description="Projected growth based on selected variables">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '2px solid #111111' }}
                />
                <Line type="monotone" dataKey="rev" stroke="#6C3BFF" strokeWidth={4} dot={{r: 6, fill: '#6C3BFF', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};
