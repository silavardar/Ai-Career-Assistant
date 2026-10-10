import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Send,
  Volume2,
  VolumeX,
  RefreshCw,
  CheckCircle2,
  BarChart3,
  MessageSquare,
  RotateCcw,
} from 'lucide-react';
import {
  CandidateProfile,
  InterviewQuestionItem,
  ChatTurn,
  TurnEvaluation,
} from '../types';

interface InterviewSimulatorViewProps {
  profile: CandidateProfile;
  questions: InterviewQuestionItem[];
  turns: ChatTurn[];
  currentQuestionIndex: number;
  isProcessingTurn: boolean;
  isEvaluatingReport: boolean;
  autoSpeakEnabled: boolean;
  setAutoSpeakEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onSendAnswer: (answerText: string, mode: 'text' | 'voice') => void;
  onFinishAndEvaluate: () => void;
  onResetSimulation: () => void;
  onSpeakText: (text: string) => void;
  isSpeaking: boolean;
}

export const InterviewSimulatorView: React.FC<InterviewSimulatorViewProps> = ({
  profile,
  questions,
  turns,
  currentQuestionIndex,
  isProcessingTurn,
  isEvaluatingReport,
  autoSpeakEnabled,
  setAutoSpeakEnabled,
  onSendAnswer,
  onFinishAndEvaluate,
  onResetSimulation,
  onSpeakText,
  isSpeaking,
}) => {
  const [simulationMode, setSimulationMode] = useState<'text' | 'voice'>('text');
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isProcessingTurn]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    setTranscriptionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }

        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });

        if (audioBlob.size < 200) return;

        setIsTranscribing(true);
        try {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const resultStr = typeof reader.result === 'string' ? reader.result : '';
            const base64Audio = resultStr.includes(',') ? resultStr.split(',')[1] : resultStr;

            const response = await fetch('/api/audio/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audioBase64: base64Audio,
                mimeType: recorder.mimeType || 'audio/webm',
              }),
            });

            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || 'Ses metne dönüştürülemedi.');
            }

            if (data.transcript) {
              setInputText((prev) => (prev ? `${prev} ${data.transcript}` : data.transcript));
            }
            setIsTranscribing(false);
          };
          reader.readAsDataURL(audioBlob);
        } catch (err: any) {
          setTranscriptionError(err.message || 'Ses çözümlenirken hata oluştu.');
          setIsTranscribing(false);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } catch (err: any) {
      setTranscriptionError(
        'Mikrofon erişimi sağlanamadı. Lütfen tarayıcı mikrofon iznini kontrol edin veya yazılı modu kullanın.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessingTurn) return;
    onSendAnswer(inputText.trim(), simulationMode);
    setInputText('');
  };

  const candidateTurnsWithEval = turns.filter(
    (t) => t.role === 'candidate' && t.evaluation
  );
  const latestEvaluation: TurnEvaluation | undefined =
    candidateTurnsWithEval[candidateTurnsWithEval.length - 1]?.evaluation;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Mülakatçı Unvanı: <strong className="text-slate-800">{profile.interviewerTitle}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Hedef Rol: {profile.targetRole}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">
              Soru {Math.min(currentQuestionIndex + 1, questions.length)} / {questions.length}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            04. Canlı Mülakat Simülasyonu (Yazılı & Sesli Stüdyo)
          </h1>
        </div>

        {/* Segmented Control for Written vs Voice + Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
            <button
              type="button"
              onClick={() => setSimulationMode('text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                simulationMode === 'text'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Yazılı Sohbet Modu</span>
            </button>
            <button
              type="button"
              onClick={() => setSimulationMode('voice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                simulationMode === 'voice'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Sesli Mülakat Modu</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setAutoSpeakEnabled(!autoSpeakEnabled)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              autoSpeakEnabled
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {autoSpeakEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Mülakatçı Sesi: Açık</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Mülakatçı Sesi: Kapalı</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onResetSimulation}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Baştan Başlat</span>
          </button>

          <button
            type="button"
            onClick={onFinishAndEvaluate}
            disabled={isEvaluatingReport || candidateTurnsWithEval.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {isEvaluatingReport ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Rapor Hazırlanıyor...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Mülakatı Bitir & Detaylı Analizi Gör</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split: Left 7 Cols Chat/Voice Studio, Right 5 Cols Live STAR Coach */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interview Dialogue & Input Area */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl flex flex-col justify-between h-[640px]">
          {/* Messages Scroll Viewport */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {turns.map((turn) => {
              const isInterviewer = turn.role === 'interviewer';
              return (
                <div
                  key={turn.id}
                  className={`flex flex-col ${
                    isInterviewer ? 'items-start' : 'items-end'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 px-1">
                    <span className="font-medium text-slate-600">
                      {isInterviewer ? `Mülakatçı (${profile.interviewerTitle})` : 'Siz (Aday)'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{turn.timestamp}</span>
                    {turn.mode === 'voice' && !isInterviewer && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-600">Sesli Yanıt</span>
                      </>
                    )}
                    {isInterviewer && (
                      <button
                        type="button"
                        onClick={() => onSpeakText(turn.content)}
                        disabled={isSpeaking}
                        className="text-slate-400 hover:text-blue-600 transition-colors ml-1"
                        title="Soruyu Sesli Dinle"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div
                    className={`max-w-[88%] rounded-xl p-4 text-sm leading-relaxed ${
                      isInterviewer
                        ? 'bg-slate-100 text-slate-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {turn.content}
                  </div>

                  {/* Mini inline score summary under candidate turn */}
                  {!isInterviewer && turn.evaluation && (
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500 px-1 font-mono-tabular">
                      <span>STAR: %{turn.evaluation.starScore}</span>
                      <span aria-hidden="true">·</span>
                      <span>Netlik: %{turn.evaluation.clarityScore}</span>
                      <span aria-hidden="true">·</span>
                      <span>Teknik Derinlik: %{turn.evaluation.technicalDepthScore}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {isProcessingTurn && (
              <div className="flex items-center gap-2.5 text-xs text-slate-500 p-3 bg-slate-50 rounded-lg w-fit">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span>
                  {profile.interviewerTitle} yanıtınızı STAR ve teknik derinlik açısından değerlendiriyor...
                </span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Composer (Supports both Voice Recording & Written Input) */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-3">
            {transcriptionError && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                {transcriptionError}
              </div>
            )}

            {simulationMode === 'voice' && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  {isRecording ? (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Kaydı Durdur ({formatTime(recordingSeconds)})</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startRecording}
                      disabled={isTranscribing || isProcessingTurn}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Mikrofonla Cevap Kaydet</span>
                    </button>
                  )}

                  <span className="text-xs text-slate-600">
                    {isRecording
                      ? 'Konuşmanız kaydediliyor... Bitince kaydı durdurun.'
                      : isTranscribing
                      ? 'Ses kaydınız Gemini 3.5 Transcribe ile metne dökülüyor...'
                      : 'Soruyu sesli yanıtlayın; metne çevrilip anında düzenlenebilir.'}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  simulationMode === 'voice'
                    ? 'Sesli yanıtınızın metni burada belirecek (dilerseniz klavyeden düzenleyip gönderebilirsiniz)...'
                    : 'Yanıtınızı STAR tekniğine (Durum, Görev, Aksiyon, Sonuç) dikkat ederek buraya yazın...'
                }
                className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isProcessingTurn || isTranscribing}
                className="px-5 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Yanıtı Gönder</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Real-Time STAR & Technical Depth Coaching Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Anlık STAR, İletişim Netliği & Teknik Derinlik Analizi
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Her yanıtınızdan sonra mülakat koçunuz cevabınızın yapısını canlı olarak puanlar.
              </p>
            </div>

            {!latestEvaluation ? (
              <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-xl space-y-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  STAR Tekniği Kontrol Listesi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  İlk yanıtınızı gönderdiğinizde bu panelde <strong>STAR Tekniği</strong>, <strong>İletişim Netliği</strong> ve <strong>Teknik Derinlik</strong> skorlarınız anlık olarak belirecektir.
                </p>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-900">S — Situation (Durum):</strong> Olayın geçtiği proje, ölçek ve bağlam neydi?
                  </div>
                  <div>
                    <strong className="text-slate-900">T — Task (Görev):</strong> Sizin çözmeniz gereken spesifik darboğaz veya hedef neydi?
                  </div>
                  <div>
                    <strong className="text-slate-900">A — Action (Aksiyon):</strong> Ekip olarak değil, bizzat <em>siz</em> hangi teknik/stratejik adımları attınız?
                  </div>
                  <div>
                    <strong className="text-slate-900">R — Result (Sonuç):</strong> Aksiyonunuzun ölçülebilir (%, $, süre) çıktısı ne oldu?
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* 3 Live Metric Bars */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-xs text-slate-500 block">STAR Uyumu</span>
                    <span className="text-xl font-bold font-mono-tabular text-slate-900 mt-1 block">
                      %{latestEvaluation.starScore}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-xs text-slate-500 block">İletişim Netliği</span>
                    <span className="text-xl font-bold font-mono-tabular text-blue-600 mt-1 block">
                      %{latestEvaluation.clarityScore}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-xs text-slate-500 block">Teknik Derinlik</span>
                    <span className="text-xl font-bold font-mono-tabular text-emerald-600 mt-1 block">
                      %{latestEvaluation.technicalDepthScore}
                    </span>
                  </div>
                </div>

                {/* Detected STAR Components Checklist */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                  <span className="text-xs font-semibold text-slate-800 block">
                    Son Yanıtınızda Tespit Edilen STAR Bileşenleri
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { key: 'situation', label: 'Situation (Durum)' },
                      { key: 'task', label: 'Task (Görev)' },
                      { key: 'action', label: 'Action (Aksiyon)' },
                      { key: 'result', label: 'Result (Ölçülebilir Sonuç)' },
                    ].map((item) => {
                      const present =
                        latestEvaluation.detectedStarComponents[
                          item.key as keyof typeof latestEvaluation.detectedStarComponents
                        ];
                      return (
                        <div
                          key={item.key}
                          className={`flex items-center gap-2 p-2 rounded border ${
                            present
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : 'bg-amber-50/70 border-amber-200 text-amber-900'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              present ? 'text-emerald-600' : 'text-amber-500'
                            }`}
                          />
                          <span className="font-medium">
                            {item.label}: {present ? 'Mevcut' : 'Eksik'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Instant Coaching Note */}
                <div className="space-y-3">
                  <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-lg space-y-1">
                    <span className="text-xs font-semibold text-blue-900 block">
                      Anlık Koçluk Geri Bildirimi
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {latestEvaluation.instantCoachingFeedback}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-xs font-semibold text-emerald-700 block mb-1">
                        Güçlü Nokta
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {latestEvaluation.strongestPoint}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-xs font-semibold text-amber-700 block mb-1">
                        Geliştirilmesi Gereken
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {latestEvaluation.improvementArea}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Tamamlanan Yanıt: <strong className="font-mono-tabular text-slate-800">{candidateTurnsWithEval.length}</strong></span>
            <span>İstediğiniz an &quot;Mülakatı Bitir&quot; ile tam karne alabilirsiniz.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
