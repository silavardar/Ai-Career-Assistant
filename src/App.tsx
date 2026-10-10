import React, { useState, useRef } from 'react';
import {
  User,
  Compass,
  HelpCircle,
  Mic,
  BarChart3,
  AlertCircle,
  Play,
} from 'lucide-react';
import {
  ActiveTab,
  CandidateProfile,
  CareerRoadmap,
  QuestionsResponse,
  InterviewQuestionItem,
  ChatTurn,
  EvaluationReport,
} from './types';
import { PRESET_SCENARIOS, PresetScenario } from './presets';
import { ProfileSetupView } from './components/ProfileSetupView';
import { CareerRoadmapView } from './components/CareerRoadmapView';
import { QuestionGeneratorView } from './components/QuestionGeneratorView';
import { InterviewSimulatorView } from './components/InterviewSimulatorView';
import { PerformanceReportView } from './components/PerformanceReportView';

export default function App() {
  const defaultPreset = PRESET_SCENARIOS[0];

  const [activeTab, setActiveTab] = useState<ActiveTab>('setup');
  const [profile, setProfile] = useState<CandidateProfile>(defaultPreset.profile);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(defaultPreset.roadmap);
  const [questionsData, setQuestionsData] = useState<QuestionsResponse | null>(
    defaultPreset.questionsData
  );
  const [simulationQuestions, setSimulationQuestions] = useState<InterviewQuestionItem[]>(
    defaultPreset.questionsData.questions
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const getCurrentTimeStr = () => {
    const now = new Date();
    return now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const [turns, setTurns] = useState<ChatTurn[]>([
    {
      id: 'init-turn-1',
      role: 'interviewer',
      content: `Merhaba, ben ${defaultPreset.profile.interviewerTitle} olarak bugünkü mülakatınızı yürüteceğim. Özgeçmişinizi ve LinkedIn profilinizi inceledim. İlk sorumla başlayalım: ${defaultPreset.questionsData.questions[0].question}`,
      timestamp: '09:00',
      questionAsked: defaultPreset.questionsData.questions[0].question,
    },
  ]);

  const [evaluationReport, setEvaluationReport] = useState<EvaluationReport | null>(
    defaultPreset.sampleReport
  );

  // Loading & Error states
  const [isAnalyzingProfile, setIsAnalyzingProfile] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);
  const [isEvaluatingReport, setIsEvaluatingReport] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeakText = async (textToSpeak: string) => {
    if (!textToSpeak.trim()) return;
    try {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      setIsSpeaking(true);
      const res = await fetch('/api/audio/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
          voiceName: 'Kore',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.audioBase64) {
        setIsSpeaking(false);
        return;
      }
      const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
      audioPlayerRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      await audio.play();
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setErrorMessage(null);
    setProfile(preset.profile);
    setRoadmap(preset.roadmap);
    setQuestionsData(preset.questionsData);
    setSimulationQuestions(preset.questionsData.questions);
    setCurrentQuestionIndex(0);
    setTurns([
      {
        id: `init-${Date.now()}`,
        role: 'interviewer',
        content: `Merhaba, ben ${preset.profile.interviewerTitle} olarak bugünkü görüşmemizi gerçekleştireceğim. LinkedIn ve CV geçmişinizi inceledim. İlk sorum şu: ${preset.questionsData.questions[0].question}`,
        timestamp: getCurrentTimeStr(),
        questionAsked: preset.questionsData.questions[0].question,
      },
    ]);
    setEvaluationReport(preset.sampleReport);
  };

  const handleAnalyzeProfile = async () => {
    setErrorMessage(null);
    setIsAnalyzingProfile(true);
    setActiveTab('roadmap');

    try {
      const response = await fetch('/api/profile/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkedinUrl: profile.linkedinUrl,
          linkedinSummaryText: profile.linkedinSummaryText,
          cvText: profile.cvText,
          cvFileBase64: profile.cvFileBase64,
          cvFileMimeType: profile.cvFileMimeType,
          currentTitle: profile.currentTitle,
          targetRole: profile.targetRole,
          targetCompany: profile.targetCompany,
          interviewerTitle: profile.interviewerTitle,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Kariyer analizi sırasında bir hata oluştu.');
      }
      setRoadmap(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Profil analizi tamamlanamadı.');
    } finally {
      setIsAnalyzingProfile(false);
    }
  };

  const handleGenerateQuestions = async () => {
    setErrorMessage(null);
    setIsGeneratingQuestions(true);
    setActiveTab('questions');

    try {
      const response = await fetch('/api/questions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewerTitle: profile.interviewerTitle,
          targetRole: profile.targetRole,
          targetCompany: profile.targetCompany,
          interviewStage: profile.interviewStage,
          candidateSummary: roadmap?.candidateSummary || '',
          cvText: profile.cvText,
          linkedinSummaryText: profile.linkedinSummaryText,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Sorular üretilirken bir hata oluştu.');
      }
      setQuestionsData(data);
      if (data.questions && data.questions.length > 0) {
        setSimulationQuestions(data.questions);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Mülakatçı soruları üretilemedi.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleStartSimulationWithQuestions = (customQuestions?: InterviewQuestionItem[]) => {
    const activeQuestions =
      customQuestions && customQuestions.length > 0
        ? customQuestions
        : questionsData?.questions || simulationQuestions;

    if (!activeQuestions || activeQuestions.length === 0) return;

    setSimulationQuestions(activeQuestions);
    setCurrentQuestionIndex(0);

    const firstPrompt = `Merhaba, ben ${profile.interviewerTitle} olarak bugünkü mülakatınızı yürüteceğim. Hazırsanız ilk sorumla başlayalım: ${activeQuestions[0].question}`;
    setTurns([
      {
        id: `sim-start-${Date.now()}`,
        role: 'interviewer',
        content: firstPrompt,
        timestamp: getCurrentTimeStr(),
        questionAsked: activeQuestions[0].question,
      },
    ]);
    setActiveTab('simulator');

    if (autoSpeakEnabled) {
      handleSpeakText(firstPrompt);
    }
  };

  const handleSendAnswer = async (answerText: string, mode: 'text' | 'voice') => {
    setErrorMessage(null);
    const activeQuestionText =
      simulationQuestions[currentQuestionIndex]?.question ||
      turns.filter((t) => t.role === 'interviewer').slice(-1)[0]?.content ||
      '';

    const userTurnId = `cand-${Date.now()}`;
    const newCandidateTurn: ChatTurn = {
      id: userTurnId,
      role: 'candidate',
      content: answerText,
      timestamp: getCurrentTimeStr(),
      mode,
      questionAsked: activeQuestionText,
    };

    const updatedTurns = [...turns, newCandidateTurn];
    setTurns(updatedTurns);
    setIsProcessingTurn(true);

    const nextIdx = currentQuestionIndex + 1;
    const nextPlannedQuestion =
      nextIdx < simulationQuestions.length ? simulationQuestions[nextIdx].question : null;

    try {
      const response = await fetch('/api/interview/turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewerTitle: profile.interviewerTitle,
          targetRole: profile.targetRole,
          targetCompany: profile.targetCompany,
          candidateSummary: roadmap?.candidateSummary || profile.linkedinSummaryText,
          history: updatedTurns.map((t) => ({ role: t.role, content: t.content })),
          currentQuestion: activeQuestionText,
          userAnswer: answerText,
          nextPlannedQuestion,
          questionIndex: currentQuestionIndex,
          totalQuestions: simulationQuestions.length,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Mülakat yanıtı değerlendirilemedi.');
      }

      const interviewerTurn: ChatTurn = {
        id: `int-${Date.now()}`,
        role: 'interviewer',
        content: data.interviewerReply,
        timestamp: getCurrentTimeStr(),
        questionAsked: nextPlannedQuestion || activeQuestionText,
      };

      setTurns((prev) =>
        prev
          .map((t) =>
            t.id === userTurnId ? { ...t, evaluation: data.turnEvaluation } : t
          )
          .concat(interviewerTurn)
      );

      if (nextPlannedQuestion) {
        setCurrentQuestionIndex(nextIdx);
      }

      if (autoSpeakEnabled && data.interviewerReply) {
        handleSpeakText(data.interviewerReply);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Simülasyon yanıtı işlenemedi.');
    } finally {
      setIsProcessingTurn(false);
    }
  };

  const handleFinishAndEvaluate = async () => {
    setErrorMessage(null);
    const candidateTurns = turns.filter((t) => t.role === 'candidate');
    if (candidateTurns.length === 0) return;

    setIsEvaluatingReport(true);
    setActiveTab('report');

    const qaPairs = candidateTurns.map((ct) => ({
      question: ct.questionAsked || 'Mülakat Sorusu',
      answer: ct.content,
      mode: ct.mode || 'text',
    }));

    try {
      const response = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewerTitle: profile.interviewerTitle,
          targetRole: profile.targetRole,
          targetCompany: profile.targetCompany,
          candidateSummary: roadmap?.candidateSummary || profile.linkedinSummaryText,
          qaPairs,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Performans karnesi oluşturulamadı.');
      }
      setEvaluationReport(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Performans analizi sırasında hata oluştu.');
    } finally {
      setIsEvaluatingReport(false);
    }
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'setup', label: '01. Profil & CV Kurulumu', icon: <User className="w-4 h-4" /> },
    { id: 'roadmap', label: '02. Kariyer & Eğitim Haritası', icon: <Compass className="w-4 h-4" /> },
    { id: 'questions', label: '03. Unvana Göre Sorular', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'simulator', label: '04. Mülakat Simülasyonu', icon: <Mic className="w-4 h-4" /> },
    { id: 'report', label: '05. STAR Performans Karnesi', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#setup"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('setup');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
        >
          Vantage Career Studio
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('setup')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'setup' ? 'text-blue-600 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Profil & CV
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('roadmap')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'roadmap' ? 'text-blue-600 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Kariyer Haritası
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('questions')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'questions' ? 'text-blue-600 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Unvan Soruları
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'simulator' ? 'text-blue-600 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Simülasyon
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'report' ? 'text-blue-600 font-semibold underline underline-offset-8' : ''
            }`}
          >
            STAR Raporu
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleStartSimulationWithQuestions()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simülasyonu Başlat</span>
          </button>
        </div>
      </header>

      {/* Workspace Body: Left Sidebar + Main Content Viewport */}
      <div className="flex-1 flex">
        {/* Left Sidebar Navigation (260px on desktop) */}
        <aside className="hidden xl:flex xl:w-64 xl:flex-col xl:justify-between bg-white border-r border-slate-200 p-5 shrink-0">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 px-3 block mb-2">
                Mülakat & Koçluk Adımları
              </span>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Session Context Summary */}
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
              <span className="text-xs font-semibold text-slate-800 block">
                Aktif Mülakat Bağlamı
              </span>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Mülakatçı Unvanı:</span>
                  <span className="font-semibold text-slate-900">
                    {profile.interviewerTitle || 'Belirtilmedi'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Hedef Pozisyon:</span>
                  <span className="font-medium text-slate-800">
                    {profile.targetRole || 'Belirtilmedi'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Kariyer Hazırlık Skoru:</span>
                  <span className="font-mono-tabular font-semibold text-blue-600">
                    {roadmap ? `%${roadmap.readinessScore}` : 'Analiz Bekleniyor'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
            Vantage AI Career &amp; Interview Coach
          </div>
        </aside>

        {/* Main Viewport */}
        <main className="flex-1 min-w-0 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {/* Mobile Step Switcher */}
          <div className="flex md:hidden overflow-x-auto gap-1.5 pb-4 mb-4 border-b border-slate-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-4 text-xs text-red-800">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="font-semibold hover:underline shrink-0"
              >
                Kapat
              </button>
            </div>
          )}

          {activeTab === 'setup' && (
            <ProfileSetupView
              profile={profile}
              setProfile={setProfile}
              onAnalyzeProfile={handleAnalyzeProfile}
              onGenerateQuestions={handleGenerateQuestions}
              onSelectPreset={handleSelectPreset}
              isAnalyzingProfile={isAnalyzingProfile}
              isGeneratingQuestions={isGeneratingQuestions}
            />
          )}

          {activeTab === 'roadmap' && (
            <CareerRoadmapView
              profile={profile}
              roadmap={roadmap}
              isAnalyzing={isAnalyzingProfile}
              onReanalyze={handleAnalyzeProfile}
              onProceedToQuestions={() => {
                if (questionsData) {
                  setActiveTab('questions');
                } else {
                  handleGenerateQuestions();
                }
              }}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionGeneratorView
              profile={profile}
              setProfile={setProfile}
              questionsData={questionsData}
              isGenerating={isGeneratingQuestions}
              onGenerateQuestions={handleGenerateQuestions}
              onStartSimulationWithQuestions={handleStartSimulationWithQuestions}
              onSpeakText={handleSpeakText}
              isSpeaking={isSpeaking}
            />
          )}

          {activeTab === 'simulator' && (
            <InterviewSimulatorView
              profile={profile}
              questions={simulationQuestions}
              turns={turns}
              currentQuestionIndex={currentQuestionIndex}
              isProcessingTurn={isProcessingTurn}
              isEvaluatingReport={isEvaluatingReport}
              autoSpeakEnabled={autoSpeakEnabled}
              setAutoSpeakEnabled={setAutoSpeakEnabled}
              onSendAnswer={handleSendAnswer}
              onFinishAndEvaluate={handleFinishAndEvaluate}
              onResetSimulation={() => handleStartSimulationWithQuestions(simulationQuestions)}
              onSpeakText={handleSpeakText}
              isSpeaking={isSpeaking}
            />
          )}

          {activeTab === 'report' && (
            <PerformanceReportView
              profile={profile}
              report={evaluationReport}
              isEvaluating={isEvaluatingReport}
              onBackToSimulator={() => setActiveTab('simulator')}
              onRegenerateReport={handleFinishAndEvaluate}
            />
          )}
        </main>
      </div>
    </div>
  );
}
