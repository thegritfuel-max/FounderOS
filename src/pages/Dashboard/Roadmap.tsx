import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Milestone, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  StickyNote, 
  Save,
  Loader2,
  Plus,
  Trash2,
  Building2,
  Globe,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ExecutionRoadmap } from '../../types';
import { fetchIncubationAndFunding } from '../../services/geminiService';

// Mock initial roadmap data
const initialRoadmap: ExecutionRoadmap = {
  phases: [
    {
      title: "Phase 1: Foundation & Validation",
      tasks: [
        { id: "1-1", task: "Define core problem and target audience", completed: true, notes: "Focus on early-stage founders who struggle with structured planning." },
        { id: "1-2", task: "Conduct 10 customer discovery interviews", completed: true, notes: "Interviews confirmed that 'execution gap' is the biggest pain point." },
        { id: "1-3", task: "Create landing page and collect 100 waitlist signups", completed: false, notes: "" },
      ]
    },
    {
      title: "Phase 2: MVP Development",
      tasks: [
        { id: "2-1", task: "Design core AI analysis engine architecture", completed: false, notes: "" },
        { id: "2-2", task: "Develop basic dashboard with 3 core modules", completed: false, notes: "" },
        { id: "2-3", task: "Integrate Gemini API for business plan generation", completed: false, notes: "" },
      ]
    },
    {
      title: "Phase 3: Launch & Growth",
      tasks: [
        { id: "3-1", task: "Beta launch to waitlist users", completed: false, notes: "" },
        { id: "3-2", task: "Implement referral program for viral growth", completed: false, notes: "" },
        { id: "3-3", task: "Optimize conversion rate based on user feedback", completed: false, notes: "" },
      ]
    }
  ]
};

export const Roadmap = () => {
  const [roadmap, setRoadmap] = useState<ExecutionRoadmap>(initialRoadmap);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [resources, setResources] = useState<any>(null);
  const [loadingResources, setLoadingResources] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      const analysis = localStorage.getItem('founder_os_startup_analysis');
      if (analysis) {
        const parsed = JSON.parse(analysis);
        setLoadingResources(true);
        try {
          const data = await fetchIncubationAndFunding(parsed.domain || 'Technology');
          setResources(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingResources(false);
        }
      }
    };
    loadResources();
  }, []);

  const toggleTaskCompletion = (phaseIndex: number, taskIndex: number) => {
    const newRoadmap = { ...roadmap };
    newRoadmap.phases[phaseIndex].tasks[taskIndex].completed = !newRoadmap.phases[phaseIndex].tasks[taskIndex].completed;
    setRoadmap(newRoadmap);
  };

  const handleNoteChange = (taskId: string, value: string) => {
    setEditingNotes(prev => ({ ...prev, [taskId]: value }));
  };

  const saveNote = async (phaseIndex: number, taskIndex: number) => {
    const taskId = roadmap.phases[phaseIndex].tasks[taskIndex].id;
    const noteValue = editingNotes[taskId];
    
    if (noteValue === undefined) return;

    setIsSaving(taskId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newRoadmap = { ...roadmap };
    newRoadmap.phases[phaseIndex].tasks[taskIndex].notes = noteValue;
    setRoadmap(newRoadmap);
    setIsSaving(null);
  };

  const toggleExpand = (taskId: string, currentNote: string) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
    } else {
      setExpandedTask(taskId);
      if (editingNotes[taskId] === undefined) {
        setEditingNotes(prev => ({ ...prev, [taskId]: currentNote }));
      }
    }
  };

  const addCustomTask = () => {
    const newTask = {
      id: `custom-${Date.now()}`,
      task: "New Strategic Task",
      completed: false,
      notes: ""
    };
    
    const newRoadmap = { ...roadmap };
    // Add to the first phase for simplicity in this demo
    newRoadmap.phases[0].tasks.push(newTask);
    setRoadmap(newRoadmap);
    setExpandedTask(newTask.id);
  };

  const deleteTask = (phaseIndex: number, taskIndex: number) => {
    const newRoadmap = { ...roadmap };
    newRoadmap.phases[phaseIndex].tasks.splice(taskIndex, 1);
    setRoadmap(newRoadmap);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1">Execution Roadmap</h1>
          <p className="text-gray-500 font-medium">Your step-by-step guide to building a $100M company.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#111111] rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-3 h-3 bg-[#6C3BFF] rounded-full animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">Live Strategy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12 relative before:absolute before:left-[27px] before:top-8 before:bottom-8 before:w-1 before:bg-gray-100 before:rounded-full">
          {roadmap.phases.map((phase, pIndex) => (
            <div key={pIndex} className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#111111] text-white border-4 border-[#111111] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(108,59,255,1)]">
                  <Milestone className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black">{phase.title}</h2>
              </div>

              <div className="ml-14 space-y-4">
                {phase.tasks.map((task, tIndex) => (
                  <motion.div
                    key={task.id}
                    layout
                    className={cn(
                      "bg-white border-4 border-[#111111] rounded-2xl overflow-hidden transition-all",
                      expandedTask === task.id ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]"
                    )}
                  >
                    <div 
                      className="p-5 flex items-center gap-4 cursor-pointer"
                      onClick={() => toggleExpand(task.id, task.notes || "")}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskCompletion(pIndex, tIndex);
                        }}
                        className="flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-7 h-7 text-[#6C3BFF] fill-[#6C3BFF]/10" />
                        ) : (
                          <Circle className="w-7 h-7 text-gray-300" />
                        )}
                      </button>
                      
                      <span className={cn(
                        "flex-grow font-bold text-lg",
                        task.completed && "text-gray-400 line-through decoration-2"
                      )}>
                        {task.task}
                      </span>

                      <div className="flex items-center gap-3">
                        {task.notes && (
                          <StickyNote className="w-5 h-5 text-[#FFB84D]" />
                        )}
                        {expandedTask === task.id ? (
                          <ChevronUp className="w-6 h-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedTask === task.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t-2 border-gray-100 bg-[#FAFAFA]"
                        >
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <StickyNote className="w-3 h-3" /> Task Notes & Strategy
                              </label>
                              {isSaving === task.id ? (
                                <div className="flex items-center gap-2 text-[#6C3BFF] text-xs font-black">
                                  <Loader2 className="w-3 h-3 animate-spin" /> SAVING...
                                </div>
                              ) : (
                                editingNotes[task.id] !== task.notes && (
                                  <button 
                                    onClick={() => saveNote(pIndex, tIndex)}
                                    className="flex items-center gap-1 text-[#6C3BFF] text-xs font-black hover:underline"
                                  >
                                    <Save className="w-3 h-3" /> SAVE CHANGES
                                  </button>
                                )
                              )}
                            </div>
                            
                            <textarea
                              value={editingNotes[task.id] ?? task.notes ?? ""}
                              onChange={(e) => handleNoteChange(task.id, e.target.value)}
                              placeholder="Add strategic notes, links, or reminders for this task..."
                              className="w-full h-32 p-4 bg-white border-2 border-[#111111] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C3BFF]/20 font-medium text-sm resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
                            />

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-black text-gray-500 uppercase">Priority: High</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-black text-gray-500 uppercase">Est: 2 days</span>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTask(pIndex, tIndex);
                                }}
                                className="text-red-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <button 
            onClick={addCustomTask}
            className="ml-14 w-full py-4 border-4 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-black hover:border-[#6C3BFF] hover:text-[#6C3BFF] transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" /> ADD CUSTOM TASK
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111111] text-white border-4 border-[#111111] rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(108,59,255,0.3)]">
            <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#6C3BFF]" />
              Incubation Hubs
            </h3>
            {loadingResources ? (
              <div className="flex items-center gap-3 text-white/40 font-bold">
                <Loader2 className="w-4 h-4 animate-spin" /> Finding hubs...
              </div>
            ) : (
              <div className="space-y-4">
                {resources?.incubationWebsites.map((site: any, i: number) => (
                  <a 
                    key={i}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white/5 rounded-xl border-2 border-white/10 hover:border-[#6C3BFF] transition-all group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-black text-sm group-hover:text-[#6C3BFF] transition-colors">{site.name}</span>
                      <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-[#6C3BFF]" />
                    </div>
                    <div className="text-[10px] text-white/40 font-medium line-clamp-2">{site.description}</div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border-4 border-[#111111] rounded-[32px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-green-500" />
              Govt. Funding
            </h3>
            {loadingResources ? (
              <div className="flex items-center gap-3 text-gray-400 font-bold">
                <Loader2 className="w-4 h-4 animate-spin" /> Fetching grants...
              </div>
            ) : (
              <div className="space-y-4">
                {resources?.fundingWebsites.map((site: any, i: number) => (
                  <a 
                    key={i}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-green-500 transition-all group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-black text-sm group-hover:text-green-600 transition-colors">{site.name}</span>
                      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-green-500" />
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium line-clamp-2">{site.description}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
