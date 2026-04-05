import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white border-4 border-[#111111] rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            {/* Sketch lines */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#6C3BFF]" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {step === 'form' ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F0EBFF] rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#6C3BFF]">
                    <Lock className="w-8 h-8 text-[#6C3BFF]" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">Upgrade to Pro</h2>
                  <p className="text-gray-500 font-medium mt-2">Unlock the full power of FounderOS AI</p>
                </div>

                <div className="bg-[#FAFAFA] border-2 border-[#EAEAEA] rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b-2 border-[#EAEAEA]">
                    <span className="font-bold">Pro Plan</span>
                    <span className="text-xl font-black">₹499<span className="text-sm text-gray-400">/mo</span></span>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-xs font-black uppercase text-gray-400">Card Number</span>
                      <div className="mt-1 relative">
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 bg-white border-2 border-[#EAEAEA] rounded-xl font-mono text-sm focus:border-[#6C3BFF] outline-none transition-all"
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      </div>
                    </label>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <label>
                        <span className="text-xs font-black uppercase text-gray-400">Expiry</span>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          className="w-full mt-1 px-4 py-3 bg-white border-2 border-[#EAEAEA] rounded-xl font-mono text-sm focus:border-[#6C3BFF] outline-none transition-all"
                        />
                      </label>
                      <label>
                        <span className="text-xs font-black uppercase text-gray-400">CVV</span>
                        <input 
                          type="text" 
                          placeholder="123"
                          className="w-full mt-1 px-4 py-3 bg-white border-2 border-[#EAEAEA] rounded-xl font-mono text-sm focus:border-[#6C3BFF] outline-none transition-all"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  disabled={loading}
                  className={cn(
                    "w-full py-4 bg-[#111111] text-white font-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(108,59,255,0.5)] hover:translate-y-[-2px] active:translate-y-[2px] transition-all disabled:opacity-50",
                    loading && "cursor-wait"
                  )}
                >
                  {loading ? "PROCESSING..." : "PAY ₹499 NOW"}
                </button>
                
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                  Secure payment via Stripe Simulation
                </p>
              </div>
            ) : (
              <div className="text-center py-12 space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto border-4 border-green-500"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Payment Successful!</h2>
                  <p className="text-gray-500 font-medium mt-2">Welcome to FounderOS Pro</p>
                </div>
                <div className="text-sm font-bold text-[#6C3BFF] animate-pulse">
                  UNLOCKING FEATURES...
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
