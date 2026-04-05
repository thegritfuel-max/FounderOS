import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className,
  description
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] relative overflow-hidden",
        className
      )}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      
      <div className="flex flex-col mb-6 relative z-10">
        <h3 className="text-lg font-bold text-[#111111]">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      <div className="h-[300px] w-full relative z-10">
        {children}
      </div>

      {/* Hand-drawn accent */}
      <div className="absolute bottom-2 right-4 opacity-20 pointer-events-none">
        <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
          <path d="M2 8C10 2 30 2 38 8" stroke="#6C3BFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
};
