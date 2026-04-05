export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  startupStage: 'idea' | 'mvp' | 'growth' | 'scale';
  plan: 'free' | 'starter' | 'pro';
  createdAt: number;
}

export interface StartupIdea {
  id: string;
  userId: string;
  idea: string;
  analysis: StartupAnalysis;
  marketResearch: MarketResearch;
  financeModel: FinanceModel;
  roadmap: ExecutionRoadmap;
  createdAt: number;
}

export interface StartupAnalysis {
  score: number;
  riskScore: number;
  successProbability: number;
  marketOpportunity: number;
  problemClarity: number;
  innovation: number;
  feasibility: number;
  summary: string;
}

export interface MarketResearch {
  tam: number;
  sam: number;
  som: number;
  competitors: Competitor[];
}

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
  gap: string;
}

export interface FinanceModel {
  projections: {
    month: string;
    revenue: number;
    cost: number;
  }[];
  breakEvenMonth: number;
}

export interface ExecutionRoadmap {
  phases: {
    title: string;
    tasks: {
      id: string;
      task: string;
      completed: boolean;
      notes?: string;
    }[];
  }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
