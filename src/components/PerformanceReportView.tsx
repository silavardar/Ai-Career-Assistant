import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Award,
  Layers,
} from 'lucide-react';
import { CandidateProfile, EvaluationReport } from '../types';

interface PerformanceReportViewProps {
  profile: CandidateProfile;
  report: EvaluationReport | null;
  isEvaluating: boolean;
  onBackToSimulator: () => void;
  onRegenerateReport: () => void;
}

export const PerformanceReportView: React.FC<PerformanceReportViewProps> = ({
  profile,
  report,
  isEvaluating,
  onBackToSimulator,
  onRegenerateReport,
}) => {
  if (isEvaluating) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 space-y-6">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
          <h2 className="text-lg font-semibold text-slate-900">
            Mülakat Performansınız STAR Tekniği, İletişim Netliği ve Teknik Derinlik Kriterlerine Göre Analiz Ediliyor...
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-100 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Henüz Tamamlanmış Mülakat Analizi Bulunmuyor
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Mülakat simülasyonunda en az bir soruyu yanıtladıktan sonra &quot;Mülakatı Bitir &amp; Detaylı Analizi Gör&quot; butonuna tıklayarak karnenizi oluşturabilirsiniz.
        </p>
        <button
          type="button"
          onClick={onBackToSimulator}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Mülakat Simülatörüne Dön</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Değerlendiren Rolü: <strong className="text-slate-800">{profile.interviewerTitle}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Hedef Pozisyon: {profile.targetRole}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            05. Mülakat Simülasyonu Performans & STAR Analiz Raporu
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBackToSimulator}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Simülasyona Dön</span>
          </button>
          <button
            type="button"
            onClick={onRegenerateReport}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Analizi Yeniden Hesapla</span>
          </button>
        </div>
      </div>

      {/* 4-Column Score Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs text-slate-400">Genel Mülakat Başarısı</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono-tabular">%{report.overallScore}</span>
            <span className="text-xs text-emerald-400">100 Üzerinden</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${report.overallScore}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs text-slate-500">STAR Tekniği Uyumu</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono-tabular text-slate-900">
              %{report.starMethodologyScore}
            </span>
            <span className="text-xs text-blue-600 font-medium">Situation·Task·Action·Result</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${report.starMethodologyScore}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs text-slate-500">İletişim Netliği & Yapı</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono-tabular text-slate-900">
              %{report.communicationClarityScore}
            </span>
            <span className="text-xs text-slate-500">Akıcılık & Özgüven</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${report.communicationClarityScore}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <span className="text-xs text-slate-500">Teknik & Stratejik Derinlik</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono-tabular text-slate-900">
              %{report.technicalDepthScore}
            </span>
            <span className="text-xs text-slate-500">{profile.interviewerTitle} Beklentisi</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${report.technicalDepthScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Executive Summary & Hiring Recommendation */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-blue-600">
            {profile.interviewerTitle} Gözünden İşe Alım Kararı & Yönetici Özeti
          </span>
          <span className="text-xs font-semibold text-emerald-700">
            Karar: {report.hiringRecommendation}
          </span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed">{report.executiveSummary}</p>
      </div>

      {/* Detailed S-T-A-R Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>STAR Metodolojisi Bileşen Kırılımı</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Yanıtlarınızda Durum (Situation), Görev (Task), Aksiyon (Action) ve Sonuç (Result) adımlarını ne kadar dengeli kullandığınızın analizi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              letter: 'S',
              title: 'Situation (Durum)',
              score: report.starBreakdown.situationScore,
              feedback: report.starBreakdown.situationFeedback,
            },
            {
              letter: 'T',
              title: 'Task (Görev)',
              score: report.starBreakdown.taskScore,
              feedback: report.starBreakdown.taskFeedback,
            },
            {
              letter: 'A',
              title: 'Action (Aksiyon)',
              score: report.starBreakdown.actionScore,
              feedback: report.starBreakdown.actionFeedback,
            },
            {
              letter: 'R',
              title: 'Result (Sonuç)',
              score: report.starBreakdown.resultScore,
              feedback: report.starBreakdown.resultFeedback,
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{item.title}</span>
                  <span className="text-sm font-bold font-mono-tabular text-blue-600">
                    %{item.score}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question-by-Question Critique & Ideal Answer Comparison */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Soru Bazlı Performans Analizi & Üst Düzey Cevap Revizyonları</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verdiğiniz her yanıtın güçlü/eksik yönleri ve kendi deneyiminize sadık kalınarak STAR formatında yeniden kurgulanmış ideal versiyonu.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {report.questionEvaluations.map((qe, idx) => (
            <div key={idx} className="py-6 first:pt-0 last:pb-0 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Soru 0{idx + 1}: &ldquo;{qe.question}&rdquo;
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono-tabular text-slate-600">
                  <span>STAR: %{qe.starScore}</span>
                  <span aria-hidden="true">·</span>
                  <span>Netlik: %{qe.clarityScore}</span>
                  <span aria-hidden="true">·</span>
                  <span>Teknik: %{qe.technicalDepthScore}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Sizin Verdiğiniz Yanıt & Koç Değerlendirmesi
                  </span>
                  <p className="text-xs text-slate-800 italic leading-relaxed">
                    &ldquo;{qe.userAnswer}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-xs font-semibold text-amber-700 block mb-0.5">
                      Eksik Kalan / Geliştirilecek Nokta:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{qe.critique}</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg space-y-2">
                  <span className="text-xs font-semibold text-emerald-900 block">
                    Önerilen Üst Düzey STAR Yanıtı ({profile.interviewerTitle} Seviyesi)
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {qe.idealRefinedAnswer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom 2-Column: Strengths, Improvements & Next Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mülakatta Öne Çıkan Güçlü Yönleriniz</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {report.keyStrengthsDemonstrated.map((s, idx) => (
              <li key={idx} className="leading-relaxed">
                • {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Gerçek Mülakat Öncesi Aksiyon Planınız</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {report.nextActionPlan.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                0{idx + 1}. {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
