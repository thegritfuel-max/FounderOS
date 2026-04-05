import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Info, 
  AlertCircle, 
  Loader2, 
  Mic, 
  FileText, 
  Globe, 
  DollarSign, 
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { analyzeStartup, fetchTrendsWithGemini, fetchCompetitorsWithGemini } from '../../services/geminiService';
import { ChartCard } from '../../components/ChartCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export const Analysis = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 'gemini', label: 'AI Analysis', icon: Sparkles },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'finance', label: 'Financial Benchmarks', icon: DollarSign },
    { id: 'competitors', label: 'Competitor Landscape', icon: Users },
  ];

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.start();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setQuery(`Analyzing report: ${file.name}\n\nContent: ${content.substring(0, 500)}...`);
      };
      reader.readAsText(file);
    }
  };

  const runFullAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setStep(1);
    
    try {
      // Step 1: Gemini Analysis
      const geminiData = await analyzeStartup(query);
      setStep(2);

      // Step 2: Google Trends via Gemini
      const trendsData = await fetchTrendsWithGemini(geminiData.domain || query);
      setStep(3);

      // Step 3: Yahoo Finance (Benchmark)
      const financeRes = await fetch(`/api/finance?symbol=${geminiData.suggestedSymbol || 'AAPL'}`);
      const financeData = await financeRes.json();
      setStep(4);

      // Step 4: Competitors via Gemini
      const compData = await fetchCompetitorsWithGemini(geminiData.domain || query);

      setAnalysisResult({
        gemini: geminiData,
        trends: trendsData,
        finance: financeData,
        competitors: compData
      });
      
      // Circulate data to other sections
      localStorage.setItem('founder_os_startup_analysis', JSON.stringify(geminiData));
      localStorage.setItem('founder_os_market_data', JSON.stringify({ trends: trendsData, competitors: compData }));
      localStorage.setItem('founder_os_finance_benchmark', JSON.stringify(financeData));

      setStep(5);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const timelineData = analysisResult?.trends?.interest_over_time?.timeline_data?.map((item: any) => ({
    date: item.date,
    value: parseInt(item.values[0].extracted_value) || 0
  })) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter mb-1">Advanced Idea Analysis</h1>
        <p className="text-gray-500 font-medium">Multi-step validation using AI, Trends, Finance, and Competitor data.</p>
      </div>

      {/* Input Section */}
      <div className="bg-white border-4 border-[#111111] rounded-[32px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={runFullAnalysis} className="space-y-6">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your startup idea, upload a report, or use voice input..."
              className="w-full pl-6 pr-32 py-6 bg-[#FAFAFA] border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all min-h-[120px] resize-none"
            />
            <div className="absolute right-4 bottom-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-3 rounded-xl border-2 border-[#111111] transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-white border-2 border-[#111111] rounded-xl text-gray-400 hover:bg-gray-50 transition-all"
              >
                <FileText className="w-5 h-5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full py-5 bg-[#6C3BFF] text-white text-xl font-black rounded-2xl border-4 border-[#111111] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                RUNNING STEP {step}: {steps[step-1]?.label.toUpperCase()}...
              </div>
            ) : "START MULTI-STEP ANALYSIS"}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-6 bg-red-50 border-4 border-red-200 rounded-2xl flex items-center gap-4 text-red-600 font-black">
          <AlertCircle className="w-6 h-6" />
          {error}
        </div>
      )}

      {analysisResult && (
        <div className="space-y-10">
          {/* AI Insights Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'DOMAIN', value: analysisResult.gemini.domain, icon: Globe, color: 'bg-blue-500' },
              { label: 'SECTOR', value: analysisResult.gemini.sector, icon: BarChart3, color: 'bg-purple-500' },
              { label: 'REVENUE MODEL', value: analysisResult.gemini.revenueModel, icon: DollarSign, color: 'bg-green-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-[#111111] p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white border-2 border-[#111111]`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                </div>
                <div className="text-xl font-black tracking-tight">{item.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trends Chart */}
            <ChartCard 
              title="Market Interest Trends" 
              className="lg:col-span-2"
              description="Real-time Google search volume for your niche over the last 12 months."
            >
              <div className="h-[350px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C3BFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6C3BFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }} minTickGap={30} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #111', boxShadow: '4px 4px 0px_0px rgba(0,0,0,1)', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="value" stroke="#6C3BFF" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            {/* Financial Benchmark */}
            <div className="bg-[#111111] text-white border-4 border-[#111111] rounded-[32px] p-8 shadow-[12px_12px_0px_0px_rgba(108,59,255,0.3)]">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-[#6C3BFF]" />
                Market Benchmark
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-2xl border-2 border-white/10">
                  <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">SUGGESTED SYMBOL</div>
                  <div className="text-3xl font-black text-[#6C3BFF]">{analysisResult.gemini.suggestedSymbol}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border-2 border-white/10">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">MARKET PRICE</div>
                    <div className="text-xl font-black">${analysisResult.finance.regularMarketPrice?.toFixed(2) || '---'}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border-2 border-white/10">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">CHANGE</div>
                    <div className={`text-xl font-black ${analysisResult.finance.regularMarketChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {analysisResult.finance.regularMarketChangePercent?.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/40 font-bold leading-relaxed">
                  This benchmark represents a leading public company in your sector, used to calibrate our financial projections.
                </p>
              </div>
            </div>
          </div>

          {/* Competitors & Roadmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-[#111111] rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Users className="w-6 h-6 text-[#FFB84D]" />
                Top Competitors
              </h3>
              <div className="space-y-4">
                {analysisResult.competitors.slice(0, 4).map((comp: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#FAFAFA] border-2 border-[#111111] rounded-xl hover:translate-x-2 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border-2 border-[#111111] rounded-lg flex items-center justify-center font-black text-[#6C3BFF]">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-black text-sm group-hover:text-[#6C3BFF] transition-colors">{comp.title}</div>
                        <div className="text-[10px] text-gray-400 font-bold truncate max-w-[200px]">{comp.link}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#111111] transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F7FF] border-4 border-[#111111] rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#6C3BFF]" />
                Execution Roadmap
              </h3>
              <div className="space-y-4">
                {analysisResult.gemini.tasks.map((task: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white border-2 border-[#111111] rounded-xl">
                    <div className="w-6 h-6 bg-[#6C3BFF] rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white font-black">
                      {i + 1}
                    </div>
                    <div className="text-sm font-bold leading-relaxed">{task}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);
