'use client';

import { useEffect } from 'react';

// Translation data
const translations: Record<string, Record<string, string>> = {
  ka: {
    heroSubtitle1: 'ბარი & სამზარეულო',
    heroSubtitle2: 'ხელნაკეთი კოქტეილები',
    heroSubtitle3: 'ბათუმი',
    heroReviews: 'შეფასება',
    marquee: 'AKADEMIKOSI · BAR & KITCHEN · BATUMI · AKADEMIKOSI · BAR & KITCHEN · BATUMI · ',
    aboutQuote: 'სადაც ხელოვნება კულტურას ხვდება',
    aboutLabel1: 'სივრცე',
    aboutText1: 'აკადემიკოსი არის ადგილი, სადაც ხელოვნება, მუსიკა და გემოვნება ერთმანეთს ხვდება.',
    aboutLabel2: 'ჩვენი ფილოსოფია',
    aboutText2: 'ჩვენ გვჯერა ხელნაკეთი კოქტეილის რიტუალის, გულწრფელი საჭმლის სითბოს და იმ მაგიის, რომელიც ხდება როცა უცნობები მეგობრებად იქცევიან საერთო მაგიდასთან.',
    aboutLabel3: 'გამოცდილება',
    aboutText3: 'ანდერგრაუნდ ჯემ-სესიებიდან Jupiter Nights-მდე — ყოველი საღამო განსხვავებულ ისტორიას ყვება. შემოგვიერთდი ბათუმის გულში.',
    menuTitle: 'მენიუ',
    menuCat1: 'ხელნაკეთი კოქტეილები — 22₾',
    menuCat2: 'კლასიკური კოქტეილები',
    menuCat3: 'სპირტიანი სასმელები',
    menuCat4: 'ლუდი',
    eventsTitle: 'ივენთები',
    eventDay1: 'ოთხშაბათი',
    eventName1: 'Underground Jam',
    eventTime1: '21:00 — ღია მიკროფონი',
    eventDay2: 'პარასკევი',
    eventName2: 'Jupiter Nights',
    eventTime2: '23:00 — DJ სეტი',
    eventDay3: 'შაბათი',
    eventName3: 'ცოცხალი მუსიკა',
    eventTime3: '22:00 — მოწვეული არტისტები',
    contactTitle: 'ეწვიეთ',
    contactLabel1: 'მისამართი',
    contactLabel2: 'სამუშაო საათები',
    contactHours: 'ორშ—ოთხ: 19:00—02:00<br>ხუთ: დასვენება<br>პარ—კვი: 19:00—03:00',
    contactLabel3: 'კონტაქტი',
    contactLabel4: 'სოციალური',
    shareTitle: 'გაუზიარე მეგობარს',
    shareSubtitle: 'გააზიარე რიტუალი',
    shareBtnNative: 'გაზიარება',
    shareQrText: 'დაასკანერე სანახავად',
    footerText: '<span class="geo">აკადემიკოსი</span> · © 2026',
  },
  en: {
    heroSubtitle1: 'Bar & Kitchen',
    heroSubtitle2: 'Craft Cocktails',
    heroSubtitle3: 'Batumi',
    heroReviews: 'reviews',
    marquee: 'AKADEMIKOSI · BAR & KITCHEN · BATUMI · AKADEMIKOSI · BAR & KITCHEN · BATUMI · ',
    aboutQuote: 'Where craft meets culture',
    aboutLabel1: 'The Space',
    aboutText1: 'Akademikosi is a place where art, music and taste meet.',
    aboutLabel2: 'Our Philosophy',
    aboutText2: 'We believe in the ritual of a well-crafted cocktail, the warmth of honest food, and the magic that happens when strangers become friends over shared tables.',
    aboutLabel3: 'Experience',
    aboutText3: 'From underground jam sessions to Jupiter nights, every evening tells a different story. Join us in the heart of Batumi.',
    menuTitle: 'Menu',
    menuCat1: 'Hand Crafted Cocktails — 22₾',
    menuCat2: 'Classic Cocktails',
    menuCat3: 'Spirits',
    menuCat4: 'Beer',
    eventsTitle: 'Events',
    eventDay1: 'Wednesday',
    eventName1: 'Underground Jam',
    eventTime1: '21:00 — Open Mic Night',
    eventDay2: 'Friday',
    eventName2: 'Jupiter Nights',
    eventTime2: '23:00 — DJ Set',
    eventDay3: 'Saturday',
    eventName3: 'Live Bands',
    eventTime3: '22:00 — Featured Artists',
    contactTitle: 'Visit',
    contactLabel1: 'Location',
    contactLabel2: 'Hours',
    contactHours: 'Mon—Wed: 7pm—2am<br>Thu: Closed<br>Fri—Sun: 7pm—3am',
    contactLabel3: 'Contact',
    contactLabel4: 'Social',
    shareTitle: 'Share with friends',
    shareSubtitle: 'Share the ritual',
    shareBtnNative: 'Share',
    shareQrText: 'Scan to visit',
    footerText: 'Akademikosi · © 2026',
  },
  uk: {
    heroSubtitle1: 'Бар і Кухня',
    heroSubtitle2: 'Авторські коктейлі',
    heroSubtitle3: 'Батумі',
    heroReviews: 'відгуків',
    marquee: 'AKADEMIKOSI · БАР І КУХНЯ · БАТУМІ · AKADEMIKOSI · БАР І КУХНЯ · БАТУМІ · ',
    aboutQuote: 'Де ремесло зустрічає культуру',
    aboutLabel1: 'Простір',
    aboutText1: 'Akademikosi — це місце, де зустрічаються мистецтво, музика і смак.',
    aboutLabel2: 'Наша Філософія',
    aboutText2: 'Ми віримо в ритуал добре приготовленого коктейлю, тепло чесної їжі і магію, що відбувається, коли незнайомці стають друзями за спільними столами.',
    aboutLabel3: 'Досвід',
    aboutText3: 'Від андеграундних джем-сесій до вечорів Юпітера — кожен вечір розповідає свою історію. Приєднуйтесь до нас у серці Батумі.',
    menuTitle: 'Меню',
    menuCat1: 'Авторські коктейлі — 22₾',
    menuCat2: 'Класичні коктейлі',
    menuCat3: 'Міцні напої',
    menuCat4: 'Пиво',
    eventsTitle: 'Події',
    eventDay1: 'Середа',
    eventName1: 'Underground Jam',
    eventTime1: '21:00 — Відкритий мікрофон',
    eventDay2: "П'ятниця",
    eventName2: 'Jupiter Nights',
    eventTime2: '23:00 — DJ сет',
    eventDay3: 'Субота',
    eventName3: 'Живі гурти',
    eventTime3: '22:00 — Запрошені артисти',
    contactTitle: 'Відвідати',
    contactLabel1: 'Адреса',
    contactLabel2: 'Години роботи',
    contactHours: 'Пн—Ср: 19:00—02:00<br>Чт: Зачинено<br>Пт—Нд: 19:00—03:00',
    contactLabel3: 'Контакт',
    contactLabel4: 'Соцмережі',
    shareTitle: 'Поділитися з друзями',
    shareSubtitle: 'Поділіться ритуалом',
    shareBtnNative: 'Поділитися',
    shareQrText: 'Скануйте для відвідування',
    footerText: 'Akademikosi · © 2026',
  },
};
export default function HomePage() {
  useEffect(() => {
    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((reveal) => {
      revealObserver.observe(reveal);
    });

    // --- Lazy Load Map ---
    const mapIframe = document.querySelector<HTMLIFrameElement>('.contact-map iframe');
    if (mapIframe) {
      const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mapIframe.dataset.src) {
            mapIframe.src = mapIframe.dataset.src;
            mapObserver.unobserve(entry.target);
          }
        });
      });
      mapObserver.observe(mapIframe);
    }



    // --- Smooth Scroll for anchor links ---
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });

    // --- QR Code (via CDN library) ---
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
    script.async = true;
    script.onload = () => {
      const qr = (window as any).qrcode(0, 'M');
      qr.addData('https://akademikosi.pages.dev');
      qr.make();
      const qrContainer = document.getElementById('qrcode');
      if (qrContainer) {
        qrContainer.innerHTML = qr.createSvgTag({ cellSize: 5, margin: 0, scalable: true });
        const svg = qrContainer.querySelector('svg');
        if (svg) {
          svg.style.width = '160px';
          svg.style.height = '160px';
        }
      }
    };
    document.body.appendChild(script);

    // --- Native Share ---
    const nativeShareBtn = document.getElementById('nativeShareBtn');
    if (typeof navigator.share === 'function' && nativeShareBtn) {
      nativeShareBtn.style.display = 'inline-flex';
    }

    // --- Theme and Language Logic ---
    const savedLang = localStorage.getItem('akademikosi_lang') || 'ka';
    const savedTheme = localStorage.getItem('akademikosi_theme') || 'night';

    // Apply theme on load
    if (savedTheme === 'day') {
      document.body.classList.add('day-mode');
    }

    // Language switcher
    const langBtns = document.querySelectorAll<HTMLButtonElement>('.ctrl-btn[data-lang]');
    langBtns.forEach((btn) => {
      if (btn.dataset.lang === savedLang) {
        btn.classList.add('active');
      }
    });

    // Helper functions for translations
    const _s = (sel: string, val: string) => {
      const el = document.querySelector(sel);
      if (el) el.innerHTML = val;
    };
    const _sa = (sel: string, idx: number, val: string) => {
      const els = document.querySelectorAll(sel);
      if (els[idx]) els[idx].innerHTML = val;
    };

    const applyTranslations = (lang: string) => {
      const t = translations[lang];
      if (!t) return;
      document.documentElement.lang = lang;

      // Hero
      _sa('.hero-meta span', 0, t.heroSubtitle1);
      _sa('.hero-meta span', 1, t.heroSubtitle2);
      _sa('.hero-meta span', 2, t.heroSubtitle3);

      // Marquee
      document.querySelectorAll('.marquee-content').forEach((el) => {
        el.innerHTML = t.marquee;
      });

      // About
      _s('.about-quote', t.aboutQuote);
      _sa('.about-label', 0, t.aboutLabel1);
      _sa('.about-info', 0, t.aboutText1);
      _sa('.about-label', 1, t.aboutLabel2);
      _sa('.about-info', 1, t.aboutText2);
      _sa('.about-label', 2, t.aboutLabel3);
      _sa('.about-info', 2, t.aboutText3);

      // Menu
      _s('.menu-header', t.menuTitle);
      _sa('.menu-category h3', 0, t.menuCat1);
      _sa('.menu-category h3', 1, t.menuCat2);
      _sa('.menu-category h3', 2, t.menuCat3);
      _sa('.menu-category h3', 3, t.menuCat4);

      // Events
      _s('.events-header', t.eventsTitle);
      _sa('.event-day', 0, t.eventDay1);
      _sa('.event-name', 0, t.eventName1);
      _sa('.event-time', 0, t.eventTime1);
      _sa('.event-day', 1, t.eventDay2);
      _sa('.event-name', 1, t.eventName2);
      _sa('.event-time', 1, t.eventTime2);
      _sa('.event-day', 2, t.eventDay3);
      _sa('.event-name', 2, t.eventName3);
      _sa('.event-time', 2, t.eventTime3);

      // Contact
      _s('.contact-header', t.contactTitle);
      _sa('.contact-block h3', 0, t.contactLabel1);
      _sa('.contact-block h3', 1, t.contactLabel2);
      _sa('.contact-block h3', 2, t.contactLabel3);
      _sa('.contact-block h3', 3, t.contactLabel4);

      // Share
      _s('.share-title', t.shareTitle);

      // Fix font for Georgian headers
      const geoHeaders = ['.menu-header', '.events-header', '.contact-header', '.about-quote'];
      geoHeaders.forEach((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (el) {
          el.style.fontFamily =
            lang === 'ka'
              ? "'Noto Serif Georgian', serif"
              : "'Instrument Serif', serif";
          el.style.fontStyle = 'italic';
        }
      });

      localStorage.setItem('akademikosi_lang', lang);
    };

    // Attach language switcher
    langBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang!;
        langBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        applyTranslations(lang);
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    let isDayMode = savedTheme === 'day';

    const applyTheme = () => {
      if (isDayMode) {
        document.body.classList.add('day-mode');
        if (themeBtn) themeBtn.textContent = '☾';
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', '#ffffff');
      } else {
        document.body.classList.remove('day-mode');
        if (themeBtn) themeBtn.textContent = '☀';
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', '#0a0a0a');
      }
      localStorage.setItem('akademikosi_theme', isDayMode ? 'day' : 'night');
    };

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        isDayMode = !isDayMode;
        applyTheme();
      });
    }

    // Apply saved state on load
    applyTranslations(savedLang);
    applyTheme();

    // Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }

    // Cleanup
    return () => {
      revealObserver.disconnect();
      document.body.removeChild(script);
    };
  }, []);

  // Native share function (must be global for inline onclick)
  useEffect(() => {
    (window as any).nativeShare = () => {
      navigator
        .share({
          title: 'აკადემიკოსი · Akademikosi',
          text: 'აკადემიკოსი — ბარი & სამზარეულო 🍸',
          url: 'https://akademikosi.pages.dev',
        })
        .catch(() => {});
    };
  }, []);

  return (
    <>
      {/* Controls: Language + Theme */}
      <div className="controls-bar">
        <button className="ctrl-btn active" data-lang="ka">
          ქა
        </button>
        <button className="ctrl-btn" data-lang="en">
          EN
        </button>
        <button className="ctrl-btn" data-lang="uk">
          UK
        </button>
        <div className="ctrl-divider"></div>
        <button className="ctrl-btn theme-btn" id="themeToggle" title="Day/Night">
          ☀
        </button>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-logo">
          <img
            src="/logo.png"
            className="hero-logo-img"
            alt="Akademikosi Logo"
          />
        </div>
        <div className="hero-meta">
          <span className="geo">ბარი & სამზარეულო</span>
          <span>Bar & Kitchen</span>
          <span className="geo">ბათუმი</span>
        </div>
        <div className="hero-rating">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>★★★★★</div>
          <div>4.7 / 5.0</div>
          <div style={{ marginTop: '0.3rem', opacity: 0.7 }}>39 reviews</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee">
          <div className="marquee-content">
            AKADEMIKOSI · BAR & KITCHEN · BATUMI · AKADEMIKOSI · BAR & KITCHEN · BATUMI ·{' '}
          </div>
          <div className="marquee-content">
            AKADEMIKOSI · BAR & KITCHEN · BATUMI · AKADEMIKOSI · BAR & KITCHEN · BATUMI ·{' '}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-quote reveal">Where craft meets culture</div>
        <div className="about-text reveal">
          <div>
            <p className="about-label">The Space</p>
            <p className="about-info geo">
              აკადემიკოსი არის ადგილი, სადაც ხელოვნება, მუსიკა და გემოვნება ერთმანეთს ხვდება.
            </p>
          </div>
          <div>
            <p className="about-label">Our Philosophy</p>
            <p className="about-info">
              We believe in the ritual of a well-crafted cocktail, the warmth of honest food, and
              the magic that happens when strangers become friends over shared tables.
            </p>
          </div>
          <div>
            <p className="about-label">Experience</p>
            <p className="about-info">
              From underground jam sessions to Jupiter nights, every evening tells a different
              story. Join us in the heart of Batumi.
            </p>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu" id="menu">
        <h2 className="menu-header reveal">Menu</h2>
        <div className="menu-grid">
          <div className="menu-category reveal">
            <h3>Hand Crafted Cocktails — 22₾</h3>
            <div className="menu-item">
              <span className="menu-name">
                Akademikosi
                <br />
                <small style={{ fontWeight: 300, fontSize: '0.7em', opacity: 0.5 }}>Bitter</small>
              </span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">
                Harvest
                <br />
                <small style={{ fontWeight: 300, fontSize: '0.7em', opacity: 0.5 }}>
                  Spicy, Chilli
                </small>
              </span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">
                Bubble Freeze
                <br />
                <small style={{ fontWeight: 300, fontSize: '0.7em', opacity: 0.5 }}>
                  Tropical
                </small>
              </span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">
                Berry Gimlet
                <br />
                <small style={{ fontWeight: 300, fontSize: '0.7em', opacity: 0.5 }}>
                  Tropical
                </small>
              </span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">
                Dream
                <br />
                <small style={{ fontWeight: 300, fontSize: '0.7em', opacity: 0.5 }}>
                  Sweet, Creamy
                </small>
              </span>
              <span className="menu-price">22₾</span>
            </div>
          </div>

          <div className="menu-category reveal">
            <h3>Classic Cocktails</h3>
            <div className="menu-item">
              <span className="menu-name">Negroni</span>
              <span className="menu-price">20₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Whiskey Sour</span>
              <span className="menu-price">19₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Gin Sour Maracuya</span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Aperol / Limoncello Spritz</span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Mai Tai</span>
              <span className="menu-price">19₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Daiquiri / Margarita</span>
              <span className="menu-price">19₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Old Fashioned</span>
              <span className="menu-price">19₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Espresso Martini</span>
              <span className="menu-price">19₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Gin Breeze / Basil Smash</span>
              <span className="menu-price">19₾</span>
            </div>
          </div>

          <div className="menu-category reveal">
            <h3>Spirits</h3>
            <div className="menu-item">
              <span className="menu-name">Aperol</span>
              <span className="menu-price">11₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Campari</span>
              <span className="menu-price">12₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Jagermeister</span>
              <span className="menu-price">10₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Limoncello</span>
              <span className="menu-price">11₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Absolut</span>
              <span className="menu-price">10₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Gray Goose</span>
              <span className="menu-price">20₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Tullamore Dew</span>
              <span className="menu-price">14₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Jameson</span>
              <span className="menu-price">15₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">{`Jack Daniel's`}</span>
              <span className="menu-price">16₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Monkey Shoulder</span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">{`Hendrick's`}</span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">The Botanist</span>
              <span className="menu-price">22₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Beefeater</span>
              <span className="menu-price">12₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Tanqueray</span>
              <span className="menu-price">15₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Bombay</span>
              <span className="menu-price">16₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Captain Morgan</span>
              <span className="menu-price">11₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Havana Club</span>
              <span className="menu-price">13₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Bacardi</span>
              <span className="menu-price">12₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Hennessy VS</span>
              <span className="menu-price">29₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Milagro Reposado</span>
              <span className="menu-price">18₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Jose Cuervo</span>
              <span className="menu-price">14₾</span>
            </div>
          </div>

          <div className="menu-category reveal">
            <h3>Beer</h3>
            <div className="menu-item">
              <span className="menu-name">Heineken</span>
              <span className="menu-price">12₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Corona</span>
              <span className="menu-price">14₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Estrella</span>
              <span className="menu-price">11₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Lowenbrau</span>
              <span className="menu-price">12₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Tuati</span>
              <span className="menu-price">15₾</span>
            </div>
            <div className="menu-item">
              <span className="menu-name">Cider</span>
              <span className="menu-price">17/38₾</span>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="events" id="events">
        <h2 className="events-header reveal">Events</h2>
        <div className="events-grid">
          <div className="event-card reveal">
            <div className="event-day">Wednesday</div>
            <div className="event-name">Underground Jam</div>
            <div className="event-time">21:00 — Open Mic Night</div>
          </div>

          <div className="event-card reveal">
            <div className="event-day">Friday</div>
            <div className="event-name">Jupiter Nights</div>
            <div className="event-time">23:00 — DJ Set</div>
          </div>

          <div className="event-card reveal">
            <div className="event-day">Saturday</div>
            <div className="event-name">Live Bands</div>
            <div className="event-time">22:00 — Featured Artists</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <h2 className="contact-header reveal">Visit</h2>
        <div className="contact-content">
          <div className="contact-info reveal">
            <div className="contact-block">
              <h3>Location</h3>
              <p className="geo">
                ნოე ჟორდანიას 35/37
                <br />
                ბათუმი, საქართველო
              </p>
            </div>

            <div className="contact-block">
              <h3>Hours</h3>
              <p>
                Mon—Wed: 19:00—02:00
                <br />
                Thu: Closed
                <br />
                Fri—Sun: 19:00—03:00
              </p>
            </div>

            <div className="contact-block">
              <h3>Contact</h3>
              <p>
                <a href="tel:599921663">599 92 16 63</a>
              </p>
            </div>

            <div className="contact-block">
              <h3>Social</h3>
              <p>
                <a
                  href="https://www.instagram.com/bar_akademikosi"
                  target="_blank"
                  rel="noopener"
                >
                  Instagram
                </a>
                <br />
                <a
                  href="https://www.facebook.com/share/1CUGiQmwn4/"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </a>
              </p>
            </div>
          </div>

          <div className="contact-map reveal">
            <iframe
              loading="lazy"
              data-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.234!2d41.641!3d41.641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM4JzI3LjYiTiA0McKwMzgnMjcuNiJF!5e0!3m2!1sen!2sge!4v1234567890"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* SHARE & QR */}
      <section className="share-section" id="share">
        <div className="share-inner">
          <h2
            className="share-title"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem,5vw,3.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            გაუზიარე მეგობარს
          </h2>
          <p
            style={{
              textAlign: 'center',
              opacity: 0.4,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
            }}
          >
            Share the ritual
          </p>

          <div className="share-buttons">
            <button
              onClick={() => (window as any).nativeShare()}
              className="share-btn"
              id="nativeShareBtn"
              style={{ display: 'none' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              <span>Share</span>
            </button>
            <a
              href="https://wa.me/?text=%E1%83%90%E1%83%99%E1%83%90%E1%83%93%E1%83%94%E1%83%9B%E1%83%98%E1%83%99%E1%83%9D%E1%83%A1%E1%83%98%20%C2%B7%20Akademikosi%20%F0%9F%8D%B8%20https://akademikosi.pages.dev"
              target="_blank"
              className="share-btn share-wa"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.616l4.54-1.472A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.327-.69-6.05-1.865l-.424-.29-2.691.872.892-2.632-.318-.466A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://akademikosi.pages.dev"
              target="_blank"
              className="share-btn share-fb"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>

          <div
            className="qr-container"
            style={{ marginTop: '3rem', textAlign: 'center' }}
          >
            <div
              id="qrcode"
              style={{
                display: 'inline-block',
                background: '#fff',
                padding: '16px',
              }}
            ></div>
            <p
              style={{
                opacity: 0.3,
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '1rem',
              }}
            >
              Scan to visit
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <img
            src="/logo.png"
            className="footer-logo-img"
            alt="Akademikosi Logo"
          />
        </div>
        <div className="footer-text">
          <span className="geo">აკადემიკოსი</span> · Akademikosi · © 2026
          <br />
          <small
            style={{
              opacity: 0.3,
              fontSize: '0.65em',
              letterSpacing: '0.15em',
            }}
          >
            Website by{' '}
            <a
              href="https://sitech.ge"
              target="_blank"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              SiTech
            </a>
          </small>
        </div>
      </footer>
    </>
  );
}
