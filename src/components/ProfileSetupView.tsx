import React, { useRef } from 'react';
import {
  FileText,
  Upload,
  Link as LinkIcon,
  Briefcase,
  UserCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { CandidateProfile } from '../types';
import { PRESET_SCENARIOS, PresetScenario } from '../presets';

interface ProfileSetupViewProps {
  profile: CandidateProfile;
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
  onAnalyzeProfile: () => void;
  onGenerateQuestions: () => void;
  onSelectPreset: (preset: PresetScenario) => void;
  isAnalyzingProfile: boolean;
  isGeneratingQuestions: boolean;
}

const COMMON_INTERVIEWER_TITLES = [
  'VP of Engineering',
  'Chief Technology Officer (CTO)',
  'Engineering Manager',
  'Staff Software Engineer',
  'Chief Product Officer (CPO)',
  'Head of Product',
  'Senior Talent Acquisition Partner',
  'HR Business Partner (HRBP)',
];

export const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({
  profile,
  setProfile,
  onAnalyzeProfile,
  onGenerateQuestions,
  onSelectPreset,
  isAnalyzingProfile,
  isGeneratingQuestions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isTextLike =
      file.type === 'text/plain' ||
      file.name.endsWith('.txt') ||
      file.name.endsWith('.md') ||
      file.name.endsWith('.json');

    if (isTextLike) {
      const reader = new FileReader();
      reader.onload = () => {
        const textContent = typeof reader.result === 'string' ? reader.result : '';
        setProfile((prev) => ({
          ...prev,
          cvFileName: file.name,
          cvText: textContent,
          cvFileBase64: undefined,
          cvFileMimeType: undefined,
        }));
      };
      reader.readAsText(file);
    } else {
      // PDF or other document -> base64 for Gemini inlineData
      const reader = new FileReader();
      reader.onload = () => {
        const resultStr = typeof reader.result === 'string' ? reader.result : '';
        const base64Data = resultStr.includes(',') ? resultStr.split(',')[1] : resultStr;
        setProfile((prev) => ({
          ...prev,
          cvFileName: file.name,
          cvFileBase64: base64Data,
          cvFileMimeType: file.type || 'application/pdf',
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Demo Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            01. Aday Profili, LinkedIn & Mülakatçı Kurulumu
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            LinkedIn profil bağlantınızı, CV dosyanızı ve mülakata gireceğiniz kişinin unvanını (title) tanımlayın.
            Sistem bu bilgileri birleştirerek size özel kariyer yol haritası ve mülakatçı soruları üretir.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-slate-500 mr-1">Örnek Senaryo Yükle:</span>
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {preset.id === 'swe-to-staff' ? 'Staff Engineer (VP Eng)' : 'Head of Product (CPO)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Target Role & Interviewer Title */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Mülakat Katılımcısı & Hedef Pozisyon
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mülakata gireceğiniz kişinin unvanı, soruların teknik veya stratejik ağırlığını doğrudan belirler.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mülakata Katılacak Kişinin Unvanı (Interviewer Title) *
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={profile.interviewerTitle}
                  onChange={(e) => setProfile({ ...profile, interviewerTitle: e.target.value })}
                  placeholder="Örn: VP of Engineering, CTO, Head of Product, HRBP..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              {/* Quick Select Title Buttons */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {COMMON_INTERVIEWER_TITLES.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setProfile({ ...profile, interviewerTitle: title })}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      profile.interviewerTitle === title
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mevcut Unvanınız
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={profile.currentTitle}
                    onChange={(e) => setProfile({ ...profile, currentTitle: e.target.value })}
                    placeholder="Örn: Senior Backend Engineer"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Hedeflenen Bir Sonraki Rol *
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-blue-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={profile.targetRole}
                    onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                    placeholder="Örn: Staff Software Engineer"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Hedef Şirket / Sektör
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={profile.targetCompany}
                    onChange={(e) => setProfile({ ...profile, targetCompany: e.target.value })}
                    placeholder="Örn: FinTech / Kurumsal SaaS"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mülakat Aşaması
                </label>
                <select
                  value={profile.interviewStage}
                  onChange={(e) => setProfile({ ...profile, interviewStage: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                >
                  <option value="Teknik Liderlik & Mimari Karar Mülakatı">Teknik Liderlik & Mimari Karar</option>
                  <option value="Hiring Manager & Rol Uyumu Mülakatı">Hiring Manager & Rol Uyumu</option>
                  <option value="Üst Yönetim (Executive) & Strateji Mülakatı">Üst Yönetim (Executive) & Strateji</option>
                  <option value="İK & Kültür / Davranışsal (STAR) Mülakat">İK & Kültür / Davranışsal (STAR)</option>
                  <option value="Vaka Çalışması (Case Study) & Problem Çözme">Vaka Çalışması & Problem Çözme</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onGenerateQuestions}
              disabled={isGeneratingQuestions || !profile.interviewerTitle.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {isGeneratingQuestions ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Unvana Göre Sorular Üretiliyor...</span>
                </>
              ) : (
                <>
                  <span>Bu Unvan İçin Potansiyel Soruları Üret</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: LinkedIn URL & CV Upload/Text */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                LinkedIn Hesabı & CV Bilgileriniz
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                LinkedIn URL’nizi paylaşın ve CV’nizi yükleyin (PDF/TXT veya metin). AI koçunuz her iki kaynağı analiz ederek gelişim alanlarınızı ve alabileceğiniz eğitimleri çıkaracaktır.
              </p>
            </div>

            {/* LinkedIn URL Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                LinkedIn Profil URL’niz
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-blue-600 absolute left-3.5 top-3" />
                <input
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  placeholder="https://www.linkedin.com/in/kullanici-adiniz"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>

            {/* LinkedIn Headline / About Summary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                LinkedIn &quot;Hakkında&quot; Özeti veya Öne Çıkan Başarılarınız
              </label>
              <textarea
                rows={2}
                value={profile.linkedinSummaryText}
                onChange={(e) => setProfile({ ...profile, linkedinSummaryText: e.target.value })}
                placeholder="LinkedIn profilinizdeki Hakkında (About) metnini veya öne çıkan yetkinliklerinizi buraya yapıştırabilirsiniz..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            {/* CV File Upload + Textarea */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  CV / Özgeçmiş Dosyası (PDF, TXT) veya Deneyim Metni
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>CV Dosyası Yükle (PDF / TXT)</span>
                </button>
              </div>

              {profile.cvFileName && (
                <div className="flex items-center justify-between px-3.5 py-2 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <div className="flex items-center gap-2 truncate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium truncate">Yüklü Dosya: {profile.cvFileName}</span>
                    {profile.cvFileBase64 && (
                      <span className="text-emerald-600">· PDF Doküman Analize Hazır</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setProfile((prev) => ({
                        ...prev,
                        cvFileName: undefined,
                        cvFileBase64: undefined,
                        cvFileMimeType: undefined,
                      }))
                    }
                    className="text-xs font-medium text-emerald-700 hover:underline ml-2 shrink-0"
                  >
                    Kaldır
                  </button>
                </div>
              )}

              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  rows={5}
                  value={profile.cvText}
                  onChange={(e) => setProfile({ ...profile, cvText: e.target.value })}
                  placeholder="CV'nizdeki iş deneyimlerinizi, projelerinizi ve yetkinliklerinizi buraya yapıştırabilir veya yukarıdan doğrudan PDF/TXT dosyanızı yükleyebilirsiniz..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-sans leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              LinkedIn + CV bilgilerinizden gelişim alanları, eğitim önerileri ve mülakat soruları üretilir.
            </p>
            <button
              type="button"
              onClick={onAnalyzeProfile}
              disabled={isAnalyzingProfile}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {isAnalyzingProfile ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Profil & Kariyer Haritası Analiz Ediliyor...</span>
                </>
              ) : (
                <>
                  <span>Kariyer & Eğitim Yol Haritamı Oluştur</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
