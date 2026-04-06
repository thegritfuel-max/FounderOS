import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Key, 
  Users, 
  Shield, 
  Bell, 
  CreditCard, 
  Save,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../services/authService';

export const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('api');
  const [saved, setSaved] = useState(false);
  
  const [apiKeys, setApiKeys] = useState<any>({
    gemini: '',
    serpapi: '',
    openai: '',
    claude: '',
    nvidia: ''
  });

  const [profiles, setProfiles] = useState([
    { id: '1', name: 'Main Business', active: true },
    { id: '2', name: 'Side Project', active: false }
  ]);

  useEffect(() => {
    // Load saved keys from localStorage for demo
    const savedKeys = localStorage.getItem('founder_os_keys');
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys));
    }
  }, []);

  const handleSaveKeys = () => {
    localStorage.setItem('founder_os_keys', JSON.stringify(apiKeys));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddProfile = () => {
    const newProfile = {
      id: Date.now().toString(),
      name: 'New Business',
      active: false
    };
    setProfiles([...profiles, newProfile]);
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const handleSwitchProfile = (id: string) => {
    setProfiles(profiles.map(p => ({
      ...p,
      active: p.id === id
    })));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter mb-2">Settings</h1>
        <p className="text-gray-500 font-medium">Manage your account, API keys, and business profiles.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {[
            { id: 'api', label: 'API Configuration', icon: Key },
            { id: 'profiles', label: 'Business Profiles', icon: Users },
            { id: 'account', label: 'Account Settings', icon: Shield },
            { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all border-4 ${
                activeTab === tab.id 
                ? 'bg-[#6C3BFF] text-white border-[#111111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-white text-gray-500 border-transparent hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white border-4 border-[#111111] rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10">
          {activeTab === 'api' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-2">API Configuration</h2>
                <p className="text-gray-500 font-medium mb-8">Add your custom API keys to power the AI engine with your own limits.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Gemini AI API Key</label>
                    <input 
                      type="password" 
                      placeholder="Enter Gemini API Key"
                      className="w-full px-6 py-4 bg-[#FAFAFA] border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                      value={apiKeys.gemini}
                      onChange={e => setApiKeys({...apiKeys, gemini: e.target.value})}
                    />
                    <p className="mt-2 text-xs text-gray-400 font-bold">Used for market research, financial models, and mentor chat.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">SerpApi Key (Google Trends)</label>
                    <input 
                      type="password" 
                      placeholder="Enter SerpApi Key"
                      className="w-full px-6 py-4 bg-[#FAFAFA] border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                      value={apiKeys.serpapi}
                      onChange={e => setApiKeys({...apiKeys, serpapi: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">OpenAI API Key (Optional)</label>
                    <input 
                      type="password" 
                      placeholder="Enter OpenAI API Key"
                      className="w-full px-6 py-4 bg-[#FAFAFA] border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                      value={apiKeys.openai}
                      onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Claude API Key (Optional)</label>
                    <input 
                      type="password" 
                      placeholder="Enter Claude API Key"
                      className="w-full px-6 py-4 bg-[#FAFAFA] border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                      value={apiKeys.claude || ''}
                      onChange={e => setApiKeys({...apiKeys, claude: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">NVIDIA API Key (Gemma 4)</label>
                    <input 
                      type="password" 
                      placeholder="Enter NVIDIA API Key"
                      className="w-full px-6 py-4 bg-[#FAFAFA] border-4 border-[#111111] rounded-2xl font-bold outline-none focus:border-[#6C3BFF] transition-all"
                      value={apiKeys.nvidia || ''}
                      onChange={e => setApiKeys({...apiKeys, nvidia: e.target.value})}
                    />
                    <p className="mt-2 text-xs text-gray-400 font-bold">Used for advanced AI reasoning with Gemma 4 models.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSaveKeys}
                className="flex items-center gap-2 px-10 py-4 bg-[#6C3BFF] text-white font-black rounded-2xl border-4 border-[#111111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {saved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                {saved ? 'SAVED SUCCESSFULLY' : 'SAVE CONFIGURATION'}
              </button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-2">Billing & Plans</h2>
                <p className="text-gray-500 font-medium mb-8">Manage your subscription and billing history.</p>
                
                <div className="p-8 bg-[#F8F7FF] border-4 border-[#6C3BFF] rounded-3xl shadow-[8px_8px_0px_0px_rgba(108,59,255,0.2)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-xs font-black text-[#6C3BFF] uppercase tracking-widest mb-1">CURRENT PLAN</div>
                      <div className="text-3xl font-black">Free Tier</div>
                    </div>
                    <Link to="/pricing">
                      <button className="px-6 py-3 bg-[#6C3BFF] text-white font-black rounded-xl border-2 border-[#111111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
                        UPGRADE PLAN
                      </button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-bold text-gray-500">
                      <span>Usage (AI Analysis)</span>
                      <span>5 / 10 runs</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-[#111111]">
                      <div className="w-1/2 h-full bg-[#6C3BFF]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profiles' && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black mb-2">Business Profiles</h2>
                    <p className="text-gray-500 font-medium">Manage multiple startup ideas and business logs.</p>
                  </div>
                  <button 
                    onClick={handleAddProfile}
                    className="flex items-center gap-2 px-6 py-3 bg-[#6C3BFF] text-white font-black rounded-xl border-4 border-[#111111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    ADD PROFILE
                  </button>
                </div>

                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div 
                      key={profile.id}
                      className={`p-6 rounded-2xl border-4 flex items-center justify-between transition-all ${
                        profile.active 
                        ? 'border-[#6C3BFF] bg-[#F8F7FF]' 
                        : 'border-[#111111] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border-2 border-[#111111] ${
                          profile.active ? 'bg-[#6C3BFF] text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {profile.name[0]}
                        </div>
                        <div>
                          <div className="font-black text-lg">{profile.name}</div>
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {profile.active ? 'ACTIVE PROFILE' : 'INACTIVE'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {!profile.active && (
                          <button 
                            onClick={() => handleSwitchProfile(profile.id)}
                            className="px-4 py-2 bg-white border-2 border-[#111111] rounded-lg font-black text-xs hover:bg-gray-50 transition-all"
                          >
                            SWITCH
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-2">Account Settings</h2>
                <p className="text-gray-500 font-medium mb-8">Manage your personal information and security.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-6 bg-[#FAFAFA] border-4 border-[#111111] rounded-2xl">
                    <div className="w-20 h-20 bg-[#FFB84D] border-4 border-[#111111] rounded-2xl flex items-center justify-center text-3xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {user?.email?.[0].toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="text-xl font-black">{user?.email?.split('@')[0]}</div>
                      <div className="text-gray-500 font-bold">{user?.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
