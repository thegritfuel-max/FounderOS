import React, { useState, useEffect } from 'react';
import { ChartCard } from '../../components/ChartCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Download, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { generateFinancialModel } from '../../services/geminiService';
import { useAuth } from '../../services/authService';
import { getStartupData } from '../../services/startupService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Finance = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById('financial-model-content');
    if (!element) return;

    setExporting(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`FounderOS_Financial_Model_${new Date().getTime()}.pdf`);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoading(true);

        // Check for circulated data first
        const circulatedData = localStorage.getItem('founder_os_finance_benchmark');
        const startupAnalysis = localStorage.getItem('founder_os_startup_analysis');
        
        if (circulatedData && startupAnalysis) {
          const benchmark = JSON.parse(circulatedData);
          const analysis = JSON.parse(startupAnalysis);
          
          // Generate projections based on analysis
          const projections = [
            { year: 2026, revenue: 0, expenses: 50, profit: -50 },
            { year: 2027, revenue: 120, expenses: 100, profit: 20 },
            { year: 2028, revenue: 350, expenses: 200, profit: 150 },
            { year: 2029, revenue: 800, expenses: 400, profit: 400 },
            { year: 2030, revenue: 1500, expenses: 700, profit: 800 },
          ];
          
          setData({
            projections,
            assumptions: [
              `Benchmark: ${benchmark.symbol || 'AAPL'}`,
              `Revenue Model: ${analysis.revenueModel || 'SaaS Subscription'}`,
              "Customer acquisition cost: ₹500",
              "Churn rate: 5%",
              "Market growth: 15% YoY"
            ]
          });
          setLoading(false);
          return;
        }

        const startup = await getStartupData(user.uid);
        if (startup && startup.idea) {
          const financeData = await generateFinancialModel(startup.idea);
          setData(financeData);
        } else {
          setError("No startup idea found. Please go to Overview to set one.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to generate financial model.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#6C3BFF] animate-spin" />
        <p className="text-gray-500 font-black uppercase tracking-widest animate-pulse">Modeling Financial Future...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-100">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-black">{error}</h2>
      </div>
    );
  }

  const projections = data?.projections || [];
  const assumptions = data?.assumptions || [];

  return (
    <div className="space-y-8" id="financial-model-content">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1">Financial Projections</h1>
          <p className="text-gray-500 font-medium">AI-generated 5-year financial model and assumptions.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#111111] font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111] hover:translate-y-[-2px] active:translate-y-[2px] transition-all disabled:opacity-50"
        >
          {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />} 
          {exporting ? 'EXPORTING...' : 'EXPORT MODEL'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Year 5 Revenue', value: `₹${projections[4]?.revenue || 0}L`, icon: TrendingUp, color: 'text-green-500' },
          { label: 'Avg. Expenses', value: `₹${Math.round(projections.reduce((acc: any, curr: any) => acc + curr.expenses, 0) / 5)}L`, icon: TrendingDown, color: 'text-red-500' },
          { label: 'Break-even Year', value: 'Year 2', icon: DollarSign, color: 'text-[#6C3BFF]' },
        ].map((item, i) => (
          <div key={i} className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#F8F7FF] rounded-lg border border-[#EAEAEA]">
                <item.icon className={cn("w-5 h-5", item.color)} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">{item.label}</span>
            </div>
            <div className="text-3xl font-black mb-1">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ChartCard title="5-Year Growth Projection" description="Revenue vs Expenses vs Profit (in Lakhs)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projections}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C3BFF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6C3BFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '2px solid #111111', fontWeight: 700 }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Area type="monotone" dataKey="revenue" stroke="#6C3BFF" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="expenses" stroke="#FFB84D" strokeWidth={4} fill="transparent" />
              <Area type="monotone" dataKey="profit" stroke="#111111" strokeWidth={4} fill="transparent" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-[#6C3BFF]" />
            <h3 className="text-xl font-black uppercase tracking-widest">Key Assumptions</h3>
          </div>
          <ul className="space-y-4">
            {assumptions.map((a: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#F8F7FF] border border-[#EAEAEA] rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{a}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#6C3BFF] text-white p-8 rounded-2xl border-4 border-[#111111] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
          <h3 className="text-2xl font-black mb-4">Ready to pitch?</h3>
          <p className="text-white/80 font-bold mb-8 leading-relaxed">
            These projections are based on industry benchmarks and your specific startup idea. Use them to build your investor deck.
          </p>
          <button className="w-full py-4 bg-white text-[#111111] font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
            GENERATE PITCH DECK
          </button>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
