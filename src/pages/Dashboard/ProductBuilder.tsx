import React from 'react';
import { 
  Wrench, 
  Code2, 
  Layout, 
  ExternalLink, 
  Zap, 
  Cpu, 
  Smartphone, 
  Globe 
} from 'lucide-react';
import { motion } from 'motion/react';

const tools = [
  {
    category: "Vibe Coding & AI IDEs",
    items: [
      { name: "Cursor", desc: "The AI-first code editor. Best for 'vibe coding' with Claude 3.5 Sonnet.", url: "https://cursor.sh", icon: Code2 },
      { name: "Replit Agent", desc: "Build full-stack apps from natural language prompts.", url: "https://replit.com", icon: Zap },
      { name: "Lovable", desc: "GPT-4 powered full-stack app builder.", url: "https://lovable.dev", icon: Layout },
    ]
  },
  {
    category: "No-Code & Low-Code",
    items: [
      { name: "Bubble", desc: "The most powerful no-code platform for complex web apps.", url: "https://bubble.io", icon: Globe },
      { name: "FlutterFlow", desc: "Build high-performance native mobile apps visually.", url: "https://flutterflow.io", icon: Smartphone },
      { name: "Webflow", desc: "Professional website builder with advanced CMS.", url: "https://webflow.com", icon: Layout },
    ]
  },
  {
    category: "Backend & Infrastructure",
    items: [
      { name: "Supabase", desc: "The open-source Firebase alternative. Database, Auth, Storage.", url: "https://supabase.com", icon: Cpu },
      { name: "Firebase", desc: "Google's mobile and web app development platform.", url: "https://firebase.google.com", icon: Zap },
      { name: "Vercel", desc: "The platform for frontend developers. Best for Next.js.", url: "https://vercel.com", icon: Globe },
    ]
  }
];

export const ProductBuilder = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Product Builder</h1>
          <p className="text-xl text-gray-500 font-bold">The ultimate stack for modern founders. Build at the speed of thought.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-[#6C3BFF] text-white rounded-2xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111]">
          <Wrench className="w-5 h-5" /> VIBE CODING ENABLED
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {tools.map((group, idx) => (
          <div key={idx} className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-4">
              {group.category}
              <div className="h-1 flex-1 bg-[#EAEAEA] rounded-full" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {group.items.map((tool, i) => (
                <motion.a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="bg-white border-4 border-[#111111] p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group flex flex-col h-full"
                >
                  <div className="w-14 h-14 bg-[#F8F7FF] border-2 border-[#111111] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#6C3BFF] group-hover:text-white transition-all">
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 flex items-center justify-between">
                    {tool.name}
                    <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#6C3BFF] transition-colors" />
                  </h3>
                  <p className="text-gray-500 font-bold text-sm leading-relaxed flex-1">
                    {tool.desc}
                  </p>
                  <div className="mt-8 pt-6 border-t-2 border-[#FAFAFA] flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#6C3BFF] uppercase tracking-widest">Official Tool</span>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Visit Site</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#111111] text-white p-12 rounded-[3rem] border-8 border-[#6C3BFF] shadow-[20px_20px_0px_0px_rgba(108,59,255,0.2)] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-4xl font-black mb-6 leading-tight">What is "Vibe Coding"?</h3>
          <p className="text-xl text-white/70 font-bold mb-8 leading-relaxed">
            It's the new era of software development where you describe the "vibe" and functionality of your app to an AI, and it handles the implementation. No more syntax errors—just pure creation.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">Natural Language</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">AI-First</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">10x Speed</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C3BFF] opacity-20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
};
