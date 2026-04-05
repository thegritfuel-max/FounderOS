import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  progress?: number;
  className?: string;
  onClick?: () => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  progress,
  className,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, rotate: -0.5 }}
      onClick={onClick}
      className={cn(
        "relative bg-white border-2 border-[#EAEAEA] rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] cursor-pointer overflow-hidden group",
        className
      )}
    >
      {/* Sketch lines decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 L100,100 M20,0 L100,80 M0,20 L80,100" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[#F8F7FF] rounded-lg border border-[#EAEAEA] group-hover:bg-[#6C3BFF] group-hover:text-white transition-colors">
          {icon}
        </div>
        {progress !== undefined && (
          <div className="text-xs font-bold text-[#6C3BFF] bg-[#F0EBFF] px-2 py-1 rounded-full border border-[#DED4FF]">
            {progress}%
          </div>
        )}
      </div>

      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-3xl font-black text-[#111111] mb-2">{value}</div>
      {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}

      {progress !== undefined && (
        <div className="mt-4 w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden border border-[#EAEAEA]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#6C3BFF]"
          />
        </div>
      )}
    </motion.div>
  );
};
