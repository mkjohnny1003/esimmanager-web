(() => {
  const supported = ['zh-TW', 'en', 'zh-CN', 'ja', 'ko'];
  const fallback = 'zh-TW';
  const savedLanguage = () => {
    try { return localStorage.getItem('esimmanager-site-language'); }
    catch { return null; }
  };
  const rememberLanguage = (language) => {
    try { localStorage.setItem('esimmanager-site-language', language); }
    catch { /* file:// previews may not expose localStorage. */ }
  };
  const content = {
    en: {
      title: 'eSIMManager — Travel eSIM setup and local management',
      description: 'eSIMManager is a local-first travel eSIM organizer for iPhone and iPad. Choose the plan you prefer, then work through five clear checks for installation, cellular data, roaming protection, and connection.',
      nav: ['Features', 'How it works', 'Buy eSIM', 'Partnerships'],
      release: 'Version 1.6 · Tabi travel interface and three visual styles',
      heroTitle: 'Choose your eSIM freely. Manage every trip with confidence.',
      heroText: 'You are not tied to a single eSIM brand. Compare plans for your budget and itinerary, then keep your cards, activation details, and validity dates together in eSIMManager. Settings, installation, and usage always follow iOS and the provider’s official information.',
      android: 'Android version coming soon', androidSub: 'In development for Google Play', howTo: 'See how it works',
      trust: ['Local-first · no proprietary cloud', 'No account required', 'iOS 17.4+ · system installation requires 17.5+'],
      promisePill: 'OUR PROMISE', promiseTitle: 'Choose the plan. Let eSIMManager keep it organized.',
      promiseText: 'No single-provider lock-in and no subscription barrier. We turn scattered travel eSIM details into a calm, ready-to-go process.',
      featurePill: 'FEATURE TOUR', featureTitle: 'A clear look at the real app flow', featureText: 'Key workflows and their limits, shown with the app’s test-build screens.',
      tabs: ['Pre-departure setup', 'Import options', 'System installation guide', 'Primary SIM roaming protection', 'Five app languages', 'Encrypted backup & restore'],
      journeyPill: 'HOW IT WORKS', journeyTitle: 'From finding a plan to wrapping up your trip', journeyText: 'Six steps cover purchase, installation, activation, usage checks, and trip records. Swipe sideways to explore each step; steps 4 and 5 open real in-app screens.', journeySwipe: 'Swipe to explore',
      buyPill: 'BUY eSIM / TRAVEL DATA', buyTitle: 'You choose the plan. We help you organize it.',
      buyText: 'Compare plans by destination, duration, and budget. Once you receive a QR Code or LPA activation detail, use eSIMManager to organize it and follow the setup guide. Plans, prices, availability, and eSIM support are determined by each platform.',
      disclaimerTitle: 'Technical transparency and feature limitations',
      partnerPill: 'PARTNERSHIPS', partnerTitle: 'Build a better travel-data experience together',
      faqPill: 'FAQ', faqTitle: 'Questions? Start here.',
      ctaTitle: 'Choose plans freely. Travel with confidence.', ctaText: 'Download eSIMManager free and turn every travel eSIM into a clear, reassuring pre-departure flow.',
      languageLabel: 'Website language'
    },
    'zh-CN': {
      title: 'eSIMManager 官方网站 - 旅行 eSIM 的出发前设置与本地管理工具',
      description: 'eSIMManager 是不绑定单一供应商的 iPhone 与 iPad 旅行 eSIM 整理工具。自由选择方案，再以清楚步骤确认安装、移动数据、主卡漫游保护与连线。',
      nav: ['产品功能', '如何使用', '购买 eSIM', '商务合作'],
      release: '版本 1.6 正式上线 · Tabi 旅行界面与三种外观',
      heroTitle: '自由选择 eSIM，安心管理每一趟旅程',
      heroText: '不绑定任何单一 eSIM 品牌。你可以比较符合预算与行程的方案，再用 eSIMManager 集中整理多张卡片、启用信息与有效期。实际设置、安装与用量仍以 iOS 与供应商官方信息为准。',
      android: 'Android 版即将推出', androidSub: 'Google Play 开发中', howTo: '查看如何使用',
      trust: ['本机优先・不设自建云端', '无需注册登录', '支持 iOS 17.4+；系统安装需 17.5+'],
      promisePill: '核心承诺', promiseTitle: '选择你的方案；管理交给 eSIMManager',
      promiseText: '不绑定单一供应商、不设订阅门槛，协助你把分散的旅行 eSIM 信息整理成可安心出发的流程。',
      featurePill: '功能图解', featureTitle: '实机操作功能全览', featureText: '以 App 测试版本画面说明主要操作流程与使用限制。',
      tabs: ['出发前设置', '多元导入方式', '系统安装引导', '主卡漫游保护', '五种界面语言', '加密备份还原'],
      journeyPill: '如何使用', journeyTitle: '从找到方案，到安心结束一趟旅程', journeyText: '六个步骤带你完成旅行 eSIM 的购买、安装、启用、用量确认与行程整理。可左右滑动查看每一步；第 4、5 步可查看真实 App 操作画面。', journeySwipe: '左右滑动查看',
      buyPill: '购买 eSIM／旅行上网卡', buyTitle: '你选择方案，我们帮你整理',
      buyText: '先依目的地、使用天数与预算比较适合的方案；取得 QR Code 或 LPA 启用信息后，再用 eSIMManager 整理与引导设置。实际方案、价格、库存与是否支持 eSIM，均以各平台页面为准。',
      disclaimerTitle: '技术透明度与功能免责声明',
      partnerPill: '商务合作', partnerTitle: '携手共创更好的旅行上网体验',
      faqPill: '常见问题', faqTitle: '使用上有疑问？先看看这里',
      ctaTitle: '方案自由选，旅程安心管', ctaText: '立即免费下载 eSIMManager，将每一张旅行 eSIM 整理成清楚、可安心确认的出发流程。',
      languageLabel: '网站语言'
    },
    ja: {
      title: 'eSIMManager — 旅行 eSIM の事前設定と端末内管理ツール',
      description: 'eSIMManager は、iPhone と iPad のためのローカル優先型旅行 eSIM 管理ツールです。プランを自由に選び、インストール、モバイルデータ、ローミング保護、接続をわかりやすく確認できます。',
      nav: ['機能', '使い方', 'eSIM を購入', 'パートナーシップ'],
      release: 'バージョン 1.6 · Tabi 旅行インターフェースと 3 つの外観',
      heroTitle: 'eSIM は自由に選ぶ。旅の管理は、もっと安心に。',
      heroText: '特定の eSIM ブランドに縛られません。予算と旅程に合うプランを比較し、カード情報、アクティベーション情報、有効期限を eSIMManager にまとめられます。設定、インストール、利用状況は iOS と事業者の公式案内に従ってください。',
      android: 'Android 版は近日公開', androidSub: 'Google Play 向けに開発中', howTo: '使い方を見る',
      trust: ['ローカル優先・独自クラウドなし', 'アカウント登録不要', 'iOS 17.4 以降・システムインストールは 17.5 以降'],
      promisePill: 'OUR PROMISE', promiseTitle: 'プランはあなたが選ぶ。整理は eSIMManager に。',
      promiseText: '事業者の縛りもサブスクリプションもありません。散らばった旅行 eSIM 情報を、落ち着いて出発できる流れに整えます。',
      featurePill: 'FEATURE TOUR', featureTitle: '実際のアプリ操作をひと目で', featureText: 'テスト版の画面で、主な操作と利用上の制限を紹介します。',
      tabs: ['出発前の設定', 'インポート方法', 'システムインストール案内', 'メイン SIM のローミング保護', '5 つのアプリ言語', '暗号化バックアップと復元'],
      journeyPill: 'HOW IT WORKS', journeyTitle: 'プラン探しから旅行後の整理まで', journeyText: '購入、インストール、利用開始、通信量確認、旅行記録の整理までを 6 ステップで案内します。左右にスワイプして確認できます。', journeySwipe: '左右にスワイプ',
      buyPill: 'BUY eSIM / TRAVEL DATA', buyTitle: 'プラン選びはあなたに。整理は私たちに。',
      buyText: '渡航先、利用日数、予算に合わせてプランを比較してください。QR Code または LPA 情報を受け取ったら、eSIMManager で整理し、設定ガイドに沿って進められます。プラン、価格、在庫、対応状況は各プラットフォームの情報が優先されます。',
      disclaimerTitle: '技術的な透明性と機能上の制限',
      partnerPill: 'PARTNERSHIPS', partnerTitle: 'よりよい旅行通信体験を、ともに',
      faqPill: 'FAQ', faqTitle: 'よくある質問',
      ctaTitle: 'プランは自由に。旅は安心に。', ctaText: 'eSIMManager を無料でダウンロードして、旅行用 eSIM をわかりやすい出発前の確認フローにまとめましょう。',
      languageLabel: 'サイトの言語'
    },
    ko: {
      title: 'eSIMManager — 여행 eSIM 사전 설정 및 기기 내 관리 도구',
      description: 'eSIMManager는 iPhone 및 iPad용 로컬 우선 여행 eSIM 정리 도구입니다. 원하는 요금제를 고르고 설치, 셀룰러 데이터, 로밍 보호, 연결을 명확한 단계로 확인하세요.',
      nav: ['기능', '사용 방법', 'eSIM 구매', '제휴'],
      release: '버전 1.6 · Tabi 여행 인터페이스 및 세 가지 스타일',
      heroTitle: 'eSIM은 자유롭게 고르고, 여행은 안심하고 관리하세요.',
      heroText: '특정 eSIM 브랜드에 묶이지 않습니다. 예산과 일정에 맞는 요금제를 비교한 뒤 카드, 활성화 정보, 유효 기간을 eSIMManager에 모아 관리하세요. 설정, 설치, 사용량은 iOS 및 공급업체의 공식 안내를 따라야 합니다.',
      android: 'Android 버전 출시 예정', androidSub: 'Google Play용 개발 중', howTo: '사용 방법 보기',
      trust: ['기기 우선 · 자체 클라우드 없음', '계정 가입 불필요', 'iOS 17.4 이상 · 시스템 설치는 17.5 이상 필요'],
      promisePill: 'OUR PROMISE', promiseTitle: '요금제 선택은 당신이. 정리는 eSIMManager가.',
      promiseText: '단일 공급업체에 묶이지 않고 구독 장벽도 없습니다. 흩어진 여행 eSIM 정보를 편안하게 출발할 수 있는 흐름으로 정리합니다.',
      featurePill: 'FEATURE TOUR', featureTitle: '실제 앱 흐름을 한눈에', featureText: '테스트 빌드 화면으로 주요 기능과 사용상 제한을 안내합니다.',
      tabs: ['출발 전 설정', '가져오기 방법', '시스템 설치 안내', '주 SIM 로밍 보호', '5개 앱 언어', '암호화 백업 및 복원'],
      journeyPill: 'HOW IT WORKS', journeyTitle: '요금제 찾기부터 여행 마무리까지', journeyText: '구매, 설치, 활성화, 사용량 확인, 여행 기록 정리까지 6단계로 안내합니다. 좌우로 밀어 각 단계를 확인하세요.', journeySwipe: '좌우로 밀어 보기',
      buyPill: 'BUY eSIM / TRAVEL DATA', buyTitle: '요금제는 직접 선택하고, 정리는 맡기세요.',
      buyText: '목적지, 사용 기간, 예산을 기준으로 요금제를 비교하세요. QR Code 또는 LPA 활성화 정보를 받으면 eSIMManager에서 정리하고 설정 안내를 따를 수 있습니다. 실제 요금제, 가격, 재고, eSIM 지원 여부는 각 플랫폼 페이지를 기준으로 합니다.',
      disclaimerTitle: '기술 투명성 및 기능 제한',
      partnerPill: 'PARTNERSHIPS', partnerTitle: '더 나은 여행 데이터 경험을 함께 만듭니다',
      faqPill: 'FAQ', faqTitle: '궁금한 점이 있으신가요?',
      ctaTitle: '요금제는 자유롭게, 여행은 안심하게.', ctaText: 'eSIMManager를 무료로 내려받아 여행 eSIM을 명확하고 안심되는 출발 전 확인 흐름으로 정리하세요.',
      languageLabel: '웹사이트 언어'
    }
  };

  const setText = (target, value) => {
    // Callers may pass either a CSS selector or an element from a NodeList.
    // Treating an element as a selector throws and aborts the whole locale
    // update before the remaining page copy can be translated.
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element || !value) return;
    const icon = element.querySelector(':scope > svg');
    element.replaceChildren(...(icon ? [icon] : []), document.createTextNode(value));
  };

  const localizedText = (source, dictionary) => {
    const normalized = source.replace(/\s+/g, ' ').trim();
    const translated = dictionary?.[normalized];
    if (!translated) return source;
    const leading = source.match(/^\s*/)?.[0] || '';
    const trailing = source.match(/\s*$/)?.[0] || '';
    return `${leading}${translated}${trailing}`;
  };

  const translateRemainingPageCopy = (dictionary) => {
    if (!dictionary) return;
    const currentTitle = document.title;
    if (dictionary[currentTitle]) document.title = dictionary[currentTitle];
    document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach((meta) => {
      const current = meta.getAttribute('content') || '';
      if (dictionary[current]) meta.setAttribute('content', dictionary[current]);
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'CODE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => { node.nodeValue = localizedText(node.nodeValue, dictionary); });
  };

  const applyLocale = (locale) => {
    const language = supported.includes(locale) ? locale : fallback;
    const copy = content[language];
    document.documentElement.lang = language;
    document.documentElement.dataset.locale = language;
    if (!copy) return;

    // Legal pages share the generic text-node translator below. Their titles
    // and content are intentionally not replaced with home-page marketing copy.
    if (!document.querySelector('.hero')) return;

    document.title = copy.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.heroTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.description);
    document.querySelectorAll('.nav-links > li > a:not(.btn-download)').forEach((item, index) => setText(item, copy.nav[index]));
    setText('.hero-badge span', copy.release);
    setText('.hero h1', copy.heroTitle);
    setText('.hero-sub', copy.heroText);
    setText('.android-coming-soon strong', copy.android);
    setText('.android-coming-soon small', copy.androidSub);
    setText('.hero-actions .btn-secondary', copy.howTo);
    document.querySelectorAll('.hero-trust span').forEach((item, index) => {
      const icon = item.querySelector('svg');
      item.replaceChildren(icon, document.createTextNode(copy.trust[index] || ''));
    });
    setText('.values-sec .sec-pill', copy.promisePill);
    setText('.values-sec h2', copy.promiseTitle);
    setText('.values-sec .section-header > p', copy.promiseText);
    setText('.features-sec .sec-pill', copy.featurePill);
    setText('.features-sec h2', copy.featureTitle);
    setText('.features-sec .section-header > p', copy.featureText);
    document.querySelectorAll('.tab-btn').forEach((item, index) => setText(item, copy.tabs[index]));
    setText('.journey-sec .sec-pill', copy.journeyPill);
    setText('.journey-sec h2', copy.journeyTitle);
    setText('.journey-sec .section-header > p', copy.journeyText);
    setText('.journey-scroll-control > span:last-child', copy.journeySwipe);
    setText('.purchase-sec .sec-pill', copy.buyPill);
    setText('.purchase-sec h2', copy.buyTitle);
    setText('.purchase-sec > .container > p:not(.purchase-note)', copy.buyText);
    setText('.disclaimer-box > h3', copy.disclaimerTitle);
    setText('.partner-sec .sec-pill', copy.partnerPill);
    setText('.partner-sec h2', copy.partnerTitle);
    setText('.faq-sec .sec-pill', copy.faqPill);
    setText('.faq-sec h2', copy.faqTitle);
    setText('.cta-sec h2', copy.ctaTitle);
    setText('.cta-sec p', copy.ctaText);
    document.querySelector('label[for="site-language"]')?.setAttribute('aria-label', copy.languageLabel);
  };

  const initializeLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('lang');
    const remembered = savedLanguage();
    const browser = navigator.language;
    const locale = supported.includes(requested) ? requested : supported.includes(remembered) ? remembered : supported.includes(browser) ? browser : fallback;
    const selector = document.getElementById('site-language');
    if (selector) {
      selector.value = locale;
      selector.addEventListener('change', () => {
        rememberLanguage(selector.value);
        const next = new URL(window.location.href);
        selector.value === fallback ? next.searchParams.delete('lang') : next.searchParams.set('lang', selector.value);
        // Reload from the original Traditional Chinese document before applying
        // the selected locale. This makes repeated switches deterministic.
        window.location.assign(next.toString());
      });
    }
    applyLocale(locale);
    if (locale !== fallback) {
      // The translations are a regular script, rather than a fetched JSON
      // file, so the language picker also works when the site is previewed
      // directly from a local HTML file.
      translateRemainingPageCopy(window.ESIM_MANAGER_TRANSLATIONS?.[locale]);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage, { once: true });
  } else {
    initializeLanguage();
  }
})();
