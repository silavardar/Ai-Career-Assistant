import React, { useState } from 'react';
import {
  UserCheck,
  HelpCircle,
  Play,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Volume2,
} from 'lucide-react';
import { CandidateProfile, QuestionsResponse, InterviewQuestionItem } from '../types';

interface QuestionGeneratorViewProps {
  profile: CandidateProfile;
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
  questionsData: QuestionsResponse | null;
  isGenerating: boolean;
  onGenerateQuestions: () => void;
  onStartSimulationWithQuestions: (selectedQuestions?: InterviewQuestionItem[]) => void;
  onSpeakText: (text: string) => void;
  isSpeaking: boolean;
}

export const QuestionGeneratorView: React.FC<QuestionGeneratorViewProps> = ({
  profile,
  setProfile,
  questionsData,
  isGenerating,
  onGenerateQuestions,
  onStartSimulationWithQuestions,
  onSpeakText,
  isSpeaking,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    questionsData?.questions?.[0]?.id || null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = questionsData?.questions
    ? ['ALL', ...Array.from(new Set(questionsData.questions.map((q) => q.category)))]
    : ['ALL'];

  const filteredQuestions =
    questionsData?.questions.filter(
      (q) => selectedCategory === 'ALL' || q.category === selectedCategory
    ) || [];

  return (
    <div className="space-y-8">
      {/* Top Bar & Title Input */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Hedef Pozisyon: {profile.targetRole}</span>
            <span aria-hidden="true">·</span>
            <span>Aşama: {profile.interviewStage}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            03. Mülakatçı Unvanına (Title) Göre Stratejik Soru Üretici
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Mülakata katılacak kişinin unvanını değiştirdiğinizde, o unvandaki karar vericinin ajandasına, önceliklerine ve CV’nizdeki deneyimlere özel yeni sorular üretilir.
          </p>
        </div>

        {/* Dynamic Title Changer Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <div className="relative min-w-[260px]">
            <UserCheck className="w-4 h-4 text-blue-600 absolute left-3 top-2.5" />
            <input
              type="text"
              value={profile.interviewerTitle}
              onChange={(e) => setProfile({ ...profile, interviewerTitle: e.target.value })}
              placeholder="Mülakatçı Unvanı (ör. CTO, VP of Eng)"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="button"
            onClick={onGenerateQuestions}
            disabled={isGenerating || !profile.interviewerTitle.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Sorular Üretiliyor...' : 'Unvana Göre Yeniden Üret'}</span>
          </button>
          <button
            type="button"
            onClick={() => onStartSimulationWithQuestions(questionsData?.questions)}
            disabled={!questionsData?.questions?.length}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Bu Sorularla Simülasyonu Başlat</span>
          </button>
        </div>
      </div>

      {isGenerating ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 space-y-6">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            <h2 className="text-lg font-semibold text-slate-900">
              &quot;{profile.interviewerTitle}&quot; Gözünden Potansiyel Mülakat Soruları Hazırlanıyor...
            </h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-20 bg-slate-100 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      ) : !questionsData ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h2 className="text-lg font-semibold text-slate-900">
            Mülakatçı Unvanına Özel Sorular Hazır Değil
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Yukarıdaki alana mülakata gireceğiniz kişinin unvanını yazıp &quot;Unvana Göre Yeniden Üret&quot; butonuna tıklayın.
          </p>
        </div>
      ) : (
        <>
          {/* Interviewer Persona Decoding Panel */}
          <div className="bg-slate-900 text-white rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs text-blue-400 font-medium">
                Mülakatçı Karar Verici Analizi
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                {questionsData.interviewerPersona.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                {questionsData.interviewerPersona.mindsetSummary}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-2 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bu Unvanın Odaklandığı Öncelikler</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {questionsData.interviewerPersona.primaryPriorities.map((p, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-2 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Kaçınılması Gereken Hatalar</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {questionsData.interviewerPersona.redFlagsToAvoid.map((flag, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'ALL' ? `Tüm Sorular (${questionsData.questions.length})` : cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Sorunun üzerine tıklayarak gizli beklentiyi ve CV’nize özel STAR ipucunu inceleyin.
            </span>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, index) => {
              const isExpanded = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="p-5 cursor-pointer hover:bg-slate-50/80 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono-tabular font-semibold text-slate-800">
                          Soru 0{index + 1}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-blue-600">{q.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>Zorluk: {q.difficulty}</span>
                      </div>

                      <h3 className="text-base font-semibold text-slate-900 leading-snug">
                        &ldquo;{q.question}&rdquo;
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSpeakText(q.question);
                        }}
                        disabled={isSpeaking}
                        title="Soruyu Sesli Dinle"
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200/80 space-y-1">
                          <span className="text-xs font-semibold text-slate-800">
                            {questionsData.interviewerPersona.title} Bu Soruyla Neyi Ölçüyor? (Gizli Beklenti)
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {q.hiddenIntent}
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200/80 space-y-1">
                          <span className="text-xs font-semibold text-blue-700">
                            LinkedIn & CV Geçmişinizden Neyi Öne Çıkarmalısınız?
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {q.tailoredCandidateTip}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-700">
                            Önerilen STAR (Situation · Task · Action · Result) Cevap Kurgusu
                          </span>
                          <button
                            type="button"
                            onClick={() => onStartSimulationWithQuestions([q])}
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Bu Soruyla Pratik Yap →
                          </button>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {q.sampleStarOutline}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
