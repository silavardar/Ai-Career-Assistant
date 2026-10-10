# Vantage: AI Mülakat ve Kariyer Koçu Asistanı

**Vantage**, mülakata gireceğiniz kişinin unvanına (title) göre gelebilecek stratejik soruları üreten, LinkedIn profiliniz ve CV'niz üzerinden bir sonraki kariyer adımınız için eksik yetkinlik ve eğitim yol haritası çıkaran ve hem yazılı hem sesli gerçekçi mülakat simülasyonu yaparak STAR tekniği, iletişim netliği ve teknik derinlik odaklı detaylı performans analizi sunan kapsamlı bir kariyer koçluğu platformudur.

### Kullanıcı İncelemesi ve Onaylanan Kararlar

> [!IMPORTANT]
> İlk aşamada verdiğiniz yanıtlara göre aşağıdaki temel ürün kararları netleştirilmiştir. Planı inceleyip onayladığınızda doğrudan geliştirmeye başlayacağız.

- **Onaylanan Karar 1 (Simülasyon Formatı)**: Hem **yazılı sohbet** hem de **sesli mülakat** (mikrofon ile sesli yanıt verme ve mülakatçının sorularını sesli dinleme) seçenekleri bir arada sunulacak.
- **Onaylanan Karar 2 (Profil ve Veri Girişi)**: Hem **LinkedIn URL / profil özeti** girişi hem de **CV / LinkedIn PDF dosyası yükleme** (veya metin yapıştırma) desteği bir arada yer alacak; ayrıca hedef pozisyon ve mülakatçının unvanı (ör. *VP of Engineering*, *Senior Talent Acquisition*, *Product Director*) tanımlanabilecek.
- **Onaylanan Karar 3 (Performans Raporu ve Değerlendirme)**: Simülasyon sonunda ve her yanıt sonrasında **STAR tekniği uyumu (Situation, Task, Action, Result)**, **İletişim Netliği** ve **Teknik Derinlik** kırılımlarında puanlama, güçlü/zayıf yön analizi ve ideal örnek yanıt karşılaştırması sunulacak.

---

### 1. Genel Bakış ve Temel Değer Önerisi

- **Ne Yapar?**:
  1. **Profil & Kariyer Analizi (LinkedIn + CV)**: Kullanıcının paylaştığı LinkedIn URL'sini (`urlContext` ve `googleSearch` destekli) ve yüklediği CV dosyasını/metnini analiz ederek mevcut yetkinlik haritasını çıkarır. Bir sonraki kariyer basamağında öne çıkması gereken yetkinlikleri, gelişime açık alanları ve alabileceği somut eğitim/sertifika önerilerini listeler.
  2. **Mülakatçı Unvanına Göre Soru Üretici**: Mülakata katılacak kişinin unvanı (ör. *CTO*, *Engineering Manager*, *HR Business Partner*), şirketi ve hedef rol girildiğinde, o unvandaki bir karar vericinin bakış açısını, önceliklerini ve potansiyel olarak sorabileceği soruları (neden sorduğu ve nasıl cevaplanması gerektiği ipuçlarıyla) üretir.
  3. **Çift Modlu Mülakat Simülasyonu (Yazılı + Sesli)**: Seçilen mülakatçı personası ile gerçekçi bir mülakat oturumu başlatır. Kullanıcı ister klavyeden yazarak, ister mikrofonuyla konuşarak (`gemini-3.5-transcribe` ile ses-metin dönüşümü ve `gemini-3.8-flash-lite-tts` ile mülakatçının sesli konuşması) mülakat deneyimi yaşar.
  4. **STAR & Performans Analiz Raporu**: Mülakat tamamlandığında (veya soru bazlı anlık geri bildirimde) adayın performansını STAR metodolojisi, iletişim netliği, teknik derinlik ve unvan beklentilerine uygunluk açısından puanlar; her soruya verilen yanıtı nasıl daha üst düzeye taşıyabileceğini somut revizyonlarla gösterir.
- **Hedef Kitle**: Yeni bir pozisyona hazırlanan, terfi hedefleyen veya mülakatlarda farklı seviyedeki yöneticilerin (*Hiring Manager*, *Technical Lead*, *Executive*) beklentilerine göre nokta atışı hazırlık yapmak isteyen profesyoneller.

---

### 2. Kullanıcı Deneyimi ve Görsel Tasarım

- **Temel Kullanıcı Akışları**:
  1. **Adım 1 — Profil & Hedef Kurulumu (Kariyer Stüdyosu)**: Kullanıcı sol panelden veya başlangıç ekranından LinkedIn URL'sini girer, CV dosyasını (PDF/TXT/DOCX veya doğrudan metin) yükler ve hedeflediği pozisyonu seçer. Ayrıca hızlı test için örnek profiller tek tıkla yüklenebilir.
  2. **Adım 2 — Kariyer Yol Haritası & Eğitim Önerileri**: Sistem LinkedIn ve CV verilerini sentezleyerek mevcut güçlü yönleri, hedef rol için kapatılması gereken yetkinlik boşluklarını (Skill Gaps), alınması gereken eğitim/sertifika tavsiyelerini ve LinkedIn profilinde öne çıkarılması gereken anahtar kelimeleri görselleştirir.
  3. **Adım 3 — Mülakatçı Unvanına Göre Stratejik Soru Bankası**: Kullanıcı mülakata gireceği kişinin unvanını (ör. *Head of Product*, *Staff Software Engineer*, *People & Culture Lead*) ve mülakat aşamasını seçer. Sistem o unvanın odaklandığı kriterlere göre özelleştirilmiş soruları, "Bu sorunun altındaki gizli beklenti nedir?" analizini ve adayın kendi CV'sinden hangi deneyimi örnek vermesi gerektiğini listeler.
  4. **Adım 4 — Canlı Mülakat Simülasyonu (Yazılı & Sesli)**: Seçilen unvandaki mülakatçı ile birebir simülasyon başlar. Kullanıcı üst barda "Yazılı Mod" ve "Sesli Stüdyo Modu" arasında anında geçiş yapabilir. Sesli modda mülakatçı soruyu doğal bir sesle okur, kullanıcı mikrofonla yanıt verir ve konuşması anında metne dökülerek analiz edilir.
  5. **Adım 5 — Detaylı Performans Karnesi**: Simülasyon bitiminde genel hazırlık skoru, STAR bileşenleri analizi (*Situation, Task, Action, Result* eksikleri), İletişim Netliği skoru, Teknik Derinlik skoru ve soru bazlı "Senin Cevabın vs. Önerilen Üst Düzey Cevap" karşılaştırma tablosu sunulur.

- **Görsel Kimlik ve Tema**:
  - *Estetik Yönelim*: Kurumsal SaaS ve Yönetici Koçluğu (Executive Editorial Workspace) estetiği. Dikkat dağıtmayan, yüksek okunabilirliğe sahip, güven veren modern çalışma alanı.
  - *Renk Paleti (60-30-10 Kuralı)*:
    - `%60 Ana Tuval`: Ferah kırık beyaz / taş grisi (`#F8FAFC` / `slate-50`) ve derin koyu çalışma yüzeyleri (`#0F172A` / `slate-900`).
    - `%30 Yapısal Yüzeyler`: İnce `1px` sınır çizgileri (`border-slate-200`), net kart yüzeyleri (`#FFFFFF`) ve ikincil metin tonları (`#475569`).
    - `%10 Vurgu Bütçesi`: Güven veren derin çivit/kobalt mavisi (`#2563EB`) birincil aksiyonlar için; semantik durum renkleri olarak Zümrüt Yeşili (`#16A34A` - güçlü yetkinlik / yüksek STAR uyumu), Kehribar (`#D97706` - geliştirilmesi gereken alan) ve Kırmızı (`#DC2626` - kritik eksik / ses kaydı aktif).
  - *Tipografi ve Hiyerarşi*:
    - Başlık ve Navigasyon: `Plus Jakarta Sans` (keskin, modern yönetici tonu).
    - Gövde ve Mülakat Diyalogları: `DM Sans` (uzun metinlerde ve soru-cevap akışında yüksek okunabilirlik).
    - Metrikler, Puanlar ve Zamanlayıcılar: `JetBrains Mono` (`tabular-nums` ile hizalanmış sayısal veriler ve süre göstergeleri).
  - *Bileşen Düzeni*: 1440px masaüstü genişliğinde sol sabit navigasyon (`260px`) + üst bağlamsal başlık çubuğu + tek seviyeli kart derinliğine sahip çalışma alanı. Statik etiketlerde kalabalık rozetler yerine yalın tipografik ayırıcılar (`·`) kullanılır.

---

### 3. Temel Ürün Kararları ve Teknik Yaklaşım

- **Karar 1: LinkedIn URL ve CV Birleşik Analiz Motoru**
  - *Seçilen Yaklaşım*: Kullanıcının girdiği LinkedIn URL'sini sunucu tarafında Gemini `urlContext` ve `googleSearch` araçlarıyla zenginleştirirken, aynı zamanda PDF/metin tabanlı CV yüklemesini (`inlineData` PDF/doküman desteği veya metin ayrıştırma) birleştirerek tek bir birleşik "Aday Profili" oluşturmak.
  - *Neden*: LinkedIn profilleri bazen gizlilik ayarları nedeniyle sınırlı bilgi dönebilir; CV yükleme ve profil metni/URL desteğini birleştirmek her koşulda %100 eksiksiz ve kişiselleştirilmiş kariyer analizi sağlar.
- **Karar 2: Hibrit Sesli ve Yazılı Mülakat Mimarisi**
  - *Seçilen Yaklaşım*: Simülasyon ekranında kullanıcıya hem yazılı mesajlaşma hem de mikrofon ile sesli yanıt (`MediaRecorder` -> `/api/audio/transcribe` üzerinde `gemini-3.5-transcribe`) ve mülakatçının cevabını sesli dinleme (`/api/audio/tts` üzerinde `gemini-3.8-flash-lite-tts`) imkanı sunmak.
  - *Neden*: Kullanıcı ister sessiz bir ortamda yazılı pratik yapabilir, ister gerçek mülakat heyecanını yaşamak için sesli konuşarak pratik yapabilir ve kendi konuşma akıcılığını test edebilir.
- **Karar 3: Yapılandırılmış JSON Şeması ile STAR ve Yetkinlik Puanlaması**
  - *Seçilen Yaklaşım*: Kariyer yol haritası, mülakatçı soruları ve simülasyon sonu analiz raporları için Gemini `responseSchema` (Structured Outputs) kullanarak deterministik, tutarlı puanlama ve kategori kırılımları üretmek.
  - *Neden*: Serbest metin yerine doğrudan STAR bileşenlerini (`Situation`, `Task`, `Action`, `Result` yüzdeleri), `İletişim Netliği` ve `Teknik Derinlik` metriklerini görsel grafiklere ve karşılaştırma tablolarına hatasız bağlamayı sağlar.

---

### 4. Teknik Mimari ve Veri Akışı

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        İSTEMCİ (React 19 + Tailwind)                       │
├──────────────────────┬─────────────────────────────────────────────────────┤
│   Sol Kenar Çubuğu   │                 Ana Çalışma Alanı                   │
│  (Workspace Nav)     │                                                     │
│                      │  ┌───────────────────────────────────────────────┐  │
│  1. Profil & CV      │  │ 1. Profil & Hedef Kurulumu                    │  │
│  2. Kariyer Haritası │  │    LinkedIn URL + CV Yükleme + Hedef Unvan    │  │
│  3. Soru Üretici     │  ├───────────────────────────────────────────────┤  │
│  4. Mülakat Stüdyosu │  │ 2. Kariyer & Eğitim Yol Haritası              │  │
│  5. Performans Raporu│  │    Yetkinlik Boşlukları · Önerilen Eğitimler  │  │
│                      │  ├───────────────────────────────────────────────┤  │
│                      │  │ 3. Unvana Göre Soru Bankası                   │  │
│                      │  │    Mülakatçı Personası · Beklenti & İpuçları  │  │
│                      │  ├───────────────────────────────────────────────┤  │
│                      │  │ 4. Çift Modlu Mülakat Simülatörü              │  │
│                      │  │    Yazılı Sohbet + Mikrofon Kaydı + Sesli TTS │  │
│                      │  ├───────────────────────────────────────────────┤  │
│                      │  │ 5. STAR & Performans Analiz Karnesi           │  │
│                      │  │    STAR Kırılımı · Netlik · Teknik Derinlik   │  │
│                      │  └───────────────────────────────────────────────┘  │
└──────────────────────┴──────────────────────────┬──────────────────────────┘
                                                  │ HTTP / JSON & Base64 Ses
                                                  ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                     SUNUCU (Express.js + @google/genai)                    │
├────────────────────────────────────────────────────────────────────────────┤
│  • POST /api/profile/analyze    -> LinkedIn URL + CV (PDF/Metin) Analizi   │
│                                    & Kariyer/Eğitim Yol Haritası           │
│  • POST /api/questions/generate -> Mülakatçı Unvanına Göre Soru & İpucu    │
│  • POST /api/interview/turn     -> Simülasyon Diyalog Yönetimi & Anlık     │
│                                    Mini-STAR Değerlendirmesi               │
│  • POST /api/interview/evaluate -> Kapsamlı Mülakat Sonu Performans Karnesi│
│  • POST /api/audio/transcribe   -> gemini-3.5-transcribe ile Ses -> Metin  │
│  • POST /api/audio/tts          -> gemini-3.8-flash-lite-tts ile Metin->Ses│
└────────────────────────────────────────────────────────────────────────────┘
```

#### Veri Modeli ve Durum Yönetimi (State Mapping)

- **`CandidateProfile`**: LinkedIn URL'si, CV dosya içeriği (metin veya PDF base64), mevcut unvan, hedef pozisyon, hedef şirket ve mülakata girecek kişinin unvanı (`interviewerTitle`, ör. *"Engineering Director"*).
- **`CareerRoadmap`**: Mevcut güçlü yetkinlikler, hedef rol için eksik yetkinlikler (öncelik derecesiyle), önerilen eğitimler/kurslar (konu, kazanım, tahmini süre), LinkedIn profil optimizasyon önerileri.
- **`InterviewerQuestion`**: Soru metni, kategori (Teknik, Davranışsal, Stratejik/Liderlik), zorluk derecesi, mülakatçının bu soruyu sorma amacı (`hiddenIntent`), adayın geçmişinden hangi noktayı vurgulaması gerektiği (`tailoredTip`) ve örnek STAR cevap taslağı.
- **`InterviewSession`**: Mülakatçı personası, soru-cevap geçmişi (`turns`), her yanıtta kullanılan mod (yazılı/sesli), yanıt süresi ve her yanıt için anlık geri bildirim notu.
- **`EvaluationReport`**: Genel puan (`0-100`), **STAR Tekniği Puanı** (`Situation`, `Task`, `Action`, `Result` ayrı ayrı puan ve geri bildirim), **İletişim Netliği Puanı**, **Teknik Derinlik Puanı**, soru bazlı detaylı revizyonlar ve mülakat sonrası eylem planı.
