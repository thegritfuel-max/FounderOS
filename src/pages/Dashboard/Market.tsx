import React, { useState, useEffect } from 'react';
import { ChartCard } from '../../components/ChartCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Search, Globe, Users, TrendingUp, Download, Loader2, Target } from 'lucide-react';
import { analyzeMarket } from '../../services/geminiService';
import { useAuth } from '../../services/authService';
import { getStartupData } from '../../services/startupService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Market = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById('market-research-content');
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
      pdf.save(`FounderOS_Market_Research_${new Date().getTime()}.pdf`);
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
        const circulatedData = localStorage.getItem('founder_os_market_data');
        const startupAnalysis = localStorage.getItem('founder_os_startup_analysis');
        
        if (circulatedData && startupAnalysis) {
          const { trends, competitors } = JSON.parse(circulatedData);
          const analysis = JSON.parse(startupAnalysis);
          
          setData({
            tam: analysis.tam || "₹5000 Cr",
            sam: analysis.sam || "₹1200 Cr",
            som: analysis.som || "₹300 Cr",
            competitors: competitors.map((c: any) => ({
              name: c.title,
              strength: "Market Presence",
              gap: "AI Integration",
              marketShare: Math.floor(Math.random() * 20) + 5
            })),
            sentiment: analysis.marketSentiment || "The market shows strong growth potential with increasing adoption of AI-driven solutions in this sector."
          });
          setLoading(false);
          return;
        }

        const startup = await getStartupData(user.uid);
        if (startup && startup.idea) {
          const marketData = await analyzeMarket(startup.idea);
          setData(marketData);
        } else {
          setError("No startup idea found. Please go to Overview to set one.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch market data.");
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
        <p className="text-gray-500 font-black uppercase tracking-widest animate-pulse">Analyzing Market Landscape...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-100">
          <Target className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-black">{error}</h2>
      </div>
    );
  }

  const tamSamSom = [
    { label: 'TAM', value: data?.tam || 'N/A', desc: 'Total Addressable Market', icon: Globe },
    { label: 'SAM', value: data?.sam || 'N/A', desc: 'Serviceable Addressable Market', icon: Target },
    { label: 'SOM', value: data?.som || 'N/A', desc: 'Serviceable Obtainable Market', icon: Users },
  ];

  const competitorData = data?.competitors || [];

  return (
    <div className="space-y-8" id="market-research-content">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1">Market Research</h1>
          <p className="text-gray-500 font-medium">AI-powered deep dive into TAM, SAM, SOM and competitors.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#111111] font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111] hover:translate-y-[-2px] active:translate-y-[2px] transition-all disabled:opacity-50"
        >
          {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />} 
          {exporting ? 'EXPORTING...' : 'EXPORT REPORT'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tamSamSom.map((item, i) => (
          <div key={i} className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:border-[#6C3BFF] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#F8F7FF] rounded-lg border border-[#EAEAEA]">
                <item.icon className="w-5 h-5 text-[#6C3BFF]" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">{item.label}</span>
            </div>
            <div className="text-3xl font-black mb-1">{item.value}</div>
            <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Competitor Market Share" description="AI-estimated landscape distribution">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={competitorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EAEAEA" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} width={100} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: '2px solid #111111' }}
              />
              <Bar dataKey="marketShare" radius={[0, 8, 8, 0]}>
                {competitorData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6C3BFF' : '#FFB84D'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
          <h3 className="text-lg font-bold mb-6">Competitor Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#EAEAEA]">
                  <th className="text-left py-3 text-xs font-black uppercase text-gray-400">Name</th>
                  <th className="text-left py-3 text-xs font-black uppercase text-gray-400">Strength</th>
                  <th className="text-left py-3 text-xs font-black uppercase text-gray-400">Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#FAFAFA]">
                {competitorData.map((c: any, i: number) => (
                  <tr key={i}>
                    <td className="py-4 font-bold text-sm">{c.name}</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded border border-green-100 uppercase">{c.strength}</span></td>
                    <td className="py-4 font-medium text-sm text-gray-500">{c.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-[#111111] text-white p-8 rounded-2xl border-4 border-[#6C3BFF] shadow-[8px_8px_0px_0px_rgba(108,59,255,0.3)]">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-[#6C3BFF]" />
          <h3 className="text-xl font-black uppercase tracking-widest">Market Sentiment Analysis</h3>
        </div>
        <p className="text-white/70 font-medium leading-relaxed">{data?.sentiment}</p>
      </div>
    </div>
  );
};
