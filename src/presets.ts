import {
  CandidateProfile,
  CareerRoadmap,
  QuestionsResponse,
  EvaluationReport,
} from './types';

export interface PresetScenario {
  id: string;
  label: string;
  profile: CandidateProfile;
  roadmap: CareerRoadmap;
  questionsData: QuestionsResponse;
  sampleReport: EvaluationReport;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'swe-to-staff',
    label: 'Senior Software Engineer → Staff Engineer (Mülakatçı: VP of Engineering)',
    profile: {
      currentTitle: 'Senior Backend Engineer',
      targetRole: 'Staff Software Engineer / Engineering Lead',
      targetCompany: 'FinTech & Ödeme Sistemleri (Ölçeklenen Ürün)',
      interviewerTitle: 'VP of Engineering',
      interviewStage: 'Teknik Liderlik & Mimari Karar Mülakatı',
      linkedinUrl: 'https://www.linkedin.com/in/ornek-senior-backend-engineer',
      linkedinSummaryText:
        '6+ yıl yüksek trafikli dağıtık sistemler, Go, TypeScript, Kubernetes ve Kafka deneyimi. Ödeme geçidi mikroservis dönüşümüne liderlik etti, sistem erişilebilirliğini %99.95 seviyesine çıkardı. 4 kişilik geliştirici ekibine mentorluk yapıyor.',
      cvText: `DENEYİM:
- Senior Backend Engineer | PayCore FinTech (2023 - Günümüz)
  • Saniyede 4.500 işlem kapasiteli ödeme yönlendirme servisini Go ve Kafka ile yeniden tasarladı; gecikmeyi (p99) 420ms'den 115ms'ye düşürdü.
  • Monolitik mimariden 12 mikroservise geçiş sürecinde veritabanı ayrıştırma (Outbox Pattern) standartlarını belirledi.
  • 4 Junior/Mid mühendise kod inceleme ve sistem tasarımı mentorluğu verdi.

- Software Engineer | CloudScale Bilişim (2020 - 2023)
  • Node.js, PostgreSQL ve Redis tabanlı B2B abonelik yönetim API'lerini geliştirdi.
  • CI/CD süreçlerini GitHub Actions ve ArgoCD ile otomatikleştirerek dağıtım süresini 45 dakikadan 8 dakikaya indirdi.

EĞİTİM & YETKİNLİKLER:
- Bilgisayar Mühendisliği Lisans (ODTÜ)
- Yetkinlikler: Go, TypeScript, PostgreSQL, Kafka, Redis, Kubernetes, AWS, Sistem Tasarımı`,
      cvFileName: 'Kariyer_Ozgecmis_Senior_Backend.pdf',
    },
    roadmap: {
      candidateSummary:
        'Yüksek trafikli dağıtık sistemler ve performans optimizasyonu konusunda güçlü teknik temele sahip bir Kıdemli Yazılım Mühendisi. Bir sonraki aşama olan Staff Engineer / Engineering Lead rolüne geçiş için tekil ekip içi uygulamadan organizasyonel teknik stratejiye, maliyet/mimari yönetişime (FinOps) ve çapraz ekip liderliğine evrilmesi gerekiyor.',
      readinessScore: 78,
      nextStagePositioning:
        'Kendinizi sadece "karmaşık kodları yazan kişi" olarak değil, "mühendislik organizasyonunun teknik yönünü belirleyen, iş hedefleri ile mimari borç arasındaki dengeyi kuran teknik çarpan (force multiplier)" olarak konumlandırmalısınız.',
      currentStrengths: [
        {
          competency: 'Yüksek Trafikli Dağıtık Sistemler & Performans',
          level: 90,
          evidence: 'Saniyede 4.500 işlem ve p99 gecikmesini 420ms -> 115ms seviyesine indirme başarısı.',
        },
        {
          competency: 'Mikroservis Dönüşümü & Veri Tutarlılığı',
          level: 85,
          evidence: '12 mikroservise geçişte Outbox Pattern standartlarını kurgulama.',
        },
        {
          competency: 'Teknik Mentorluk & CI/CD Otomasyonu',
          level: 80,
          evidence: '4 mühendise mentorluk ve ArgoCD ile dağıtım süresini %82 kısaltma.',
        },
      ],
      skillGaps: [
        {
          skill: 'Organizasyonel Mimari Yönetişim (RFC / ADR Süreçleri)',
          priority: 'Kritik',
          currentLevel: 55,
          targetLevel: 90,
          whyNeeded:
            'Staff seviyesinde birden fazla ekibin uyması gereken teknik standartları yazılı RFC (Request for Comments) dokümanlarıyla kabul ettirme becerisi aranır.',
          actionStep:
            'Son yaptığınız Outbox Pattern dönüşümünü alternatif maliyetleri ve reddedilen seçenekleriyle birlikte bir Architecture Decision Record (ADR) vaka çalışması haline getirin.',
        },
        {
          skill: 'Bulut Maliyet Optimizasyonu (FinOps) & İş Etkisi Bağlantısı',
          priority: 'Yüksek',
          currentLevel: 50,
          targetLevel: 85,
          whyNeeded:
            'VP of Engineering seviyesindeki mülakatçılar teknik kararların birim işlem maliyetine (cost per transaction) ve şirket kârlılığına etkisini duymak ister.',
          actionStep:
            'Yaptığınız gecikme iyileştirmesinin sunucu/AWS altyapı maliyetlerinde sağladığı yıllık tasarrufu dolar/yüzde cinsinden hesaplayın.',
        },
        {
          skill: 'Çapraz Fonksiyonel Paydaş Yönetimi (Ürün & Üst Yönetim)',
          priority: 'Yüksek',
          currentLevel: 60,
          targetLevel: 85,
          whyNeeded:
            'Teknik borç yatırımlarını teknik olmayan ürün yöneticilerine ve üst yönetime iş çıktısı diliyle savunabilmek gerekir.',
          actionStep:
            'Mülakat hikayelerinizde Ürün Direktörü veya İş Birimleri ile yaşadığınız öncelik çatışmalarını nasıl uzlaştırdığınıza dair 2 STAR örneği hazırlayın.',
        },
      ],
      recommendedTrainings: [
        {
          title: 'Staff Engineer’s Path & Architecture Decision Records (ADR) Uygulaması',
          providerOrType: 'O’Reilly / Tanya Reilly & Uygulamalı Mimari Atölyesi',
          focusArea: 'Teknik Strateji, RFC Yazımı ve Etki Alanı Genişletme',
          durationEstimate: '3 Hafta',
          expectedImpact:
            'VP of Engineering karşısında bireysel katkı sağlayıcı (IC) dilinden stratejik teknik lider diline geçiş sağlar.',
        },
        {
          title: 'AWS Certified Solutions Architect – Professional & FinOps Practitioner',
          providerOrType: 'AWS / FinOps Foundation',
          focusArea: 'Çok Bölgeli Dayanıklılık (Multi-Region Resilience) ve Maliyet Mimari Tasarımı',
          durationEstimate: '6 Hafta',
          expectedImpact:
            'Büyük ölçekli altyapı kararlarında maliyet-performans (trade-off) sorularına rakamsal yanıt verme yetkinliği kazandırır.',
        },
        {
          title: 'Leading Without Authority & Executive Communication',
          providerOrType: 'Coursera / Stanford Executive Education Modülü',
          focusArea: 'Doğrudan Yöneticisi Olmadığınız Ekipleri Etkileme ve İkna',
          durationEstimate: '4 Hafta',
          expectedImpact:
            'Davranışsal mülakat sorularında ekip içi çatışma ve paydaş iknası puanlarını doğrudan yükseltir.',
        },
      ],
      spotlightCompetencies: [
        {
          competency: 'Sistem Ölçeklenebilirliği ve Somut İş Metrikleri',
          howToHighlightInInterview:
            'Sadece Go ve Kafka kullandığınızı söylemeyin; "p99 gecikmesini %72 düşürerek ödeme terk oranını (drop-off) %3.4 azalttım" şeklinde iş sonucuna bağlayın.',
          linkedinOptimizationTip:
            'LinkedIn Başlığınızı (Headline) "Senior Backend Engineer | High-Throughput Distributed Systems & Payment Architecture" olarak güncelleyin ve Hakkında kısmına p99 metriklerini ekleyin.',
        },
        {
          competency: 'Teknik Standart Belirleme ve Çarpan Etkisi',
          howToHighlightInInterview:
            'Kendi yazdığınız koddan ziyade, tasarladığınız mimari şablonun diğer 3 ekibin geliştirme hızını (velocity) nasıl artırdığını vurgulayın.',
          linkedinOptimizationTip:
            'Deneyim maddelerinin en üstüne "Led architectural RFCs across 3 squads" vurgusunu ve mentorluk çıktılarınızı ekleyin.',
        },
        {
          competency: 'Kriz Anında Olay Yönetimi (Incident Post-Mortem Kültürü)',
          howToHighlightInInterview:
            '%99.95 erişilebilirlik hedefine ulaşırken yaşanan kritik bir kesintiyi nasıl suçlayıcı olmayan (blameless post-mortem) bir süreçle kalıcı olarak çözdüğünüzü anlatın.',
          linkedinOptimizationTip:
            'Yetenekler (Skills) bölümünde System Architecture, Site Reliability Engineering (SRE) ve Technical Leadership yetkinliklerini ilk 3 sıraya sabitleyin.',
        },
      ],
    },
    questionsData: {
      interviewerPersona: {
        title: 'VP of Engineering',
        mindsetSummary:
          'VP of Engineering, kodun sözdizimiyle değil; aldığınız teknik kararların şirketin 2 yıllık ürün yol haritasını, mühendislik hızını, bulut maliyetlerini ve ekip kültürünü nasıl etkilediğiyle ilgilenir. Ödünleşimleri (trade-offs) net ifade etmenizi bekler.',
        primaryPriorities: [
          'Teknik kararların ticari hedefler ve maliyet (ROI) ile uyumu',
          'Birden fazla ekibi hizalama ve otorite kullanmadan liderlik etme',
          'Kısa vadeli teslimat hızı ile uzun vadeli mimari sağlamlık arasındaki denge',
          'Kritik üretim krizlerinde soğukkanlı kök neden analizi ve sistemik önlem alma',
        ],
        redFlagsToAvoid: [
          'İş ihtiyacını sorgulamadan sırf popüler olduğu için karmaşık teknoloji (over-engineering) seçmek',
          'Başarıları "ben yaptım" diye anlatıp başarısızlıklarda ürün ekibini veya diğer mühendisleri suçlamak',
          'Metrik ve somut sonuç (Result) vermeden sadece teknik araç isimleri sıralamak',
        ],
      },
      questions: [
        {
          id: 'q-1',
          question:
            'Monolitik yapıdan 12 mikroservise geçiş sürecinizde, ürün ekibinin yeni özellik yetiştirme baskısı ile mimari dönüşüm ihtiyacını nasıl dengelediniz? Geriye dönüp baksanız hangi servisi ayırmaktan vazgeçerdiniz?',
          category: 'Stratejik Vizyon & Mimari Ödünleşim',
          difficulty: 'Kritik Eleme Sorusu',
          hiddenIntent:
            'Mikroservis fanatiği olup olmadığınızı, iş sürekliliğini koruyarak kademeli geçiş (strangler pattern) yapabilme olgunluğunuzu ve öz eleştiri kapasitenizi ölçüyor.',
          tailoredCandidateTip:
            'CV’nizdeki Outbox Pattern ve ödeme yönlendirme servisi dönüşümünü örnek verin; teslimatı durdurmadan paralel çalıştırma stratejinizi anlatın.',
          sampleStarOutline:
            'S: Ödeme monolitinde dağıtım çakışmaları yaşanırken Q4 ürün hedefleri vardı. T: Özellik teslimatını durdurmadan en darboğaz yaratan ödeme yönlendirme modülünü ayırmak. A: Tüm sistemi bölmek yerine sadece 4.500 TPS alan yönlendirme katmanını Go/Kafka ile Strangler Fig deseniyle ayırdık, raporlama servisini monolitte bıraktık. R: Dağıtım süresi 8 dakikaya indi, p99 gecikmesi %72 düştü ve Q4 ürün hedefleri zamanında teslim edildi.',
        },
        {
          id: 'q-2',
          question:
            'Doğrudan yöneticisi olmadığınız diğer mühendislik ekiplerinin karşı çıktığı ancak sistemin geleceği için kritik gördüğünüz bir teknik standardı veya mimari kararı nasıl kabul ettirdiniz?',
          category: 'Teknik Liderlik & Paydaş Yönetimi',
          difficulty: 'Zorlayıcı',
          hiddenIntent:
            'Staff seviyesinin en temel göstergesi olan "etki alanını ikna ve veri ile genişletme" (influence without authority) yetkinliğinizi test ediyor.',
          tailoredCandidateTip:
            'Veritabanı ayrıştırma veya CI/CD ArgoCD geçişinde diğer geliştiricilerin direncini nasıl prototip ve metriklerle kırdığınızı vurgulayın.',
          sampleStarOutline:
            'S: Ekipler arası asenkron mesajlaşmada veri tutarsızlıkları yaşanıyordu ancak ekipler ek efor nedeniyle Outbox yapısına direniyordu. T: 3 farklı ekibi ortak veri tutarlılığı standardında hizalamak. A: Zorunlu tutmak yerine önce kendi ekibimde örnek bir kütüphane (boilerplate) yazdım ve entegrasyon süresini 3 günden 2 saate indiren bir RFC sundum. R: Tüm ekipler 1 ay içinde gönüllü olarak standarda geçti ve veri senkronizasyon hataları sıfırlandı.',
        },
        {
          id: 'q-3',
          question:
            'Saniyede 4.500 işlem kapasiteli ödeme sisteminizde gece yarısı p99 gecikmelerinin aniden 10 katına çıktığı veya veri kaybı riski oluşan en ciddi üretim krizini ve sonrasında kurduğunuz önleyici sistemi anlatır mısınız?',
          category: 'Teknik Derinlik & Kriz Yönetimi',
          difficulty: 'Zorlayıcı',
          hiddenIntent:
            'Baskı altında karar alma sürecinizi, gözlemlenebilirlik (observability) bilginizi ve "suçlayıcı olmayan" kök neden kültürünüzü ölçüyor.',
          tailoredCandidateTip:
            '%99.95 erişilebilirlik başarınızın arkasındaki gerçek bir darboğazı (ör. Kafka consumer lag veya PostgreSQL connection pool tükenmesi) detaylandırın.',
          sampleStarOutline:
            'S: Kampanya döneminde yoğun trafik altında veritabanı bağlantı havuzu kilitlendi. T: Ödeme kaybı olmadan sistemi 15 dakika içinde stabilize etmek ve kalıcı mimari önlem almak. A: Devre kesici (circuit breaker) ve kuyruk tamponlamasını devreye alıp trafiği koruduk; ertesi gün blameless post-mortem ile otomatik ölçeklenen PgBouncer ve yük testi kapısı ekledik. R: Sonraki 12 ay boyunca %99.95 uptime korundu.',
        },
        {
          id: 'q-4',
          question:
            'Mühendislik organizasyonumuzda teknik borcu azaltmak için 2 sprint boyunca yeni ürün özelliği geliştirmeyi durdurmak isteseniz, bunu bana ve CEO’ya hangi verilerle savunursunuz?',
          category: 'İş Etkisi & Yönetici İletişimi',
          difficulty: 'Kritik Eleme Sorusu',
          hiddenIntent:
            'Mühendislik metriklerini ticari metriklerle (gelir kaybı, müşteri memnuniyeti, geliştirici hızı) tercüme edebilme becerinizi ölçüyor.',
          tailoredCandidateTip:
            'Tamamen durdurmak yerine "%20 kapasite tahsisi" veya "hata düzeltmeye harcanan sürenin yeni özellik hızını nasıl düşürdüğü" verisiyle yanıt verin.',
          sampleStarOutline:
            'S: Eski abonelik modülündeki teknik borç, her sprint kapasitesinin %35’ini acil hata düzeltmelerine harcatıyordu. T: Yönetimi refaktör yatırımına ikna etmek. A: Özellik geliştirmeyi tamamen durdurmak yerine, son 3 ayda kaybedilen mühendislik saatlerini ve geciken müşteri taleplerini maliyet tablosuyla sundum; kademeli 2 sprintlik plan önerdim. R: Refaktör sonrası sprint teslimat hızı %40 arttı ve destek talepleri yarıya indi.',
        },
        {
          id: 'q-5',
          question:
            'Ekibinizdeki kıdemli bir mühendis sürekli olarak yüksek kaliteli kod yazıyor ancak kod incelemelerinde (PR) ekip arkadaşlarına karşı yıpratıcı davranıyor ve bilgi paylaşımından kaçınıyor. Teknik lider olarak nasıl müdahale edersiniz?',
          category: 'Liderlik & Ekip Kültürü',
          difficulty: 'Orta',
          hiddenIntent:
            'Toksik "parlak yalnız kovboy" kültürünü mü yoksa psikolojik güvenliği ve ekip çarpan etkisini mi önceliklendirdiğinizi test ediyor.',
          tailoredCandidateTip:
            '4 mühendise mentorluk deneyiminizi kullanarak yapıcı birebir geri bildirim ve yazılı PR inceleme kuralları oluşturma yaklaşımınızı anlatın.',
          sampleStarOutline:
            'S: Ekibimizde teknik olarak çok güçlü bir geliştiricinin sert PR yorumları junior mühendislerin motivasyonunu düşürüyordu. T: Kişinin teknik katkısını kaybetmeden ekip içi psikolojik güvenliği yeniden tesis etmek. A: Birebir görüşmede somut örneklerle etkisini paylaştım, PR standartlarımızı kişisel görüşlerden otomatik linter ve mimari prensiplere bağladık ve kendisini birlikte tasarım (pair design) sürecine dahil ettim. R: PR onay süreleri %50 kısaldı ve ekip içi memnuniyet skoru yükseldi.',
        },
      ],
    },
    sampleReport: {
      overallScore: 84,
      starMethodologyScore: 82,
      communicationClarityScore: 88,
      technicalDepthScore: 83,
      hiringRecommendation: 'Güçlü Aday — Teknik Derinlik ve İletişim Net, İş/FinOps Etkisi Vurgusuyla Kesin Kabul',
      executiveSummary:
        'Aday, VP of Engineering seviyesindeki sorulara yüksek özgüven, net bir iletişim dili ve sağlam dağıtık sistem mimarisi bilgisiyle yanıt verdi. Situation ve Action adımları oldukça güçlü kurgulanmış; ancak Result (Sonuç) adımında teknik metriklerin şirket bütçesine ve ticari büyümeye olan etkisi daha net sayısallaştırıldığında Staff seviyesinde kusursuz bir profil çizecektir.',
      starBreakdown: {
        situationScore: 88,
        situationFeedback:
          'Bağlamı ve sistemin ölçeğini (4.500 TPS, monolit darboğazları) gereksiz detaya boğmadan çok hızlı ve net tanımladınız.',
        taskScore: 85,
        taskFeedback:
          'Üzerinize düşen sorumluluğu ve kısıtları (ürün teslimat takvimi baskısı) net biçimde çerçevelediniz.',
        actionScore: 82,
        actionFeedback:
          'Mimari kararları (Outbox pattern, Go/Kafka geçişi) iyi açıkladınız; ancak diğer ekipleri nasıl ikna ettiğiniz kısmında "biz yaptık" yerine "benim liderlik ettiğim adımlar" ayrımını daha belirgin yapmalısınız.',
        resultScore: 74,
        resultFeedback:
          'Teknik sonuçları (420ms -> 115ms) paylaştınız ancak bunların finansal veya müşteri dönüşüm oranına etkisini her soruda belirtmediniz.',
      },
      keyStrengthsDemonstrated: [
        'Dağıtık sistemlerde veri tutarlılığı ve yüksek erişilebilirlik konusunda gerçek üretim deneyimi',
        'Karmaşık mimari konuları yönetici seviyesinde sade ve yapılandırılmış bir dille aktarma',
        'Kriz anında suçlayıcı olmayan, süreç ve otomasyon odaklı mühendislik yaklaşımı',
      ],
      criticalImprovementAreas: [
        'Her yanıtın sonundaki Result (Sonuç) bölümüne teknik metriğin yanı sıra bir ticari/maliyet metriği eklemek',
        'Çapraz ekip ikna süreçlerinde kullanılan yazılı RFC ve karar matrislerini daha somut örneklemek',
      ],
      questionEvaluations: [
        {
          question:
            'Monolitik yapıdan 12 mikroservise geçiş sürecinizde, ürün ekibinin yeni özellik yetiştirme baskısı ile mimari dönüşüm ihtiyacını nasıl dengelediniz?',
          userAnswer:
            'Ödeme sistemimizde monolitik yapı yüzünden dağıtımlar çok yavaşlamıştı ve yoğun saatlerde gecikmeler oluyordu. Ürün ekibi yeni kampanya özelliklerini bekliyordu. Biz de tüm sistemi bir anda bölmek yerine en çok yük alan ödeme yönlendirme kısmını Go ve Kafka kullanarak ayırdık, veri tutarlılığı için Outbox pattern kullandık. Böylece gecikmeyi 420ms’den 115ms’ye indirdik ve özellikleri de yetiştirdik.',
          starScore: 82,
          clarityScore: 88,
          technicalDepthScore: 84,
          critique:
            'Teknik yaklaşım (Strangler yaklaşımı ve Outbox pattern) çok doğru. Ancak VP of Engineering bu soruda "Ürün yöneticisini nasıl ikna ettiniz?" ve "Geriye dönüp baksanız hangi servisi ayırmazdınız?" alt sorusunun cevabını da duymak ister.',
          idealRefinedAnswer:
            'PayCore’da saniyede 4.500 işlem alan ödeme monolitimizde dağıtım çakışmaları nedeniyle Q4 ürün yol haritası riske girmişti (Situation). Görevim, Q4 kampanya özelliklerini geciktirmeden sistem darboğazını kalıcı olarak çözmekti (Task). Ürün Direktörü ile masaya oturarak "ya hep ya hiç" dönüşümü yerine Strangler Fig yaklaşımını önerdim; sprint kapasitesinin %70’ini yeni özelliklere, %30’unu ise sadece en kritik darboğaz olan ödeme yönlendirme servisini Go ve Kafka ile ayırmaya tahsis ettik. Veri kaybını önlemek için Outbox Pattern standardını kurguladım. Geriye dönüp baktığımda, düşük trafikli bildirim servisini erken aşamada ayırmak yerine monolitte tutmayı tercih ederdim çünkü operasyonel yükü getirisine göre fazlaydı (Action). Sonuç olarak p99 gecikmesini 420ms’den 115ms’ye düşürdük, dağıtım süresini 8 dakikaya indirdik ve Q4 kampanyasında %0 kesinti ile işlem hacminde %18 artış sağladık (Result).',
        },
      ],
      nextActionPlan: [
        'Geçmiş projelerinizdeki en kritik 3 teknik başarının yanına "Maliyet Tasarrufu ($/%)" ve "Gelir/Dönüşüm Etkisi" metriklerini not alın.',
        'Mülakatta "Biz yaptık" ifadelerini "Ekiple birlikte uyguladık, benim doğrudan tasarladığım/liderlik ettiğim kısım şuydu" şeklinde netleştirin.',
        'Bir sonraki simülasyonda Sesli Modu kullanarak yanıtlarınızı 90-120 saniye aralığında tüm STAR adımlarını tamamlayacak şekilde prova edin.',
      ],
    },
  },
  {
    id: 'pm-to-director',
    label: 'Senior Product Manager → Head of Product (Mülakatçı: Chief Product Officer)',
    profile: {
      currentTitle: 'Senior Product Manager',
      targetRole: 'Head of Product / Group Product Manager',
      targetCompany: 'Global B2B SaaS Platformu',
      interviewerTitle: 'Chief Product Officer (CPO)',
      interviewStage: 'Ürün Stratejisi, Büyüme & Liderlik Mülakatı',
      linkedinUrl: 'https://www.linkedin.com/in/ornek-senior-product-manager',
      linkedinSummaryText:
        '7 yıl B2B SaaS ve ürün odaklı büyüme (PLG) deneyimi. Kurumsal müşteri bağlılığını (NRR) %104’ten %122’ye çıkaran analitik modülünü sıfırdan ölçekledi. 3 PM ve 2 ürün tasarımcısına koçluk yapıyor.',
      cvText: `DENEYİM:
- Senior Product Manager | MetricFlow SaaS (2022 - Günümüz)
  • B2B kurumsal analitik ürün hattının yol haritasını yönetti; yıllık tekrarlayan geliri (ARR) 4.2M$'dan 8.5M$'a taşıdı.
  • Ürün Odaklı Büyüme (Product-Led Growth) self-servis onboarding akışını yeniden kurgulayarak aktivasyon oranını %24'ten %41'e yükseltti.
  • Mühendislik, Tasarım ve Satış ekipleri arasında çeyreklik OKR planlama süreçlerini yönetti.

- Product Manager | FinCloud (2019 - 2022)
  • KOBİ faturalama otomasyonu modülünü 0'dan 15.000 aktif işletmeye ulaştırdı.
  • Müşteri kayıp oranını (Churn) aylık %4.2'den %2.1'e düşürdü.

EĞİTİM & YETKİNLİKLER:
- Endüstri Mühendisliği Lisans (Boğaziçi Üniversitesi)
- Yetkinlikler: Ürün Stratejisi, PLG, B2B SaaS Metrikleri (ARR, NRR, CAC/LTV), OKR Yönetimi, SQL, Amplitude`,
      cvFileName: 'Kariyer_Ozgecmis_Senior_PM.pdf',
    },
    roadmap: {
      candidateSummary:
        'ARR büyütme, aktivasyon optimizasyonu ve PLG metriklerinde kanıtlanmış başarılara sahip güçlü bir Senior Product Manager. Head of Product seviyesine geçiş için tek bir ürün hattını yönetmekten çoklu ürün portföyü sermaye dağılımına, PM ekibi işe alım/performans yönetimine ve Yönetim Kurulu seviyesinde finansal hikaye anlatıcılığına odaklanması gerekiyor.',
      readinessScore: 81,
      nextStagePositioning:
        'CPO karşısında kendinizi "özellik teslim eden başarılı PM" olarak değil, "şirketin gelir motorunu inşa eden, ürün portföyü yatırımlarını yöneten ve PM organizasyonunu ölçekleyen lider" olarak konumlandırın.',
      currentStrengths: [
        {
          competency: 'Gelir Odaklı Ürün Büyümesi (ARR & NRR)',
          level: 92,
          evidence: 'ARR’yi 4.2M$ -> 8.5M$ seviyesine taşıma ve NRR’yi %122’ye çıkarma.',
        },
        {
          competency: 'Product-Led Growth (PLG) & Aktivasyon',
          level: 88,
          evidence: 'Self-servis onboarding ile aktivasyon oranını %24 -> %41 seviyesine yükseltme.',
        },
      ],
      skillGaps: [
        {
          skill: 'Çoklu Ürün Portföyü & Bütçe/Kaynak Dağılımı (Portfolio Allocation)',
          priority: 'Kritik',
          currentLevel: 60,
          targetLevel: 90,
          whyNeeded:
            'Head of Product rolünde hangi ürün hattına yatırım yapılacağına ve hangisinin sonlandırılacağına (sunset) karar vermeniz beklenir.',
          actionStep:
            'Core ürün, Büyüme (Growth) ve Yeni Bahisler (Horizon 1-2-3) arasında mühendislik kapasitesini nasıl paylaştırdığınıza dair bir çerçeve hazırlayın.',
        },
        {
          skill: 'PM Organizasyonu Kurma ve Koçluk Çerçevesi',
          priority: 'Yüksek',
          currentLevel: 65,
          targetLevel: 88,
          whyNeeded:
            'CPO, altınızdaki PM’leri nasıl işe aldığınızı, yetkinlik matrislerini nasıl ölçtüğünüzü ve düşük performansı nasıl yönettiğinizi soracaktır.',
          actionStep:
            '3 PM’e yaptığınız koçluğu somut bir "PM Yetkinlik Gelişim Matrisi" hikayesine dönüştürün.',
        },
      ],
      recommendedTrainings: [
        {
          title: 'Reforge: Product Leadership & Scaling Product Teams',
          providerOrType: 'Reforge Executive Program',
          focusArea: 'Portföy Stratejisi, PM Organizasyon Tasarımı ve Yönetici İletişimi',
          durationEstimate: '4 Hafta',
          expectedImpact:
            'CPO mülakatlarında doğrudan kullanılan portföy yönetimi ve ekip ölçekleme terminolojisine hakimiyet sağlar.',
        },
        {
          title: 'SaaS Unit Economics & Strategic Pricing Mastery',
          providerOrType: 'OpenView / Wharton Online',
          focusArea: 'Fiyatlandırma Paketlemesi, NRR Genişletme ve Finansal Modelleme',
          durationEstimate: '3 Hafta',
          expectedImpact:
            'Fiyatlandırma ve paketleme stratejisi sorularında CFO/CPO düzeyinde analitik derinlik kazandırır.',
        },
      ],
      spotlightCompetencies: [
        {
          competency: 'Net Gelir Tutundurma (NRR) ve PLG Sinerjisi',
          howToHighlightInInterview:
            'Self-servis başlayan kullanıcıları kurumsal satış (Enterprise Sales-Assist) hunisine nasıl aktardığınızı rakamlarla anlatın.',
          linkedinOptimizationTip:
            'LinkedIn Öne Çıkanlar bölümüne ARR 4.2M$ -> 8.5M$ büyüme vaka analizini özetleyen bir sunum veya makale ekleyin.',
        },
      ],
    },
    questionsData: {
      interviewerPersona: {
        title: 'Chief Product Officer (CPO)',
        mindsetSummary:
          'CPO, tekil özelliklerin nasıl tasarlandığından ziyade; ürün vizyonunu şirket stratejisine nasıl bağladığınıza, satış/mühendislik liderleriyle üst düzey gerilimleri nasıl yönettiğinize ve A-kalite PM ekibini nasıl kurup yönettiğinize bakar.',
        primaryPriorities: [
          '3 yıllık ürün vizyonu ve rekabetçi farklılaşma stratejisi',
          'Satış (CRO) ve Mühendislik (VP Eng) liderleriyle stratejik hizalanma',
          'PM ekibinin kalitesini artırma, yetkilendirme ve hesap verebilirlik',
        ],
        redFlagsToAvoid: [
          'Müşteri taleplerini stratejik filtrelemeden doğrudan yol haritasına eklemek (Feature Factory yaklaşımı)',
          'Kendi PM ekibinin işini mikro-yönetmek ve bireysel PM gibi konuşmak',
        ],
      },
      questions: [
        {
          id: 'pm-q1',
          question:
            'Satıştan Sorumlu Başkan (CRO), çeyrek hedefini tutturmak için büyük bir kurumsal müşteri adayına özel bir özellik sözü vermiş ve yol haritanızı değiştirmenizi istiyor. Head of Product olarak bu krizi nasıl yönetirsiniz?',
          category: 'Paydaş Yönetimi & Stratejik Disiplin',
          difficulty: 'Kritik Eleme Sorusu',
          hiddenIntent:
            'Kısa vadeli gelir baskısı karşısında uzun vadeli ürün vizyonunu korurken ticari gerçeklikten kopmadan müzakere edebilme gücünüzü ölçüyor.',
          tailoredCandidateTip:
            'ARR’yi 4.2M$’dan 8.5M$’a çıkarırken kurumsal satış ekibiyle kurduğunuz ortak önceliklendirme puanlamasını örnek verin.',
          sampleStarOutline:
            'S: Büyük bir kurumsal anlaşma için yol haritası dışı özel geliştirme talep edildi. T: Anlaşmayı riske atmadan ürünü tek müşteriye özel ajans işine dönüştürmekten korumak. A: Müşterinin asıl iş problemini analiz edip 10 müşteriye daha satılabilecek genel bir modül haline getirdik ve Q3’teki düşük etkili bir özelliği erteleyerek kapasite açtık. R: Anlaşma kapandı ve aynı modül 6 ay içinde 8 yeni kurumsal müşteriye daha satılarak 1.1M$ ek ARR getirdi.',
        },
        {
          id: 'pm-q2',
          question:
            'Önümüzdeki yıl mühendislik bütçeniz sabit kalsa ancak şirket sizden ARR büyümesini iki katına çıkarmanızı beklese, mevcut ürün portföyünüzde neyi yapmayı tamamen bırakırdınız?',
          category: 'Portföy Stratejisi & Önceliklendirme',
          difficulty: 'Zorlayıcı',
          hiddenIntent:
            'Acımasız önceliklendirme (ruthless prioritization) ve batık maliyet yanılgısından kurtulma becerinizi test ediyor.',
          tailoredCandidateTip:
            'PLG aktivasyon oranını %24’ten %41’e çıkaran yüksek kaldıraçlı hamlelerinizi ve düşük kullanımlı özellikleri nasıl emekli ettiğinizi anlatın.',
          sampleStarOutline:
            'S: Sabit mühendislik kapasitesiyle büyümeyi hızlandırma hedefi. T: Düşük ROI getiren bakım yükünü azaltıp NRR etkisini maksimize etmek. A: Kullanım oranı %3’ün altında kalan eski raporlama aracını sonlandırıp mühendislik gücünü self-servis aktivasyon hunisine kaydırdık. R: Aktivasyon %41’e çıktı ve ek mühendis almadan ARR büyümesi %102 gerçekleşti.',
        },
      ],
    },
    sampleReport: {
      overallScore: 86,
      starMethodologyScore: 85,
      communicationClarityScore: 90,
      technicalDepthScore: 82,
      hiringRecommendation: 'Güçlü Liderlik Profili — CPO Seviyesinde Stratejik Uyum',
      executiveSummary:
        'Aday, ürün stratejisi ve gelir metrikleri arasındaki bağı son derece berrak kuruyor. Paydaş yönetimi sorularında savunmacı olmak yerine veriye dayalı iş ortağı yaklaşımı sergiledi.',
      starBreakdown: {
        situationScore: 90,
        situationFeedback: 'B2B SaaS bağlamı ve ARR ölçeği çok net.',
        taskScore: 86,
        taskFeedback: 'Stratejik hedefler net tanımlandı.',
        actionScore: 84,
        actionFeedback: 'Müzakere adımları güçlü ve yapıcı.',
        resultScore: 82,
        resultFeedback: 'ARR ve NRR sonuçları etkileyici şekilde paylaşıldı.',
      },
      keyStrengthsDemonstrated: [
        'Üst düzey ticari metrik hakimiyeti (ARR, NRR, Churn)',
        'Satış ve Mühendislik liderleriyle yapıcı müzakere dili',
      ],
      criticalImprovementAreas: [
        'PM ekibini ölçekleme ve koçluk süreçlerine dair daha fazla liderlik örneği eklenmeli',
      ],
      questionEvaluations: [
        {
          question:
            'Satıştan Sorumlu Başkan (CRO), çeyrek hedefini tutturmak için büyük bir kurumsal müşteri adayına özel bir özellik sözü vermiş ve yol haritanızı değiştirmenizi istiyor.',
          userAnswer:
            'Önce CRO ile görüşüp müşterinin tam olarak hangi problemi çözmek istediğini anlarım. Doğrudan hayır demek yerine bu özelliğin diğer kurumsal müşteriler için de ölçeklenebilir olup olmadığına bakarım ve yol haritasındaki ödünleşimi birlikte seçeriz.',
          starScore: 84,
          clarityScore: 90,
          technicalDepthScore: 82,
          critique:
            'Yaklaşım doğru ancak CPO geçmişte gerçekten yaşadığınız somut bir olayı ve dolar bazlı sonucunu duymak ister.',
          idealRefinedAnswer:
            'MetricFlow’da 450K$ değerindeki bir kurumsal kontrat için CRO’muz yol haritamızda olmayan özel bir SSO ve yetkilendirme katmanı talep etti (Situation). Görevim, Q2 PLG aktivasyon hedeflerini yakmadan bu kurumsal satışı mümkün kılacak stratejik orta yolu bulmaktı (Task). Müşterinin teknik ekibiyle bizzat görüşerek talebin %80’inin mevcut API’mizle çözülebildiğini, kalan %20’lik kısmın ise tüm kurumsal segmentte NRR’yi artıracak genel bir "Kurumsal Yönetişim Paketi" olarak tasarlanabileceğini gösterdim. CRO ile anlaşarak düşük öncelikli bir görsel iyileştirmeyi Q3’e kaydırdık (Action). Sonuçta 450K$’lık anlaşma kapandı ve geliştirdiğimiz bu paket sonraki iki çeyrekte 6 kurumsal müşteriye daha satılarak NRR’mizi %104’ten %122’ye taşıdı (Result).',
        },
      ],
      nextActionPlan: [
        'Her stratejik soruda soyut "yapardım/ederdim" dili yerine geçmişten gerçek bir STAR vakası anlatın.',
      ],
    },
  },
];
