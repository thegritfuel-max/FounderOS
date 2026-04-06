import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, User, Bot, RefreshCw, Cpu } from 'lucide-react';
import { getAIMentorResponse } from '../../services/geminiService';
import { getNvidiaResponse } from '../../services/nvidiaService';
import { ChatMessage } from '../../types';
import { useAuth } from '../../services/authService';
import { getStartupData } from '../../services/startupService';

export const Mentor = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your FounderOS AI Mentor. I've analyzed your startup idea. How can I help you move forward today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<string>('');
  const [aiModel, setAiModel] = useState<'gemini' | 'nvidia'>('gemini');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchIdea = async () => {
      if (user) {
        const startup = await getStartupData(user.uid);
        if (startup) setIdea(startup.idea);
      }
    };
    fetchIdea();
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (aiModel === 'nvidia') {
        const nvidiaMessages = messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant' as 'user' | 'assistant' | 'system',
          content: m.content
        }));
        nvidiaMessages.push({ role: 'user', content: input });
        
        const response = await getNvidiaResponse(nvidiaMessages);
        const assistantMsg: ChatMessage = { 
          role: 'assistant', 
          content: response.choices[0].message.content || "I'm sorry, I couldn't process that.", 
          timestamp: Date.now() 
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        const response = await getAIMentorResponse(idea || "Startup Idea", input, messages);
        const assistantMsg: ChatMessage = { role: 'assistant', content: response || "I'm sorry, I couldn't process that.", timestamp: Date.now() };
        setMessages(prev => [...prev, assistantMsg]);
      }
    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = { 
        role: 'assistant', 
        content: `Error: ${error.message || "Something went wrong."}`, 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1 text-[#111111]">AI Mentor Chat</h1>
          <p className="text-gray-500 font-medium">Get expert advice on strategy, product, and fundraising.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-2xl border-4 border-[#111111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <button 
            onClick={() => setAiModel('gemini')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
              aiModel === 'gemini' ? 'bg-[#6C3BFF] text-white' : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            GEMINI 3.0
          </button>
          <button 
            onClick={() => setAiModel('nvidia')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
              aiModel === 'nvidia' ? 'bg-[#111111] text-white' : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            GEMMA 4 (NVIDIA)
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border-4 border-[#111111] rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-[#111111] ${
                    msg.role === 'user' ? 'bg-[#FFB84D]' : 'bg-[#6C3BFF]'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>
                  <div className={`p-5 rounded-2xl border-4 border-[#111111] font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    msg.role === 'user' ? 'bg-[#F8F7FF]' : 'bg-white'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-[#6C3BFF] flex items-center justify-center border-2 border-[#111111]">
                  <RefreshCw className="w-5 h-5 text-white animate-spin" />
                </div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">
                  {aiModel === 'nvidia' ? 'Gemma 4 is thinking...' : 'Gemini is thinking...'}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t-4 border-[#111111]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask your mentor anything..."
              className="w-full px-6 py-5 bg-white border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all pr-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#6C3BFF] text-white rounded-xl flex items-center justify-center border-2 border-[#111111] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
