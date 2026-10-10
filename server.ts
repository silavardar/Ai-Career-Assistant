import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

function getAiClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. Analyze LinkedIn URL + CV (Text or PDF/File Base64) -> Career & Training Roadmap
app.post("/api/profile/analyze", async (req, res) => {
  try {
    const {
      linkedinUrl,
      linkedinSummaryText,
      cvText,
      cvFileBase64,
      cvFileMimeType,
      currentTitle,
      targetRole,
      targetCompany,
      interviewerTitle,
    } = req.body;

    const ai = getAiClient();

    // Optional step: If a valid LinkedIn URL or public web URL is provided, enrich context using urlContext/googleSearch
    let enrichedUrlInsights = "";
    if (linkedinUrl && typeof linkedinUrl === "string" && linkedinUrl.trim().startsWith("http")) {
      try {
        const urlResponse = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `Bu LinkedIn profilini veya kariyer bağlantısını incele ve adayın deneyimleri, yetkinlikleri, eğitimi ve öne çıkan başarıları hakkında tüm detayları özetle: ${linkedinUrl.trim()}`,
          config: {
            tools: [{ urlContext: {} }, { googleSearch: {} }],
          },
        });
        if (urlResponse.text) {
          enrichedUrlInsights = urlResponse.text;
        }
      } catch (urlErr) {
        // Fallback gracefully if LinkedIn blocks direct scraping
        enrichedUrlInsights = `Kullanıcı tarafından paylaşılan LinkedIn URL: ${linkedinUrl}`;
      }
    }

    const parts: any[] = [];

    if (cvFileBase64 && cvFileMimeType) {
      parts.push({
        inlineData: {
          data: cvFileBase64,
          mimeType: cvFileMimeType,
        },
      });
    }

    const promptText = `
Sen üst düzey bir Kariyer Koçu ve Yönetici İşe Alım (Executive Search) uzmanısın.
Aşağıdaki adayın LinkedIn profil bilgilerini ve CV verilerini detaylıca analiz et.

ADAY BİLGİLERİ:
- Mevcut Unvan: ${currentTitle || "Belirtilmedi"}
- Hedeflenen Pozisyon / Bir Sonraki Aşama: ${targetRole || "Bir üst kariyer basamağı"}
- Hedef Şirket / Sektör: ${targetCompany || "Genel Teknoloji / Kurumsal"}
- Mülakata Girecek Kişinin Unvanı: ${interviewerTitle || "Hiring Manager"}
- LinkedIn Bağlantısı: ${linkedinUrl || "Belirtilmedi"}
- LinkedIn URL Tarama Özeti: ${enrichedUrlInsights || "Ek tarama verisi yok"}
- LinkedIn / Profil Metni: ${linkedinSummaryText || "Belirtilmedi"}
- CV Metni: ${cvText || "Ekli dosyada veya yukarıdaki profil özetinde yer almaktadır."}

GÖREVİN:
1. Adayın mevcut profilini özetle ve bir sonraki kariyer aşamasına (${targetRole || "hedef rol"}) hazır olma skorunu (0-100) hesapla.
2. Adayın şu anki güçlü yetkinliklerini (kanıtlarıyla) çıkar.
3. Bir sonraki aşamada kendini nerelerde geliştirmesi gerektiğini (Skill Gaps / Gelişim Alanları) öncelik sırasına göre belirle.
4. Adayın hangi eğitimleri, kursları veya sertifikaları alabileceğini somut olarak öner.
5. Mülakatlarda ve LinkedIn profilinde hangi yetkinliklerde ön plana çıkması gerektiğini (Spotlight Competencies & LinkedIn İyileştirmeleri) detaylandır.

Tüm yanıtları Türkçe olarak, son derece profesyonel, somut ve adayın gerçek geçmişine dayalı şekilde JSON formatında döndür.
`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            candidateSummary: {
              type: Type.STRING,
              description: "Adayın mevcut kariyer profilinin yönetici özeti.",
            },
            readinessScore: {
              type: Type.INTEGER,
              description: "Hedef pozisyona hazır olma yüzdesi (0-100).",
            },
            nextStagePositioning: {
              type: Type.STRING,
              description: "Adayın bir sonraki aşamada kendini nasıl konumlandırması gerektiğine dair stratejik tavsiye.",
            },
            currentStrengths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  competency: { type: Type.STRING },
                  level: { type: Type.INTEGER, description: "Yetkinlik seviyesi 0-100" },
                  evidence: { type: Type.STRING, description: "CV veya LinkedIn'deki somut karşılığı" },
                },
                required: ["competency", "level", "evidence"],
              },
            },
            skillGaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  priority: { type: Type.STRING, description: "Kritik, Yüksek veya Orta" },
                  currentLevel: { type: Type.INTEGER, description: "Mevcut seviye 0-100" },
                  targetLevel: { type: Type.INTEGER, description: "Hedeflenen seviye 0-100" },
                  whyNeeded: { type: Type.STRING, description: "Bu yetkinliğin hedef rol için neden kritik olduğu" },
                  actionStep: { type: Type.STRING, description: "Geliştirmek için atılması gereken somut adım" },
                },
                required: ["skill", "priority", "currentLevel", "targetLevel", "whyNeeded", "actionStep"],
              },
            },
            recommendedTrainings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Eğitim, sertifika veya uzmanlık programı adı" },
                  providerOrType: { type: Type.STRING, description: "Coursera, AWS, PMI, edX, Kitap/Uygulamalı Proje vb." },
                  focusArea: { type: Type.STRING, description: "Kazanılacak temel yetkinlik" },
                  durationEstimate: { type: Type.STRING, description: "Tahmini tamamlanma süresi (ör. 4 Hafta)" },
                  expectedImpact: { type: Type.STRING, description: "Mülakatta ve kariyerde sağlayacağı somut avantaj" },
                },
                required: ["title", "providerOrType", "focusArea", "durationEstimate", "expectedImpact"],
              },
            },
            spotlightCompetencies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  competency: { type: Type.STRING, description: "Ön plana çıkarılması gereken yetkinlik" },
                  howToHighlightInInterview: { type: Type.STRING, description: "Mülakatta bu yetkinliği nasıl anlatmalı" },
                  linkedinOptimizationTip: { type: Type.STRING, description: "LinkedIn profilinde bu yetkinliği öne çıkarmak için somut öneri" },
                },
                required: ["competency", "howToHighlightInInterview", "linkedinOptimizationTip"],
              },
            },
          },
          required: [
            "candidateSummary",
            "readinessScore",
            "nextStagePositioning",
            "currentStrengths",
            "skillGaps",
            "recommendedTrainings",
            "spotlightCompetencies",
          ],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/profile/analyze:", error);
    res.status(500).json({
      error: error?.message || "Profil ve kariyer analizi yapılırken bir hata oluştu.",
    });
  }
});

// 2. Generate Potential Questions Based on Interviewer's Title
app.post("/api/questions/generate", async (req, res) => {
  try {
    const {
      interviewerTitle,
      targetRole,
      targetCompany,
      interviewStage,
      candidateSummary,
      cvText,
      linkedinSummaryText,
    } = req.body;

    const ai = getAiClient();

    const prompt = `
Sen deneyimli bir Mülakat Stratejistisin.
Aday bir mülakata girecek ve mülakata katılacak kişinin unvanı (title): "${interviewerTitle}".

BAĞLAM BİLGİLERİ:
- Mülakatçının Unvanı (Title): ${interviewerTitle}
- Adayın Başvurduğu / Hedeflediği Pozisyon: ${targetRole || "Belirtilmedi"}
- Hedef Şirket / Sektör: ${targetCompany || "Belirtilmedi"}
- Mülakat Aşaması / Türü: ${interviewStage || "Kapsamlı Değerlendirme"}
- Adayın Özeti ve Geçmişi: ${candidateSummary || ""} ${linkedinSummaryText || ""} ${cvText ? cvText.slice(0, 3000) : ""}

GÖREVİN:
1. "${interviewerTitle}" unvanına sahip bir kişinin mülakat masasındaki bakış açısını, önceliklerini, neyi ölçmek istediğini ve kırmızı çizgilerini analiz et.
2. Bu unvandaki kişinin adaya potansiyel olarak sorabileceği en kritik 6 soruyu üret.
3. Her soru için:
   - Sorunun kategorisini (Stratejik & Liderlik, Teknik Derinlik, Davranışsal / Kültür, Problem Çözme & Kriz Yönetimi)
   - Bu unvandaki kişinin bu soruyu sorarken asıl ölçmek istediği gizli beklentiyi (hiddenIntent)
   - Adayın kendi LinkedIn/CV geçmişine göre yanıtında neleri vurgulaması gerektiğini (tailoredCandidateTip)
   - Güçlü bir STAR (Situation, Task, Action, Result) yanıt çerçevesini (sampleStarOutline)
   detaylandır.

Yanıtı Türkçe olarak JSON şemasına uygun şekilde döndür.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interviewerPersona: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                mindsetSummary: {
                  type: Type.STRING,
                  description: "Bu unvandaki kişinin mülakata bakış açısı ve karar verme kriterleri",
                },
                primaryPriorities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "En çok önem verdiği 3-4 temel kriter",
                },
                redFlagsToAvoid: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Bu unvandaki bir mülakatçı karşısında kaçınılması gereken hatalar",
                },
              },
              required: ["title", "mindsetSummary", "primaryPriorities", "redFlagsToAvoid"],
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING, description: "Mülakatçının soracağı potansiyel soru" },
                  category: { type: Type.STRING, description: "Teknik Derinlik, Davranışsal, Stratejik Vizyon veya Liderlik" },
                  difficulty: { type: Type.STRING, description: "Zorlayıcı, Orta veya Kritik Eleme Sorusu" },
                  hiddenIntent: {
                    type: Type.STRING,
                    description: "Bu unvandaki kişinin bu soruyla gerçekte neyi test ettiği",
                  },
                  tailoredCandidateTip: {
                    type: Type.STRING,
                    description: "Adayın kendi CV/LinkedIn deneyiminden hangi noktayı öne çıkarması gerektiği",
                  },
                  sampleStarOutline: {
                    type: Type.STRING,
                    description: "STAR tekniğine uygun örnek cevap kurgusu",
                  },
                },
                required: [
                  "id",
                  "question",
                  "category",
                  "difficulty",
                  "hiddenIntent",
                  "tailoredCandidateTip",
                  "sampleStarOutline",
                ],
              },
            },
          },
          required: ["interviewerPersona", "questions"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/questions/generate:", error);
    res.status(500).json({
      error: error?.message || "Mülakatçı unvanına göre sorular üretilirken bir hata oluştu.",
    });
  }
});

// 3. Interactive Mock Interview Turn (Evaluates user's answer & asks next question)
app.post("/api/interview/turn", async (req, res) => {
  try {
    const {
      interviewerTitle,
      targetRole,
      targetCompany,
      candidateSummary,
      history,
      currentQuestion,
      userAnswer,
      nextPlannedQuestion,
      questionIndex,
      totalQuestions,
    } = req.body;

    const ai = getAiClient();

    const formattedHistory = Array.isArray(history)
      ? history
          .map((h: any) => `${h.role === "interviewer" ? `Mülakatçı (${interviewerTitle})` : "Aday"}: ${h.content}`)
          .join("\n")
      : "";

    const prompt = `
Sen "${targetCompany || "Kurumsal Teknoloji Şirketi"}" bünyesinde görev yapan bir "${interviewerTitle}" unvanlı yöneticisin.
Şu anda "${targetRole || "Hedef Pozisyon"}" pozisyonu için adayla birebir mülakat simülasyonu yapıyorsun.

ADAY ÖZETİ:
${candidateSummary || "Deneyimli profesyonel aday."}

ÖNCEKİ DİYALOG GEÇMİŞİ:
${formattedHistory}

SON SORULAN SORU:
"${currentQuestion}"

ADAYIN VERDİĞİ YANIT:
"${userAnswer}"

DURUM:
Şu an ${questionIndex + 1} / ${totalQuestions} sorudasınız.
${
  nextPlannedQuestion
    ? `Sıradaki planlanan soru önerisi: "${nextPlannedQuestion}". (Eğer adayın yanıtı çok yüzeysel kaldıysa kısa bir takip sorusu sorabilir veya doğrudan bu soruya doğal bir geçiş yapabilirsin.)`
    : "Bu son soruydu. Adaya yanıtı için teşekkür edip mülakatı profesyonelce sonlandıran bir kapanış mesajı ver."
}

GÖREVİN:
1. Adayın son yanıtını STAR tekniği (Situation, Task, Action, Result), İletişim Netliği ve Teknik Derinlik açısından puanla (0-100).
2. Adaya bu yanıtı için anlık, yapıcı bir koçluk notu (instantCoachingFeedback) ve eksik kalan STAR bileşenlerini (missingStarElements) yaz.
3. Mülakatçı ("${interviewerTitle}") rolünde kalarak adaya kısa, gerçekçi bir tepki ver ve sıradaki soruyu yönelt (interviewerReply).

Yanıtı Türkçe olarak JSON formatında döndür.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interviewerReply: {
              type: Type.STRING,
              description: "Mülakatçının adaya verdiği doğal yanıt ve sıradaki sorusu",
            },
            turnEvaluation: {
              type: Type.OBJECT,
              properties: {
                starScore: { type: Type.INTEGER, description: "STAR tekniği skoru (0-100)" },
                clarityScore: { type: Type.INTEGER, description: "İletişim netliği skoru (0-100)" },
                technicalDepthScore: { type: Type.INTEGER, description: "Teknik/Alan derinliği skoru (0-100)" },
                detectedStarComponents: {
                  type: Type.OBJECT,
                  properties: {
                    situation: { type: Type.BOOLEAN },
                    task: { type: Type.BOOLEAN },
                    action: { type: Type.BOOLEAN },
                    result: { type: Type.BOOLEAN },
                  },
                  required: ["situation", "task", "action", "result"],
                },
                instantCoachingFeedback: {
                  type: Type.STRING,
                  description: "Bu cevabın nasıl daha güçlü verilebileceğine dair 1-2 cümlelik net koçluk geri bildirimi",
                },
                strongestPoint: { type: Type.STRING, description: "Yanıttaki en güçlü nokta" },
                improvementArea: { type: Type.STRING, description: "Yanıtta eksik kalan veya geliştirilmesi gereken kısım" },
              },
              required: [
                "starScore",
                "clarityScore",
                "technicalDepthScore",
                "detectedStarComponents",
                "instantCoachingFeedback",
                "strongestPoint",
                "improvementArea",
              ],
            },
          },
          required: ["interviewerReply", "turnEvaluation"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/interview/turn:", error);
    res.status(500).json({
      error: error?.message || "Mülakat simülasyonu yanıtı işlenirken hata oluştu.",
    });
  }
});

// 4. Full End-of-Interview Performance Analysis Report
app.post("/api/interview/evaluate", async (req, res) => {
  try {
    const {
      interviewerTitle,
      targetRole,
      targetCompany,
      candidateSummary,
      qaPairs,
    } = req.body;

    const ai = getAiClient();

    const transcript = Array.isArray(qaPairs)
      ? qaPairs
          .map(
            (item: any, idx: number) =>
              `Soru ${idx + 1}: ${item.question}\nAdayın Yanıtı (${item.mode === "voice" ? "Sesli Yanıt" : "Yazılı Yanıt"}): ${item.answer}`
          )
          .join("\n\n---\n\n")
      : "";

    const prompt = `
Sen kıdemli bir Mülakat Değerlendirme Uzmanı ve Yönetici Koçusun.
Adayın "${interviewerTitle}" unvanlı mülakatçı ile "${targetRole}" pozisyonu (${targetCompany || "Hedef Şirket"}) için gerçekleştirdiği mülakat simülasyonunun tamamını detaylıca analiz et.

ADAY PROFİL ÖZETİ:
${candidateSummary || "Belirtilmedi"}

MÜLAKAT SORU VE CEVAP KAYDI:
${transcript}

GÖREVİN:
1. Adayın genel mülakat başarısını (overallScore: 0-100), STAR Tekniği Uyumunu (starMethodologyScore: 0-100), İletişim Netliğini (communicationClarityScore: 0-100) ve Teknik/Fonksiyonel Derinliğini (technicalDepthScore: 0-100) puanla.
2. STAR bileşenlerinin her birini (Situation, Task, Action, Result) 0-100 arasında ayrı ayrı puanla ve adayın her bileşende nasıl performans gösterdiğini açıkla.
3. "${interviewerTitle}" gözünden adayın işe alım kararını (hiringRecommendation: ör. "Güçlü Aday - İkinci Aşamaya Geçmeli" veya "Koşullu Olumlu - Somut Metrikler Güçlendirilmeli") ve yönetici özetini yaz.
4. Sorulan her soru için adayın verdiği cevabı analiz et; neden o puanı aldığını ve aynı soruya STAR tekniği ve yüksek teknik derinlikle nasıl "Üst Düzey İdeal Yanıt" (idealRefinedAnswer) verilebileceğini kelimesi kelimesine yaz.
5. Mülakat sonrası için 3-4 maddelik somut gelişim aksiyon planı oluştur.

Tüm çıktıyı Türkçe olarak aşağıdaki JSON şemasına uygun döndür.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            starMethodologyScore: { type: Type.INTEGER },
            communicationClarityScore: { type: Type.INTEGER },
            technicalDepthScore: { type: Type.INTEGER },
            hiringRecommendation: { type: Type.STRING },
            executiveSummary: { type: Type.STRING },
            starBreakdown: {
              type: Type.OBJECT,
              properties: {
                situationScore: { type: Type.INTEGER },
                situationFeedback: { type: Type.STRING },
                taskScore: { type: Type.INTEGER },
                taskFeedback: { type: Type.STRING },
                actionScore: { type: Type.INTEGER },
                actionFeedback: { type: Type.STRING },
                resultScore: { type: Type.INTEGER },
                resultFeedback: { type: Type.STRING },
              },
              required: [
                "situationScore",
                "situationFeedback",
                "taskScore",
                "taskFeedback",
                "actionScore",
                "actionFeedback",
                "resultScore",
                "resultFeedback",
              ],
            },
            keyStrengthsDemonstrated: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            criticalImprovementAreas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            questionEvaluations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  userAnswer: { type: Type.STRING },
                  starScore: { type: Type.INTEGER },
                  clarityScore: { type: Type.INTEGER },
                  technicalDepthScore: { type: Type.INTEGER },
                  critique: { type: Type.STRING, description: "Yanıtın detaylı analizi ve eksikleri" },
                  idealRefinedAnswer: {
                    type: Type.STRING,
                    description: "Adayın deneyimine sadık kalarak STAR formatında yeniden yazılmış ideal üst düzey yanıt",
                  },
                },
                required: [
                  "question",
                  "userAnswer",
                  "starScore",
                  "clarityScore",
                  "technicalDepthScore",
                  "critique",
                  "idealRefinedAnswer",
                ],
              },
            },
            nextActionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            "overallScore",
            "starMethodologyScore",
            "communicationClarityScore",
            "technicalDepthScore",
            "hiringRecommendation",
            "executiveSummary",
            "starBreakdown",
            "keyStrengthsDemonstrated",
            "criticalImprovementAreas",
            "questionEvaluations",
            "nextActionPlan",
          ],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/interview/evaluate:", error);
    res.status(500).json({
      error: error?.message || "Performans analizi oluşturulurken bir hata meydana geldi.",
    });
  }
});

// 5. Audio Transcription (Voice Interview Answer -> Text via gemini-3.5-transcribe)
app.post("/api/audio/transcribe", async (req, res) => {
  try {
    const { audioBase64, mimeType } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: "Ses verisi bulunamadı." });
    }

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-transcribe",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || "audio/webm",
              data: audioBase64,
            },
          },
          {
            text: "Bu ses kaydındaki mülakat yanıtını kelimesi kelimesine, noktalama işaretlerine dikkat ederek Türkçe olarak metne dönüştür. Sadece konuşulan metni döndür.",
          },
        ],
      },
    });

    res.json({ transcript: (response.text || "").trim() });
  } catch (error: any) {
    console.error("Error in /api/audio/transcribe:", error);
    res.status(500).json({
      error: error?.message || "Ses kaydı metne dönüştürülürken bir hata oluştu.",
    });
  }
});

// 6. Text-to-Speech (Interviewer Speaks Question via gemini-3.8-flash-lite-tts)
app.post("/api/audio/tts", async (req, res) => {
  try {
    const { text, voiceName } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Seslendirilecek metin bulunamadı." });
    }

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-lite-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: text,
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voiceName || "Kore",
            },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: "Ses çıktısı üretilemedi." });
    }

    res.json({ audioBase64: base64Audio, mimeType: "audio/wav" });
  } catch (error: any) {
    console.error("Error in /api/audio/tts:", error);
    res.status(500).json({
      error: error?.message || "Seslendirme sırasında bir hata oluştu.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
