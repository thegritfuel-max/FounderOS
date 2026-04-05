import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { UpgradeModal } from '../../components/UpgradeModal';
import { generateReportData } from '../../services/geminiService';
import { useAuth } from '../../services/authService';
import { getStartupData } from '../../services/startupService';

const reportTemplates = [
  { id: 'bp', title: 'Business Plan', type: 'PDF', size: '2.4 MB', locked: false },
  { id: 'mr', title: 'Market Research', type: 'PDF', size: '1.8 MB', locked: false },
  { id: 'fm', title: 'Financial Model', type: 'PDF', size: '3.1 MB', locked: true },
  { id: 'er', title: 'Execution Roadmap', type: 'PDF', size: '1.2 MB', locked: true },
  { id: 'pd', title: 'Pitch Deck', type: 'PDF', size: '5.6 MB', locked: true },
];

export const Reports = () => {
  const { user } = useAuth();
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [startup, setStartup] = useState<any>(null);

  useEffect(() => {
    const fetchStartup = async () => {
      if (user) {
        const data = await getStartupData(user.uid);
        setStartup(data);
      }
    };
    fetchStartup();
  }, [user]);

  const handleDownload = async (report: any) => {
    if (report.locked && !isPro) {
      setIsUpgradeOpen(true);
      return;
    }

    try {
      setGenerating(report.id);
      const reportData = await generateReportData(startup?.idea || "Startup Idea", report.title);
      
      const doc = new jsPDF();
      const margin = 20;
      let y = 30;

      // Header
      doc.setFillColor(108, 59, 255);
      doc.rect(0, 0, 210, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('FOUNDEROS AI - STARTUP OPERATING SYSTEM', margin, 13);
      doc.text('WWW.FOUNDEROS.AI', 160, 13);

      // Title
      doc.setTextColor(17, 17, 17);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(reportData.title.toUpperCase(), margin, y + 10);
      y += 25;

      // Business Info
      doc.setFontSize(14);
      doc.text(`Business: ${reportData.businessName}`, margin, y);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`Report ID: ${report.id.toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, margin, y + 8);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y + 14);
      y += 30;

      // Sections
      reportData.sections.forEach((section: any) => {
        if (y > 250) {
          doc.addPage();
          y = 30;
        }
        doc.setTextColor(108, 59, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(section.heading.toUpperCase(), margin, y);
        y += 10;

        doc.setTextColor(60, 60, 60);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(section.content, 170);
        doc.text(lines, margin, y);
        y += (lines.length * 6) + 15;
      });

      // Footer on each page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 180);
        doc.text(`© 2026 FounderOS AI - All Rights Reserved | Page ${i} of ${pageCount}`, margin, 285);
      }

      doc.save(`${reportData.businessName.toLowerCase().replace(/\s+/g, '-')}-${report.id}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate report. Please try again.");
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1">Downloadable Reports</h1>
          <p className="text-gray-500 font-medium">AI-generated professional documents with your branding.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-[#F8F7FF] border-2 border-[#6C3BFF] rounded-xl text-[#6C3BFF] text-xs font-black uppercase tracking-widest">
          <CheckCircle2 className="w-4 h-4" /> Credits: FounderOS.ai
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reportTemplates.map((report, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="bg-white border-4 border-[#111111] rounded-[2rem] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative group overflow-hidden"
          >
            {report.locked && !isPro && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-[#FFB84D] rounded-2xl flex items-center justify-center mb-6 border-4 border-[#111111] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-black text-xl mb-2 uppercase tracking-tighter">PRO FEATURE</h4>
                <p className="text-xs font-black text-gray-500 mb-6 uppercase tracking-widest leading-relaxed">Upgrade to unlock this <br /> professional export</p>
                <button 
                  onClick={() => setIsUpgradeOpen(true)}
                  className="px-8 py-3 bg-[#6C3BFF] text-white text-sm font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-[#111111] hover:translate-y-[-2px] transition-all"
                >
                  UPGRADE NOW
                </button>
              </div>
            )}

            <div className="flex items-start justify-between mb-10">
              <div className="w-16 h-16 bg-[#F8F7FF] border-2 border-[#111111] rounded-2xl flex items-center justify-center group-hover:bg-[#6C3BFF] group-hover:text-white transition-colors">
                <FileText className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{report.type}</div>
                <div className="text-xs font-bold text-gray-500">{report.size}</div>
              </div>
            </div>

            <h3 className="text-2xl font-black mb-8 tracking-tight">{report.title}</h3>

            <div className="flex gap-4">
              <button 
                disabled={generating === report.id}
                onClick={() => handleDownload(report)}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#111111] text-white text-sm font-black rounded-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all disabled:opacity-50"
              >
                {generating === report.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {generating === report.id ? "GENERATING..." : "DOWNLOAD"}
              </button>
              <button className="p-4 border-2 border-[#111111] rounded-xl hover:bg-gray-50 transition-all">
                <Eye className="w-6 h-6" />
              </button>
            </div>

            {/* Sketch accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <FileText className="w-full h-full rotate-12" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#FAFAFA] border-4 border-dashed border-[#EAEAEA] p-12 rounded-[3rem] text-center">
        <div className="w-20 h-20 bg-white border-4 border-[#111111] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
          <AlertCircle className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-2xl font-black mb-4">Need a custom report?</h3>
        <p className="text-gray-500 font-bold max-w-xl mx-auto mb-10 leading-relaxed">
          Our AI can generate specialized reports for specific industries or investor requirements. Contact our support for custom solutions.
        </p>
        <button className="px-10 py-4 bg-white border-4 border-[#111111] rounded-xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
          CONTACT SUPPORT
        </button>
      </div>

      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={() => setIsUpgradeOpen(false)} 
        onSuccess={() => setIsPro(true)} 
      />
    </div>
  );
};

