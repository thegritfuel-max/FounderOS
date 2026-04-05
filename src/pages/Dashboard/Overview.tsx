import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertTriangle, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { DashboardCard } from '../../components/DashboardCard';
import { ChartCard } from '../../components/ChartCard';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 1200 },
  { month: 'Mar', revenue: 2800 },
  { month: 'Apr', revenue: 5600 },
  { month: 'May', revenue: 8900 },
  { month: 'Jun', revenue: 14500 },
];

const marketData = [
  { name: 'TAM', value: 5000, color: '#6C3BFF' },
  { name: 'SAM', value: 1200, color: '#FFB84D' },
  { name: 'SOM', value: 300, color: '#111111' },
];

export const Overview = () => {
  const [startupData, setStartupData] = React.useState<any>(null);

  React.useEffect(() => {
    const data = localStorage.getItem('founder_os_startup_analysis');
    if (data) {
      setStartupData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Real-time health score of your startup idea.</p>
        </div>
        <Link to="/dashboard/analysis">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#6C3BFF] text-white font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111] hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
            <Plus className="w-5 h-5" /> NEW ANALYSIS
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Startup Score" 
          value="85/100" 
          subtitle="High potential venture"
          icon={<TrendingUp className="w-5 h-5" />}
          progress={85}
        />
        <DashboardCard 
          title="Risk Score" 
          value="32/100" 
          subtitle="Low to medium risk"
          icon={<AlertTriangle className="w-5 h-5" />}
          progress={32}
        />
        <DashboardCard 
          title="Success Prob." 
          value="74%" 
          subtitle="Based on market trends"
          icon={<Target className="w-5 h-5" />}
          progress={74}
        />
        <DashboardCard 
          title="Market Opp." 
          value="9.2/10" 
          subtitle="Expanding market size"
          icon={<Users className="w-5 h-5" />}
          progress={92}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ChartCard 
          title="Revenue Projection" 
          description="Estimated monthly recurring revenue (MRR)"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C3BFF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6C3BFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} tickFormatter={(value) => `₹${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '2px solid #111111', boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 900 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6C3BFF" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Market Size (TAM/SAM/SOM)" 
          description="In Billions (₹)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={marketData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {marketData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '2px solid #111111' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {marketData.map((m, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">{m.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black tracking-tight">Execution Roadmap</h3>
          <button className="text-sm font-black text-[#6C3BFF] flex items-center gap-1 hover:underline">
            VIEW FULL ROADMAP <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {[
            { phase: 'Month 1', title: 'Market Research & MVP Spec', status: 'Completed', progress: 100 },
            { phase: 'Month 2', title: 'Core Product Development', status: 'In Progress', progress: 45 },
            { phase: 'Month 3', title: 'Beta Launch & Feedback', status: 'Pending', progress: 0 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-24 text-xs font-black uppercase tracking-widest text-gray-400">{item.phase}</div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm">{item.title}</span>
                  <span className="text-xs font-black text-[#6C3BFF]">{item.status}</span>
                </div>
                <div className="w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden border border-[#EAEAEA]">
                  <div className="h-full bg-[#6C3BFF]" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
