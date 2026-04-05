import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  BarChart3, 
  Search, 
  Milestone, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  FlaskConical,
  ArrowRight,
  PlayCircle,
  Check,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { HorizonHeroSection } from '../components/ui/horizon-hero-section';
import { FlickeringFooter } from '../components/ui/flickering-footer';
import { UpgradeModal } from '../components/UpgradeModal';
import { InfiniteTextMarquee } from '../components/ui/infinite-text-marquee';

const features = [
  { icon: Rocket, title: 'AI Startup Analysis', desc: 'Deep dive into your idea with AI-powered feasibility and risk assessment.' },
  { icon: Search, title: 'Market Research Engine', desc: 'Automated TAM/SAM/SOM analysis and competitor landscape mapping.' },
  { icon: BarChart3, title: 'Financial Projection AI', desc: 'Generate 5-year financial models and break-even analysis in seconds.' },
  { icon: Milestone, title: 'Execution Roadmap', desc: 'Step-by-step implementation plan from MVP to scaling.' },
  { icon: ShieldCheck, title: 'Investor Readiness', desc: 'Score your startup against VC benchmarks and get improvement tips.' },
  { icon: MessageSquare, title: 'AI Mentor Chat', desc: '24/7 access to an AI advisor trained on thousands of successful startups.' },
  { icon: FlaskConical, title: 'Startup Simulator', desc: 'Test different business scenarios and see their impact on your bottom line.' },
  { icon: Zap, title: 'Brand Generator', desc: 'Instantly create names, taglines, and brand identities for your new venture.' },
];

const steps = [
  { number: '01', title: 'Describe Idea', desc: 'Enter your startup concept in natural language.' },
  { number: '02', title: 'AI Analysis', desc: 'Our engine processes market data and trends.' },
  { number: '03', title: 'Dashboard Creation', desc: 'Get a full operating system for your startup.' },
  { number: '04', title: 'Download Reports', desc: 'Export pitch decks and business plans as PDFs.' },
  { number: '05', title: 'Execute Roadmap', desc: 'Follow the AI-generated plan to build and scale.' },
];

export const LandingPage = () => {
  const [idea, setIdea] = useState('');
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  return (
    <div className="bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#6C3BFF] selection:text-white pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b-8 border-[#111111]">
        <div className="absolute inset-0 z-0">
          <HorizonHeroSection />
        </div>
        
        <div className="relative z-30 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1] drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
          >
            Turn Startup Ideas Into <br />
            <span className="text-[#6C3BFF] bg-white px-6 py-2 rounded-[2rem] rotate-[-2deg] inline-block mt-4 shadow-[12px_12px_0px_0px_rgba(108,59,255,0.4)] border-4 border-[#111111]">
              Execution Ready
            </span> Companies
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 font-bold mb-14 max-w-3xl mx-auto leading-relaxed"
          >
            Generate business plans, market research, financial projections, and investor reports in minutes using advanced AI.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-3xl mx-auto"
          >
            <div className="relative w-full group">
              <input 
                type="text" 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Enter your startup idea..."
                className="w-full px-8 py-6 bg-white border-4 border-[#111111] rounded-[2rem] text-xl font-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300"
              />
              <Search className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-300 group-focus-within:text-[#6C3BFF] transition-colors" />
            </div>
            <Link to="/signup" className="w-full md:w-auto">
              <button className="w-full md:w-auto whitespace-nowrap px-12 py-6 bg-[#6C3BFF] text-white text-xl font-black rounded-[2rem] border-4 border-[#111111] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-tighter">
                GENERATE PLAN
              </button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-10 text-white/60 text-xs font-black uppercase tracking-[0.2em]"
          >
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><PlayCircle className="w-6 h-6" /> WATCH DEMO</div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Check className="w-6 h-6 text-green-400" /> NO CREDIT CARD REQUIRED</div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><ShieldCheck className="w-6 h-6 text-blue-400" /> SECURE AI ENGINE</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Pop up on scroll */}
      <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-block px-6 py-2 bg-[#F8F7FF] border-2 border-[#6C3BFF] rounded-full text-[#6C3BFF] text-sm font-black mb-6 uppercase tracking-widest">FEATURES</div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">Everything you need to <br /> launch your startup</h2>
          <p className="text-2xl text-gray-500 font-bold max-w-3xl mx-auto">Professional tools for professional founders. Built for speed and execution.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, rotate: i % 2 === 0 ? 2 : -2 }}
              className="bg-white border-4 border-[#111111] p-10 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-[#F8F7FF] border-2 border-[#111111] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#6C3BFF] group-hover:text-white group-hover:rotate-12 transition-all duration-300">
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h3>
              <p className="text-gray-500 font-bold text-base leading-relaxed mb-8">{f.desc}</p>
              <button className="text-sm font-black text-[#6C3BFF] flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
                LEARN MORE <ArrowRight className="w-5 h-5" />
              </button>
              
              {/* Decorative background element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#6C3BFF]/5 rounded-full blur-2xl group-hover:bg-[#6C3BFF]/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works - Visible Headings */}
      <section className="py-40 bg-[#111111] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">From Idea to <br /> Dashboard in <br /> <span className="text-[#6C3BFF] underline decoration-8 underline-offset-8">60 Seconds</span></h2>
            <p className="text-2xl text-white/60 font-bold max-w-md leading-relaxed">Our AI engine automates the months of planning work required to start a company.</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-white/5 hidden lg:block rounded-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-16 relative z-10">
              {steps.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="space-y-8 group"
                >
                  <div className="w-20 h-20 bg-[#6C3BFF] border-4 border-white rounded-[1.5rem] flex items-center justify-center text-3xl font-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {s.number}
                  </div>
                  <h3 className="text-3xl font-black tracking-tight group-hover:text-[#6C3BFF] transition-colors">{s.title}</h3>
                  <p className="text-white/50 font-bold text-lg leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background sketch elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#6C3BFF]/5 to-transparent pointer-events-none" />
      </section>

      {/* Pricing - All visible, interactive */}
      <section id="pricing" className="py-40 px-6 max-w-7xl mx-auto relative z-20 bg-[#FAFAFA]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-block px-6 py-2 bg-[#FFF9F0] border-2 border-[#FFB84D] rounded-full text-[#FFB84D] text-sm font-black mb-6 uppercase tracking-widest">PRICING</div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Simple, transparent pricing</h2>
          <p className="text-2xl text-gray-500 font-bold">Choose the plan that fits your startup stage.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          {/* Free */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white border-4 border-[#111111] p-12 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-black mb-4 uppercase tracking-widest text-gray-400">FREE</h3>
              <div className="text-6xl font-black tracking-tighter">₹0<span className="text-xl text-gray-300 font-bold">/mo</span></div>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-green-500" /> Idea analysis</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-green-500" /> Basic dashboard</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-green-500" /> 1 report export</li>
            </ul>
            <Link to="/signup" className="w-full">
              <button className="w-full py-5 border-4 border-[#111111] rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none">START FREE</button>
            </Link>
          </motion.div>

          {/* Starter */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -15 }}
            className="bg-white border-4 border-[#6C3BFF] p-12 rounded-[3rem] shadow-[16px_16px_0px_0px_rgba(108,59,255,1)] flex flex-col relative z-10"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#6C3BFF] text-white px-8 py-2 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-lg border-2 border-[#111111]">MOST POPULAR</div>
            <div className="mb-10">
              <h3 className="text-2xl font-black mb-4 uppercase tracking-widest text-[#6C3BFF]">STARTER</h3>
              <div className="text-6xl font-black tracking-tighter">₹199<span className="text-xl text-gray-300 font-bold">/mo</span></div>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-[#6C3BFF]" /> Full dashboard</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-[#6C3BFF]" /> Unlimited PDF exports</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-[#6C3BFF]" /> Market analysis</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-[#6C3BFF]" /> Execution roadmap</li>
            </ul>
            <button 
              onClick={() => setIsUpgradeOpen(true)}
              className="w-full py-5 bg-[#6C3BFF] text-white rounded-2xl font-black text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-[#111111] hover:translate-y-[-4px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest"
            >
              UPGRADE NOW
            </button>
          </motion.div>

          {/* Pro */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-white border-4 border-[#111111] p-12 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-black mb-4 uppercase tracking-widest text-gray-400">PRO</h3>
              <div className="text-6xl font-black tracking-tighter">₹499<span className="text-xl text-gray-300 font-bold">/mo</span></div>
            </div>
            <ul className="space-y-6 mb-12 flex-1">
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-green-500" /> Investor kit & Pitch deck</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-green-500" /> Full financial model</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-green-500" /> Simulation engine</li>
              <li className="flex items-center gap-4 font-bold text-lg"><Check className="w-6 h-6 text-green-500" /> 24/7 AI mentor</li>
            </ul>
            <button 
              onClick={() => setIsUpgradeOpen(true)}
              className="w-full py-5 border-4 border-[#111111] rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none uppercase tracking-widest"
            >
              GET PRO
            </button>
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-20 bg-white border-y-8 border-[#111111] overflow-hidden">
        <InfiniteTextMarquee 
          text="BUILD YOUR EMPIRE" 
          speed={25} 
          fontSize="8rem" 
          tooltipText="LFG! 🚀"
        />
      </section>

      {/* Vertical Social Links Section */}
      <section className="py-40 bg-white border-b-8 border-[#111111] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-6 py-2 bg-[#F0FFF4] border-2 border-[#22C55E] rounded-full text-[#22C55E] text-sm font-black mb-6 uppercase tracking-widest">COMMUNITY</div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              Join the <br /> <span className="text-[#6C3BFF]">Movement</span>
            </h2>
            <p className="text-xl text-gray-500 font-bold max-w-lg">
              Follow us on social media to get the latest updates, tips, and insights from the FounderOS community.
            </p>
          </div>
          
          <div className="flex-1 flex justify-center items-center">
            <div className="flex gap-8 md:gap-16">
              {[
                { name: 'Twitter', url: 'https://x.com/thisis_vaib' },
                { name: 'Linkedin', url: 'https://linkedin.com/in/vaib215' },
                { name: 'Github', url: 'https://github.com/vaib215' },
                { name: 'Instagram', url: 'https://instagram.com/thisis_vaib' }
              ].map((platform, idx) => (
                <a 
                  key={platform.name} 
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex flex-col leading-none">
                    {platform.name.split('').map((char, i) => (
                      <motion.span 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: (idx * 0.1) + (i * 0.05) }}
                        className="group-hover:text-[#6C3BFF] transition-colors cursor-pointer"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Horizontal News Ticker */}
      <section className="py-20 bg-[#111111] border-y-8 border-[#6C3BFF] overflow-hidden relative">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-32 bg-gradient-to-r from-transparent via-[#6C3BFF]/20 to-transparent blur-3xl" />
        </div>
        <div className="flex whitespace-nowrap animate-marquee relative z-10">
          {[...Array(2)].map((_, outerIndex) => (
            <div key={outerIndex} className="flex gap-20 items-center px-10">
              {[
                { name: "Alex Rivera", role: "SaaS Founder", text: "Saved 3 months of planning. The financial model alone is worth the price." },
                { name: "Sarah Chen", role: "Serial Entrepreneur", text: "Best founder tool I've used in a decade. It's like having a McKinsey team in my pocket." },
                { name: "Marcus Thorne", role: "Product Lead", text: "Incredible AI system. The market research is shockingly accurate and deep." },
                { name: "Jessica Wu", role: "VC Partner", text: "We recommend FounderOS to all our portfolio companies for better execution." },
                { name: "David Kim", role: "Indie Hacker", text: "The roadmap feature keeps me focused. No more guessing what to do next." }
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-8 bg-[#1A1A1A] border-2 border-white/10 p-8 rounded-[2rem] backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <div className="w-16 h-16 bg-[#6C3BFF] border-2 border-white rounded-full flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(108,59,255,0.5)]">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-black text-xl mb-2 whitespace-normal max-w-md">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">{t.name}</span>
                      <span className="w-2 h-2 bg-[#6C3BFF] rounded-full" />
                      <span className="text-[#6C3BFF] font-black text-xs uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-[#6C3BFF] border-8 border-[#111111] p-24 rounded-[4rem] shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-12 leading-[0.9]">Start building your <br /> startup today.</h2>
            <Link to="/signup">
              <button className="px-16 py-8 bg-white text-[#111111] text-2xl font-black rounded-[2rem] border-4 border-[#111111] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-tighter">
                CREATE FREE ACCOUNT
              </button>
            </Link>
          </div>
          {/* Decorative sketch elements */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
            <Rocket className="w-full h-full rotate-12" />
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-10 pointer-events-none">
            <Zap className="w-full h-full -rotate-12" />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] pt-20 pb-10 md:pt-40 md:pb-20 px-6 border-t-8 border-[#6C3BFF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-20 md:mb-40">
            <div className="space-y-6 md:space-y-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6C3BFF] rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] border-2 border-white/20">
                  F
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">FounderOS</span>
              </Link>
              <p className="text-white/50 font-bold text-base md:text-lg leading-relaxed max-w-sm">
                The AI-powered operating system for modern founders. Build, scale, and exit faster with production-grade tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border-2 border-white/10 rounded-xl flex items-center justify-center hover:bg-[#6C3BFF] hover:border-[#6C3BFF] transition-all cursor-pointer group">
                  <Twitter className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border-2 border-white/10 rounded-xl flex items-center justify-center hover:bg-[#6C3BFF] hover:border-[#6C3BFF] transition-all cursor-pointer group">
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border-2 border-white/10 rounded-xl flex items-center justify-center hover:bg-[#6C3BFF] hover:border-[#6C3BFF] transition-all cursor-pointer group">
                  <Github className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border-2 border-white/10 rounded-xl flex items-center justify-center hover:bg-[#6C3BFF] hover:border-[#6C3BFF] transition-all cursor-pointer group">
                  <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h4 className="text-white font-black text-lg md:text-xl uppercase tracking-widest">Product</h4>
              <ul className="space-y-3 md:space-y-4">
                {['Features', 'Pricing', 'Roadmap', 'Market Research', 'Financial AI'].map(item => (
                  <li key={item}><Link to="#" className="text-white/50 font-bold hover:text-[#6C3BFF] transition-colors text-sm md:text-base">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h4 className="text-white font-black text-lg md:text-xl uppercase tracking-widest">Company</h4>
              <ul className="space-y-3 md:space-y-4">
                {['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'].map(item => (
                  <li key={item}><Link to="#" className="text-white/50 font-bold hover:text-[#6C3BFF] transition-colors text-sm md:text-base">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h4 className="text-white font-black text-lg md:text-xl uppercase tracking-widest">Newsletter</h4>
              <p className="text-white/50 font-bold text-sm md:text-base">Get the latest AI startup tips and execution strategies.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full px-5 py-3 md:px-6 md:py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white font-bold outline-none focus:border-[#6C3BFF] transition-all text-sm md:text-base"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-[#6C3BFF] text-white rounded-lg">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 md:pt-10 border-t-2 border-white/5 gap-6">
            <p className="text-white/30 font-bold text-xs md:text-sm text-center md:text-left">© 2026 FounderOS AI. All rights reserved.</p>
            <div className="flex gap-6 md:gap-10">
              <Link to="#" className="text-white/30 font-bold text-xs md:text-sm hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-white/30 font-bold text-xs md:text-sm hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={() => setIsUpgradeOpen(false)} 
        onSuccess={() => {}} 
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
