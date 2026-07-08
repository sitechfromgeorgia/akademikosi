'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FALLBACK_MENU, FALLBACK_EVENTS, FallbackCategory, FallbackEvent } from '@/lib/fallbackData';

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
  const [menu, setMenu] = useState<FallbackCategory[]>(() =>
    FALLBACK_MENU.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.is_available),
    })).filter((cat) => cat.items.length > 0)
  );
  const [events, setEvents] = useState<FallbackEvent[]>(FALLBACK_EVENTS);
  const [currentLang, setCurrentLang] = useState('ka');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isManualScroll, setIsManualScroll] = useState(false);

  // Sync language state on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('akademikosi_lang') || 'ka';
    setCurrentLang(savedLang);
  }, []);

  // Fetch data from Supabase client-side
  useEffect(() => {
    async function fetchData() {
      if (!supabase) return;

      try {
        // Fetch Categories
        const { data: categoriesData, error: catError } = await supabase
          .from('menu_categories')
          .select('*')
          .order('order_index', { ascending: true });

        if (catError) throw catError;

        // Fetch Menu Items
        const { data: itemsData, error: itemsError } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true)
          .order('order_index', { ascending: true });

        if (itemsError) throw itemsError;

        // Map items to categories
        if (categoriesData) {
          const mappedMenu = categoriesData
            .map((cat: any) => ({
              id: cat.id,
              name_ka: cat.name_ka,
              name_en: cat.name_en,
              name_uk: cat.name_uk,
              order_index: cat.order_index,
              items: (itemsData || [])
                .filter((item: any) => item.category_id === cat.id)
                .map((item: any) => ({
                  id: item.id,
                  category_id: item.category_id,
                  name_ka: item.name_ka,
                  name_en: item.name_en,
                  name_uk: item.name_uk,
                  description_ka: item.description_ka,
                  description_en: item.description_en,
                  description_uk: item.description_uk,
                  price: item.price,
                  is_available: item.is_available,
                  order_index: item.order_index,
                  image_url: item.image_url,
                })),
            }))
            .filter((cat: any) => cat.items.length > 0);
          setMenu(mappedMenu);
        }

        // Fetch Events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('order_index', { ascending: true });

        if (eventsError) throw eventsError;

        if (eventsData) {
          setEvents(eventsData);
        }
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
      }
    }

    fetchData();
  }, []);

  // Separate IntersectionObserver for dynamic reveal elements
  useEffect(() => {
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

    return () => {
      revealObserver.disconnect();
    };
  }, [menu, events]);

  // Observe category elements to update active navigation tab
  useEffect(() => {
    const categoryElements = document.querySelectorAll('.menu-category');
    const intersectingMap = new Map<string, boolean>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        intersectingMap.set(entry.target.id, entry.isIntersecting);
      });

      // Ignore observer updates if we are scrolling manually
      if (isManualScroll) return;

      // Find the first intersecting category (the one highest on the page)
      const active = Array.from(categoryElements)
        .find((el) => intersectingMap.get(el.id));
        
      if (active) {
        setActiveCategory(active.id);
      }
    }, {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: 0
    });

    categoryElements.forEach((el) => observer.observe(el));

    // Clear active state if we scroll completely out of the menu section
    const menuSection = document.getElementById('menu');
    let menuObserver: IntersectionObserver | null = null;
    if (menuSection) {
      menuObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !isManualScroll) {
            setActiveCategory('');
          }
        });
      }, { root: null, rootMargin: '-120px 0px 0px 0px', threshold: 0 });
      menuObserver.observe(menuSection);
    }

    return () => {
      observer.disconnect();
      if (menuObserver) menuObserver.disconnect();
    };
  }, [menu, isManualScroll]);

  // Auto-scroll the active category button into view within the horizontal category nav
  useEffect(() => {
    if (!activeCategory) return;
    const activeBtn = document.querySelector(`.category-nav-btn.active`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  useEffect(() => {

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
      qr.addData('https://akademikosi.ge/');
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

      // Events
      _s('.events-header', t.eventsTitle);

      // Contact
      _s('.contact-header', t.contactTitle);
      _sa('.contact-block h3', 0, t.contactLabel1);
      _sa('.contact-block h3', 1, t.contactLabel2);
      _sa('.contact-block h3', 2, t.contactLabel3);
      _sa('.contact-block h3', 3, t.contactLabel4);

      // Share
      _s('.share-title', t.shareTitle);
      _s('.share-subtitle', t.shareSubtitle);
      _s('.qr-scan-label', t.shareQrText);
      _s('#nativeShareBtn span', t.shareBtnNative);

      localStorage.setItem('akademikosi_lang', lang);
    };

    // Attach language switcher
    langBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang!;
        setCurrentLang(lang);
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
          url: 'https://akademikosi.ge/',
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
            <p className="about-info">
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

        {/* Category Navigation Bar */}
        <div className="category-nav-wrapper reveal">
          <div className="category-nav">
            {menu.filter((cat) => cat.items.length > 0).map((cat) => (
              <button
                key={cat.id}
                className={`category-nav-btn ${activeCategory === `category-${cat.id}` ? 'active' : ''}`}
                onClick={() => {
                  const el = document.getElementById(`category-${cat.id}`);
                  if (el) {
                    const headerOffset = 100;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    setIsManualScroll(true);
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    
                    setActiveCategory(`category-${cat.id}`);
                    
                    setTimeout(() => {
                      setIsManualScroll(false);
                    }, 800);
                  }
                }}
              >
                {currentLang === 'ka'
                  ? cat.name_ka
                  : currentLang === 'en'
                  ? cat.name_en
                  : cat.name_uk}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {menu.filter((cat) => cat.items.length > 0).map((cat) => (
            <div className="menu-category reveal" key={cat.id} id={`category-${cat.id}`}>
              <h3>
                {currentLang === 'ka'
                  ? cat.name_ka
                  : currentLang === 'en'
                  ? cat.name_en
                  : cat.name_uk}
              </h3>
              {cat.items.map((item) => (
                <div className={`menu-item${item.image_url ? ' has-image' : ''}`} key={item.id}>
                  {item.image_url && (
                    <div className="menu-item-image-wrapper">
                      <img
                        src={item.image_url}
                        alt={
                          currentLang === 'ka'
                            ? item.name_ka
                            : currentLang === 'en'
                            ? item.name_en
                            : item.name_uk
                        }
                        className="menu-item-image"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="menu-item-info">
                    <div className="menu-item-main">
                      <span className="menu-name">
                        {currentLang === 'ka'
                          ? item.name_ka
                          : currentLang === 'en'
                          ? item.name_en
                          : item.name_uk}
                      </span>
                      {!item.image_url && <span className="menu-leader"></span>}
                      <span className="menu-price">{item.price}₾</span>
                    </div>
                    {(currentLang === 'ka'
                      ? item.description_ka
                      : currentLang === 'en'
                      ? item.description_en
                      : item.description_uk) && (
                      <small className="menu-description">
                        {currentLang === 'ka'
                          ? item.description_ka
                          : currentLang === 'en'
                          ? item.description_en
                          : item.description_uk}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="events" id="events">
        <h2 className="events-header reveal">Events</h2>
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card reveal" key={event.id}>
              <div className="event-day">
                {currentLang === 'ka'
                  ? event.event_day_ka
                  : currentLang === 'en'
                  ? event.event_day_en
                  : event.event_day_uk}
              </div>
              <div className="event-name">
                {currentLang === 'ka'
                  ? event.title_ka
                  : currentLang === 'en'
                  ? event.title_en
                  : event.title_uk}
              </div>
              <div className="event-time">
                {event.event_time}
                {(currentLang === 'ka'
                  ? event.description_ka
                  : currentLang === 'en'
                  ? event.description_en
                  : event.description_uk) && (
                  <>
                    {' — '}
                    {currentLang === 'ka'
                      ? event.description_ka
                      : currentLang === 'en'
                      ? event.description_en
                      : event.description_uk}
                  </>
                )}
              </div>
            </div>
          ))}
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
                <a
                  href="https://maps.app.goo.gl/5qqo9CdV2zH1my5b9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ნოე ჟორდანიას 35/37
                  <br />
                  ბათუმი, საქართველო
                </a>
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
                  href="https://www.facebook.com/profile.php?id=61572941232629"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </p>
            </div>
          </div>

          <div className="contact-map reveal">
            <iframe
              loading="lazy"
              data-src="https://maps.google.com/maps?q=41.6499484,41.6395424&t=&z=17&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* SHARE & QR */}
      <section className="share-section" id="share">
        <div className="share-inner">
          <h2 className="share-title">
            გაუზიარე მეგობარს
          </h2>
          <p className="share-subtitle">
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
              href="https://wa.me/?text=%E1%83%90%E1%83%99%E1%83%90%E1%83%93%E1%83%94%E1%83%9B%E1%83%98%E1%83%99%E1%83%9D%E1%83%A1%E1%83%98%20%C2%B7%20Akademikosi%20%F0%9F%8D%B8%20https://akademikosi.ge/"
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
              href="https://www.facebook.com/sharer/sharer.php?u=https://akademikosi.ge/"
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

          <div className="qr-block-wrapper">
            <div id="qrcode" className="qr-code-box"></div>
            <p className="qr-scan-label">
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
              opacity: 0.4,
              fontSize: '0.7em',
              letterSpacing: '0.05em',
              marginTop: '0.5rem',
              display: 'block',
            }}
          >
            დამზადებულია სიყვარულით{' '}
            <a
              href="https://sitech.ge"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.25)',
                fontWeight: 600,
                transition: 'border-color 0.3s ease',
              }}
            >
              SiTech
            </a>
            -ის მიერ ❤️
          </small>
        </div>
      </footer>
    </>
  );
}
