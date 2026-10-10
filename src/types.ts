export interface CandidateProfile {
  currentTitle: string;
  targetRole: string;
  targetCompany: string;
  interviewerTitle: string;
  interviewStage: string;
  linkedinUrl: string;
  linkedinSummaryText: string;
  cvText: string;
  cvFileName?: string;
  cvFileBase64?: string;
  cvFileMimeType?: string;
}

export interface CareerRoadmap {
  candidateSummary: string;
  readinessScore: number;
  nextStagePositioning: string;
  currentStrengths: {
    competency: string;
    level: number;
    evidence: string;
  }[];
  skillGaps: {
    skill: string;
    priority: string;
    currentLevel: number;
    targetLevel: number;
    whyNeeded: string;
    actionStep: string;
  }[];
  recommendedTrainings: {
    title: string;
    providerOrType: string;
    focusArea: string;
    durationEstimate: string;
    expectedImpact: string;
  }[];
  spotlightCompetencies: {
    competency: string;
    howToHighlightInInterview: string;
    linkedinOptimizationTip: string;
  }[];
}

export interface InterviewerPersona {
  title: string;
  mindsetSummary: string;
  primaryPriorities: string[];
  redFlagsToAvoid: string[];
}

export interface InterviewQuestionItem {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  hiddenIntent: string;
  tailoredCandidateTip: string;
  sampleStarOutline: string;
}

export interface QuestionsResponse {
  interviewerPersona: InterviewerPersona;
  questions: InterviewQuestionItem[];
}

export interface TurnEvaluation {
  starScore: number;
  clarityScore: number;
  technicalDepthScore: number;
  detectedStarComponents: {
    situation: boolean;
    task: boolean;
    action: boolean;
    result: boolean;
  };
  instantCoachingFeedback: string;
  strongestPoint: string;
  improvementArea: string;
}

export interface ChatTurn {
  id: string;
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: string;
  mode?: 'text' | 'voice';
  questionAsked?: string;
  evaluation?: TurnEvaluation;
}

export interface EvaluationReport {
  overallScore: number;
  starMethodologyScore: number;
  communicationClarityScore: number;
  technicalDepthScore: number;
  hiringRecommendation: string;
  executiveSummary: string;
  starBreakdown: {
    situationScore: number;
    situationFeedback: string;
    taskScore: number;
    taskFeedback: string;
    actionScore: number;
    actionFeedback: string;
    resultScore: number;
    resultFeedback: string;
  };
  keyStrengthsDemonstrated: string[];
  criticalImprovementAreas: string[];
  questionEvaluations: {
    question: string;
    userAnswer: string;
    starScore: number;
    clarityScore: number;
    technicalDepthScore: number;
    critique: string;
    idealRefinedAnswer: string;
  }[];
  nextActionPlan: string[];
}

export type ActiveTab = 'setup' | 'roadmap' | 'questions' | 'simulator' | 'report';
