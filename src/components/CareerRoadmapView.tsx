import React from 'react';
import {
  TrendingUp,
  BookOpen,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { CandidateProfile, CareerRoadmap } from '../types';

interface CareerRoadmapViewProps {
  profile: CandidateProfile;
  roadmap: CareerRoadmap | null;
  isAnalyzing: boolean;
  onReanalyze: () => void;
  onProceedToQuestions: () => void;
}

export const CareerRoadmapView: React.FC<CareerRoadmapViewProps> = ({
  profile,
  roadmap,
  isAnalyzing,
  onReanalyze,
  onProceedToQuestions,
}) => {
  if (isAnalyzing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 space-y-6">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
          <h2 className="text-lg font-semibold text-slate-900">
            LinkedIn Profiliniz ve CV’niz Üzerinden Kariyer Yol Haritası Çıkarılıyor...
          </h2>
        </div>
        <p className="text-sm text-slate-600">
          Mevcut yetkinlikleriniz, <span className="font-semibold text-slate-900">{profile.targetRole}</span> hedefiniz ile karşılaştırılarak gelişim alanlarınız ve alabileceğiniz eğitimler belirleniyor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-36 bg-slate-100 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Henüz Kariyer Analizi Oluşturulmadı
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          LinkedIn ve CV bilgilerinize göre hangi eğitimleri alabileceğinizi ve hangi yetkinliklerde ön plana çıkmanız gerektiğini görmek için analizi başlatın.
        </p>
        <button
          type="button"
          onClick={onReanalyze}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <span>Şimdi Kariyer Analizini Başlat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>{profile.currentTitle || 'Mevcut Rol'}</span>
            <span aria-hidden="true">→</span>
            <span className="font-semibold text-slate-800">{profile.targetRole || 'Hedef Rol'}</span>
            <span aria-hidden="true">·</span>
            <span>Hedef Mülakatçı: {profile.interviewerTitle}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            02. Kariyer Gelişim, Yetkinlik & Eğitim Yol Haritası
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onReanalyze}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Analizi Güncelle</span>
          </button>
          <button
            type="button"
            onClick={onProceedToQuestions}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>{profile.interviewerTitle} Sorularına Geç</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Executive Summary & Readiness Score Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-blue-600">
              Bir Sonraki Kariyer Aşaması İçin Konumlandırma Özeti
            </span>
            <p className="text-sm text-slate-800 leading-relaxed">
              {roadmap.candidateSummary}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700 mb-1">
              Mülakatta Nasıl Konumlanmalısınız?
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {roadmap.nextStagePositioning}
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400">
              Hedef Rol Hazırlık Endeksi
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold font-mono-tabular text-white">
                %{roadmap.readinessScore}
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                {roadmap.readinessScore >= 80
                  ? 'Yüksek Uyum'
                  : roadmap.readinessScore >= 65
                  ? 'Gelişimle Güçlü Aday'
                  : 'Stratejik Hazırlık Gerekli'}
              </span>
            </div>
            <div className="mt-3 w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.max(10, roadmap.readinessScore))}%` }}
              />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 grid grid-cols-3 gap-2 text-left">
            <div>
              <div className="text-lg font-bold font-mono-tabular text-white">
                {roadmap.currentStrengths.length}
              </div>
              <div className="text-xs text-slate-400">Güçlü Yön</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono-tabular text-amber-400">
                {roadmap.skillGaps.length}
              </div>
              <div className="text-xs text-slate-400">Gelişim Alanı</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono-tabular text-emerald-400">
                {roadmap.recommendedTrainings.length}
              </div>
              <div className="text-xs text-slate-400">Önerilen Eğitim</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Where to Develop Next (Skill Gaps) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>Bir Sonraki Aşamada Kendinizi Geliştirmeniz Gereken Alanlar (Yetkinlik Boşlukları)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.targetRole} seviyesine çıkarken kapatmanız gereken öncelikli yetkinlik farkları ve somut aksiyon adımları.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {roadmap.skillGaps.map((gap, index) => (
            <div key={index} className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div className="lg:col-span-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-semibold ${
                      gap.priority.toLowerCase().includes('kritik')
                        ? 'text-red-600'
                        : gap.priority.toLowerCase().includes('yüksek')
                        ? 'text-amber-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {gap.priority} Öncelik
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-mono-tabular text-slate-500">
                    Mevcut %{gap.currentLevel} → Hedef %{gap.targetLevel}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{gap.skill}</h3>
                <div className="w-full max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${gap.currentLevel}%` }}
                  />
                </div>
              </div>

              <div className="lg:col-span-4">
                <span className="block text-xs font-medium text-slate-500 mb-0.5">
                  Neden Gerekli?
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{gap.whyNeeded}</p>
              </div>

              <div className="lg:col-span-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                <span className="block text-xs font-semibold text-slate-800 mb-1">
                  Önerilen Uygulama Adımı
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{gap.actionStep}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Recommended Trainings & Certifications */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Alabileceğiniz Eğitimler, Sertifikalar ve Gelişim Programları</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Belirlenen yetkinlik boşluklarını hızla kapatmak ve CV/LinkedIn profilinizi güçlendirmek için önerilen programlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roadmap.recommendedTrainings.map((training, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-blue-600">{training.providerOrType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{training.durationEstimate}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  {training.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Odak Alanı: <span className="text-slate-700 font-medium">{training.focusArea}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="block text-xs font-medium text-slate-500 mb-1">
                  Kariyer & Mülakat Etkisi:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {training.expectedImpact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Spotlight Competencies & Current Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Spotlight Competencies */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Ön Plana Çıkmanız Gereken Yetkinlikler & LinkedIn Optimizasyonu</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hem mülakat yanıtlarınızda hem de LinkedIn profilinizde vitrine çıkarmanız gereken stratejik kaslarınız.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {roadmap.spotlightCompetencies.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  0{idx + 1}. {item.competency}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="block text-xs font-semibold text-slate-700 mb-1">
                      Mülakatta Nasıl Vurgulanmalı?
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.howToHighlightInInterview}
                    </p>
                  </div>
                  <div className="bg-blue-50/50 p-3 rounded-lg">
                    <span className="block text-xs font-semibold text-blue-900 mb-1">
                      LinkedIn Profil Önerisi
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.linkedinOptimizationTip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Proven Strengths */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mevcut Kanıtlanmış Güçlü Yönleriniz</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              CV ve LinkedIn geçmişinizde somut kanıtı bulunan temel yetkinlikleriniz.
            </p>
          </div>

          <div className="space-y-4">
            {roadmap.currentStrengths.map((str, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{str.competency}</span>
                  <span className="font-mono-tabular font-semibold text-emerald-700">
                    %{str.level}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${str.level}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 pt-1">{str.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
