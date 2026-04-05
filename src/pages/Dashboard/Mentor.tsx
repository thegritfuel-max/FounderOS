import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, User, Bot, RefreshCw } from 'lucide-react';
import { getAIMentorResponse } from '../../services/geminiService';
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
      const response = await getAIMentorResponse(idea || "Startup Idea", input, messages);
      const assistantMsg: ChatMessage = { role: 'assistant', content: response || "I'm sorry, I couldn't process that.", timestamp: Date.now() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tighter mb-1 text-[#111111]">AI Mentor Chat</h1>
        <p className="text-gray-500 font-medium">Get expert advice on strategy, product, and fundraising.</p>
      </div>

      <div className="flex-1 bg-white border-4 border-[#111111] rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
        <iframe 
          src="https://embed.liveavatar.com/v1/68bb42d5-bc8a-40f8-96ba-d8e8c2bada80" 
          allow="microphone" 
          title="LiveAvatar Embed" 
          className="w-full h-full border-none"
          style={{ aspectRatio: '16/9' }}
        ></iframe>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
