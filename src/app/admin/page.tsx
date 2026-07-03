'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const WEEKDAY_TRANSLATIONS = {
  monday: { ka: 'ორშაბათი', en: 'Monday', uk: 'Понеділок' },
  tuesday: { ka: 'სამშაბათი', en: 'Tuesday', uk: 'Вівторок' },
  wednesday: { ka: 'ოთხშაბათი', en: 'Wednesday', uk: 'Середа' },
  thursday: { ka: 'ხუთშაბათი', en: 'Thursday', uk: 'Четвер' },
  friday: { ka: 'პარასკევი', en: 'Friday', uk: "П'ятниця" },
  saturday: { ka: 'შაბათი', en: 'Saturday', uk: 'Субота' },
  sunday: { ka: 'კვირა', en: 'Sunday', uk: 'Неділя' }
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tabs
  const [activeTab, setActiveTab] = useState<'categories' | 'items' | 'events'>('categories');

  // Data States
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  // Selected Category for filtering items
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // Form States (Modals / Inputs)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'category' | 'item' | 'event'>('category');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Category Inputs
  const [catNameKa, setCatNameKa] = useState('');
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameUk, setCatNameUk] = useState('');

  // Item Inputs
  const [itemNameKa, setItemNameKa] = useState('');
  const [itemNameEn, setItemNameEn] = useState('');
  const [itemNameUk, setItemNameUk] = useState('');
  const [itemDescKa, setItemDescKa] = useState('');
  const [itemDescEn, setItemDescEn] = useState('');
  const [itemDescUk, setItemDescUk] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCatId, setItemCatId] = useState('');
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemModalTab, setItemModalTab] = useState<'general' | 'ka' | 'en' | 'uk'>('general');

  // Event Inputs
  const [eventTitleKa, setEventTitleKa] = useState('');
  const [eventTitleEn, setEventTitleEn] = useState('');
  const [eventTitleUk, setEventTitleUk] = useState('');
  const [eventDescKa, setEventDescKa] = useState('');
  const [eventDescEn, setEventDescEn] = useState('');
  const [eventDescUk, setEventDescUk] = useState('');
  const [eventDayKa, setEventDayKa] = useState('');
  const [eventDayEn, setEventDayEn] = useState('');
  const [eventDayUk, setEventDayUk] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventModalTab, setEventModalTab] = useState<'general' | 'ka' | 'en' | 'uk'>('general');
  const [eventDayWeekday, setEventDayWeekday] = useState<string>('custom');

  // Dropdown translation handler
  const handleWeekdayChange = (weekday: string) => {
    setEventDayWeekday(weekday);
    if (weekday !== 'custom') {
      const trans = WEEKDAY_TRANSLATIONS[weekday as keyof typeof WEEKDAY_TRANSLATIONS];
      if (trans) {
        setEventDayKa(trans.ka);
        setEventDayEn(trans.en);
        setEventDayUk(trans.uk);
      }
    }
  };

  // 0. Theme Isolation: Admin panel is always dark theme
  useEffect(() => {
    document.body.classList.remove('day-mode');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#0a0a0a');
  }, []);

  // 1. Auth check
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Data when authenticated
  useEffect(() => {
    if (!session || !supabase) return;

    fetchCategories();
    fetchItems();
    fetchEvents();
  }, [session]);

  // Fetch functions
  const fetchCategories = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('menu_categories')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) {
      setCategories(data);
      if (data.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(data[0].id);
      }
    }
  };

  const fetchItems = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setItems(data);
  };

  const fetchEvents = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setEvents(data);
  };

  // Auth Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  // CRUD Handlers - Categories
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    const catData = {
      name_ka: catNameKa,
      name_en: catNameEn,
      name_uk: catNameUk,
    };

    if (editingId) {
      await supabase.from('menu_categories').update(catData).eq('id', editingId);
    } else {
      // Calculate order_index
      const nextIndex = categories.length;
      await supabase.from('menu_categories').insert({ ...catData, order_index: nextIndex });
    }

    closeModal();
    fetchCategories();
  };

  const handleDeleteCategory = async (id: string) => {
    if (!supabase || !confirm('Are you sure you want to delete this category and all its items?')) return;
    await supabase.from('menu_categories').delete().eq('id', id);
    fetchCategories();
    fetchItems();
  };

  const moveCategory = async (index: number, direction: 'up' | 'down') => {
    if (!supabase) return;
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    // Swap order_indexes
    const temp = newCategories[index].order_index;
    newCategories[index].order_index = newCategories[targetIndex].order_index;
    newCategories[targetIndex].order_index = temp;

    // Update in database parallelly to eliminate lag
    await Promise.all([
      supabase
        .from('menu_categories')
        .update({ order_index: newCategories[index].order_index })
        .eq('id', newCategories[index].id),
      supabase
        .from('menu_categories')
        .update({ order_index: newCategories[targetIndex].order_index })
        .eq('id', newCategories[targetIndex].id)
    ]);

    fetchCategories();
  };

  // CRUD Handlers - Menu Items
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    const itemData = {
      category_id: itemCatId,
      name_ka: itemNameKa,
      name_en: itemNameEn,
      name_uk: itemNameUk,
      description_ka: itemDescKa || null,
      description_en: itemDescEn || null,
      description_uk: itemDescUk || null,
      price: itemPrice,
      is_available: itemAvailable,
      image_url: itemImageUrl || null,
    };

    if (editingId) {
      await supabase.from('menu_items').update(itemData).eq('id', editingId);
    } else {
      const catItems = items.filter((i) => i.category_id === itemCatId);
      const nextIndex = catItems.length;
      await supabase.from('menu_items').insert({ ...itemData, order_index: nextIndex });
    }

    closeModal();
    fetchItems();
  };

  const handleDeleteItem = async (id: string) => {
    if (!supabase || !confirm('Are you sure you want to delete this item?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
    fetchItems();
  };

  const moveItem = async (filteredIndex: number, direction: 'up' | 'down', catItems: any[]) => {
    if (!supabase) return;
    const targetIndex = direction === 'up' ? filteredIndex - 1 : filteredIndex + 1;

    if (targetIndex < 0 || targetIndex >= catItems.length) return;

    const temp = catItems[filteredIndex].order_index;
    
    await Promise.all([
      supabase
        .from('menu_items')
        .update({ order_index: catItems[targetIndex].order_index })
        .eq('id', catItems[filteredIndex].id),
      supabase
        .from('menu_items')
        .update({ order_index: temp })
        .eq('id', catItems[targetIndex].id)
    ]);

    fetchItems();
  };

  const toggleItemAvailability = async (item: any) => {
    if (!supabase) return;
    await supabase
      .from('menu_items')
      .update({ is_available: !item.is_available })
      .eq('id', item.id);
    fetchItems();
  };

  // CRUD Handlers - Events
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    const eventData = {
      title_ka: eventTitleKa,
      title_en: eventTitleEn,
      title_uk: eventTitleUk,
      description_ka: eventDescKa || null,
      description_en: eventDescEn || null,
      description_uk: eventDescUk || null,
      event_day_ka: eventDayKa,
      event_day_en: eventDayEn,
      event_day_uk: eventDayUk,
      event_time: eventTime,
    };

    if (editingId) {
      await supabase.from('events').update(eventData).eq('id', editingId);
    } else {
      const nextIndex = events.length;
      await supabase.from('events').insert({ ...eventData, order_index: nextIndex });
    }

    closeModal();
    fetchEvents();
  };

  const handleDeleteEvent = async (id: string) => {
    if (!supabase || !confirm('Are you sure you want to delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  const moveEvent = async (index: number, direction: 'up' | 'down') => {
    if (!supabase) return;
    const newEvents = [...events];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newEvents.length) return;

    const temp = newEvents[index].order_index;
    newEvents[index].order_index = newEvents[targetIndex].order_index;
    newEvents[targetIndex].order_index = temp;

    // Swap indices parallelly to eliminate sequential network requests lag
    await Promise.all([
      supabase
        .from('events')
        .update({ order_index: newEvents[index].order_index })
        .eq('id', newEvents[index].id),
      supabase
        .from('events')
        .update({ order_index: newEvents[targetIndex].order_index })
        .eq('id', newEvents[targetIndex].id)
    ]);

    fetchEvents();
  };

  // Modal Openers
  const openCategoryModal = (cat: any = null) => {
    setModalType('category');
    if (cat) {
      setEditingId(cat.id);
      setCatNameKa(cat.name_ka);
      setCatNameEn(cat.name_en);
      setCatNameUk(cat.name_uk);
    } else {
      setEditingId(null);
      setCatNameKa('');
      setCatNameEn('');
      setCatNameUk('');
    }
    setIsModalOpen(true);
  };

  const openItemModal = (item: any = null) => {
    setModalType('item');
    setItemModalTab('general');
    if (item) {
      setEditingId(item.id);
      setItemCatId(item.category_id);
      setItemNameKa(item.name_ka);
      setItemNameEn(item.name_en);
      setItemNameUk(item.name_uk);
      setItemDescKa(item.description_ka || '');
      setItemDescEn(item.description_en || '');
      setItemDescUk(item.description_uk || '');
      setItemPrice(item.price);
      setItemAvailable(item.is_available);
      setItemImageUrl(item.image_url || '');
    } else {
      setEditingId(null);
      setItemCatId(selectedCategoryId || (categories[0]?.id || ''));
      setItemNameKa('');
      setItemNameEn('');
      setItemNameUk('');
      setItemDescKa('');
      setItemDescEn('');
      setItemDescUk('');
      setItemPrice('');
      setItemAvailable(true);
      setItemImageUrl('');
    }
    setIsModalOpen(true);
  };

  const openEventModal = (ev: any = null) => {
    setModalType('event');
    setEventModalTab('general');
    if (ev) {
      setEditingId(ev.id);
      setEventTitleKa(ev.title_ka);
      setEventTitleEn(ev.title_en);
      setEventTitleUk(ev.title_uk);
      setEventDescKa(ev.description_ka || '');
      setEventDescEn(ev.description_en || '');
      setEventDescUk(ev.description_uk || '');
      setEventDayKa(ev.event_day_ka);
      setEventDayEn(ev.event_day_en);
      setEventDayUk(ev.event_day_uk);
      setEventTime(ev.event_time);
      
      // Attempt to map translations to standard weekdays
      const matchedWeekday = Object.keys(WEEKDAY_TRANSLATIONS).find(key => {
        const trans = WEEKDAY_TRANSLATIONS[key as keyof typeof WEEKDAY_TRANSLATIONS];
        return trans.ka === ev.event_day_ka && trans.en === ev.event_day_en && trans.uk === ev.event_day_uk;
      });
      setEventDayWeekday(matchedWeekday || 'custom');
    } else {
      setEditingId(null);
      setEventTitleKa('');
      setEventTitleEn('');
      setEventTitleUk('');
      setEventDescKa('');
      setEventDescEn('');
      setEventDescUk('');
      setEventDayKa('');
      setEventDayEn('');
      setEventDayUk('');
      setEventTime('20:00'); // Standard default start time
      setEventDayWeekday('custom');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setItemImageUrl('');
  };

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  // If Supabase credentials are missing, render instructions and a warning banner
  if (!supabase) {
    return (
      <div className="admin-config-warning-container">
        <div className="admin-warning-card">
          <h1>Supabase Configuration Required</h1>
          <p>
            To use the Akademikosi Admin Dashboard, you need to connect your Supabase project.
          </p>
          <div className="warning-instructions">
            <h3>Setup Instructions:</h3>
            <ol>
              <li>Create a project on <strong>Supabase</strong>.</li>
              <li>
                Run the database initialization script located in:
                <br />
                <code>/supabase/supabase_schema.sql</code>
              </li>
              <li>
                Add the following environment variables to your Cloudflare Pages or hosting settings:
                <br />
                <code>NEXT_PUBLIC_SUPABASE_URL</code>
                <br />
                <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
              </li>
              <li>Re-deploy the website to apply the changes.</li>
            </ol>
          </div>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '2rem' }}>
            Once connected, you will be prompted with a secure login form to manage the site.
          </p>
        </div>
      </div>
    );
  }

  // If not logged in, render login page
  if (!session) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>Akademikosi Admin</h2>
          {authError && <div className="auth-error-banner">{authError}</div>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@akademikosi.ge"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="admin-primary-btn">
            Login
          </button>
        </form>
      </div>
    );
  }

  // Filter items based on selected category
  const filteredItems = items.filter((i) => i.category_id === selectedCategoryId);

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-brand">
          <h1>Akademikosi Admin Dashboard</h1>
        </div>
        <div className="admin-user-info">
          <span>{session.user.email}</span>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Menu Categories ({categories.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          Menu Items ({items.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events ({events.length})
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="admin-content-area">
        {/* 1. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="admin-table-wrapper">
            <div className="section-actions-row">
              <h2>Categories List</h2>
              <button className="admin-action-btn-primary" onClick={() => openCategoryModal()}>
                + Add Category
              </button>
            </div>
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name (KA)</th>
                  <th>Name (EN)</th>
                  <th>Name (UK)</th>
                  <th style={{ width: '200px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>
                      <div className="order-arrows">
                        <button
                          disabled={index === 0}
                          onClick={() => moveCategory(index, 'up')}
                        >
                          ▲
                        </button>
                        <button
                          disabled={index === categories.length - 1}
                          onClick={() => moveCategory(index, 'down')}
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td>{cat.name_ka}</td>
                    <td>{cat.name_en}</td>
                    <td>{cat.name_uk}</td>
                    <td className="table-row-actions">
                      <button className="edit-btn" onClick={() => openCategoryModal(cat)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteCategory(cat.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="no-data-cell">
                      No categories found. Click "Add Category" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. ITEMS TAB */}
        {activeTab === 'items' && (
          <div className="admin-items-layout">
            <div className="sidebar-categories-filter">
              <h3>Filter Category</h3>
              <div className="category-filter-list">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`filter-cat-btn ${selectedCategoryId === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategoryId(cat.id)}
                  >
                    {cat.name_en} / {cat.name_ka}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-table-wrapper" style={{ flex: 1 }}>
              <div className="section-actions-row">
                <h2>Items inside Category</h2>
                <button
                  className="admin-action-btn-primary"
                  disabled={categories.length === 0}
                  onClick={() => openItemModal()}
                >
                  + Add Item
                </button>
              </div>

              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th style={{ width: '200px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <div className="order-arrows">
                          <button
                            disabled={index === 0}
                            onClick={() => moveItem(index, 'up', filteredItems)}
                          >
                            ▲
                          </button>
                          <button
                            disabled={index === filteredItems.length - 1}
                            onClick={() => moveItem(index, 'down', filteredItems)}
                          >
                            ▼
                          </button>
                        </div>
                      </td>
                      <td>
                        <strong>{item.name_en}</strong> / {item.name_ka}
                        {item.description_en && (
                          <div className="item-description-preview">
                            <small>{item.description_en}</small>
                          </div>
                        )}
                      </td>
                      <td>{item.price}₾</td>
                      <td>
                        <button
                          className={`status-badge-btn ${item.is_available ? 'available' : 'unavailable'}`}
                          onClick={() => toggleItemAvailability(item)}
                        >
                          {item.is_available ? 'Available' : 'Sold Out'}
                        </button>
                      </td>
                      <td className="table-row-actions">
                        <button className="edit-btn" onClick={() => openItemModal(item)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="no-data-cell">
                        No items found in this category. Click "Add Item" to add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="admin-table-wrapper">
            <div className="section-actions-row">
              <div>
                <h2>Events List</h2>
                <p style={{ opacity: 0.5, fontSize: '0.85rem', marginTop: '0.2rem' }}>
                  Manage and order the bar events displayed on the homepage.
                </p>
              </div>
              <button className="admin-action-btn-primary" onClick={() => openEventModal()}>
                + Add Event
              </button>
            </div>
            
            <div className="admin-events-list">
              {events.map((ev, index) => {
                const hasKa = ev.title_ka && ev.event_day_ka;
                const hasEn = ev.title_en && ev.event_day_en;
                const hasUk = ev.title_uk && ev.event_day_uk;
                
                return (
                  <div className="admin-event-card-item" key={ev.id}>
                    {/* Reordering column */}
                    <div className="admin-event-card-reorder">
                      <button
                        disabled={index === 0}
                        onClick={() => moveEvent(index, 'up')}
                        className="reorder-btn"
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <span className="order-number">{index + 1}</span>
                      <button
                        disabled={index === events.length - 1}
                        onClick={() => moveEvent(index, 'down')}
                        className="reorder-btn"
                        title="Move Down"
                      >
                        ▼
                      </button>
                    </div>

                    {/* Event summary and translations details */}
                    <div className="admin-event-card-details">
                      <div className="admin-event-card-main-info">
                        <div className="time-badge">{ev.event_time}</div>
                        <div className="event-title-languages">
                          <div className="lang-row">
                            <span className="lang-indicator">KA</span>
                            <strong>{ev.event_day_ka}</strong> — {ev.title_ka}
                            {ev.description_ka && <span className="desc-preview"> ({ev.description_ka})</span>}
                          </div>
                          <div className="lang-row">
                            <span className="lang-indicator">EN</span>
                            <strong>{ev.event_day_en}</strong> — {ev.title_en}
                            {ev.description_en && <span className="desc-preview"> ({ev.description_en})</span>}
                          </div>
                          <div className="lang-row">
                            <span className="lang-indicator">UK</span>
                            <strong>{ev.event_day_uk}</strong> — {ev.title_uk}
                            {ev.description_uk && <span className="desc-preview"> ({ev.description_uk})</span>}
                          </div>
                        </div>
                      </div>
                      <div className="translation-status-bar">
                        <span className={`status-pill ${hasKa ? 'complete' : 'missing'}`}>Georgian (KA)</span>
                        <span className={`status-pill ${hasEn ? 'complete' : 'missing'}`}>English (EN)</span>
                        <span className={`status-pill ${hasUk ? 'complete' : 'missing'}`}>Ukrainian (UK)</span>
                      </div>
                    </div>

                    {/* Actions column */}
                    <div className="admin-event-card-actions">
                      <button className="edit-btn" onClick={() => openEventModal(ev)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteEvent(ev.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
              {events.length === 0 && (
                <div className="no-data-card">
                  No events found. Click "Add Event" to get started.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header">
              <h2>
                {editingId ? 'Edit' : 'Add'}{' '}
                {modalType === 'category' ? 'Category' : modalType === 'item' ? 'Menu Item' : 'Event'}
              </h2>
              <button className="close-modal-btn" onClick={closeModal}>
                ✕
              </button>
            </div>

            {/* A. CATEGORY FORM */}
            {modalType === 'category' && (
              <form onSubmit={handleSaveCategory}>
                <div className="form-group">
                  <label>Category Name (Georgian - KA)</label>
                  <input
                    type="text"
                    required
                    value={catNameKa}
                    onChange={(e) => setCatNameKa(e.target.value)}
                    placeholder="მაგ: ხელნაკეთი კოქტეილები"
                  />
                </div>
                <div className="form-group">
                  <label>Category Name (English - EN)</label>
                  <input
                    type="text"
                    required
                    value={catNameEn}
                    onChange={(e) => setCatNameEn(e.target.value)}
                    placeholder="e.g. Hand Crafted Cocktails"
                  />
                </div>
                <div className="form-group">
                  <label>Category Name (Ukrainian - UK)</label>
                  <input
                    type="text"
                    required
                    value={catNameUk}
                    onChange={(e) => setCatNameUk(e.target.value)}
                    placeholder="e.g. Авторські коктейлі"
                  />
                </div>
                <div className="modal-footer-actions">
                  <button type="button" className="admin-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* B. ITEM FORM */}
            {modalType === 'item' && (
              <form onSubmit={handleSaveItem} className="modal-tabbed-form">
                {/* Modal Internal Tabs */}
                <div className="modal-tabs-header">
                  <button
                    type="button"
                    className={`modal-tab-btn ${itemModalTab === 'general' ? 'active' : ''}`}
                    onClick={() => setItemModalTab('general')}
                  >
                    General Info
                  </button>
                  <button
                    type="button"
                    className={`modal-tab-btn ${itemModalTab === 'ka' ? 'active' : ''}`}
                    onClick={() => setItemModalTab('ka')}
                  >
                    ქართული (KA)
                  </button>
                  <button
                    type="button"
                    className={`modal-tab-btn ${itemModalTab === 'en' ? 'active' : ''}`}
                    onClick={() => setItemModalTab('en')}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    className={`modal-tab-btn ${itemModalTab === 'uk' ? 'active' : ''}`}
                    onClick={() => setItemModalTab('uk')}
                  >
                    Українська (UK)
                  </button>
                </div>

                {/* Tab: General Settings */}
                {itemModalTab === 'general' && (
                  <div className="modal-tab-content">
                    <div className="form-row-two-columns">
                      <div className="form-group">
                        <label>Category</label>
                        <select value={itemCatId} onChange={(e) => setItemCatId(e.target.value)} required>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name_en} / {cat.name_ka}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price (₾)</label>
                        <input
                          type="text"
                          required
                          value={itemPrice}
                          onChange={(e) => setItemPrice(e.target.value)}
                          placeholder="e.g. 22 or 17/38"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Image URL (Optional)</label>
                      <input
                        type="text"
                        value={itemImageUrl}
                        onChange={(e) => setItemImageUrl(e.target.value)}
                        placeholder="e.g. https://example.com/images/cocktail.jpg"
                      />
                      <span className="form-helper-text">
                        Provide a URL for the product photo to display it in a card layout.
                      </span>
                    </div>

                    <div className="form-group-checkbox">
                      <input
                        type="checkbox"
                        id="is_available_chk"
                        checked={itemAvailable}
                        onChange={(e) => setItemAvailable(e.target.checked)}
                      />
                      <label htmlFor="is_available_chk">Visible on Site (In Stock)</label>
                    </div>
                  </div>
                )}

                {/* Tab: Georgian (KA) */}
                {itemModalTab === 'ka' && (
                  <div className="modal-tab-content">
                    <div className="form-group">
                      <label>Item Name (KA)</label>
                      <input
                        type="text"
                        required
                        value={itemNameKa}
                        onChange={(e) => setItemNameKa(e.target.value)}
                        placeholder="მაგ: ნეგრონი"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description / Ingredients (KA)</label>
                      <input
                        type="text"
                        value={itemDescKa}
                        onChange={(e) => setItemDescKa(e.target.value)}
                        placeholder="მაგ: მწარე, ცხარე"
                      />
                    </div>
                  </div>
                )}

                {/* Tab: English (EN) */}
                {itemModalTab === 'en' && (
                  <div className="modal-tab-content">
                    <div className="form-group">
                      <label>Item Name (EN)</label>
                      <input
                        type="text"
                        required
                        value={itemNameEn}
                        onChange={(e) => setItemNameEn(e.target.value)}
                        placeholder="e.g. Negroni"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description / Ingredients (EN)</label>
                      <input
                        type="text"
                        value={itemDescEn}
                        onChange={(e) => setItemDescEn(e.target.value)}
                        placeholder="e.g. Bitter, sweet"
                      />
                    </div>
                  </div>
                )}

                {/* Tab: Ukrainian (UK) */}
                {itemModalTab === 'uk' && (
                  <div className="modal-tab-content">
                    <div className="form-group">
                      <label>Item Name (UK)</label>
                      <input
                        type="text"
                        required
                        value={itemNameUk}
                        onChange={(e) => setItemNameUk(e.target.value)}
                        placeholder="e.g. Негроні"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description / Ingredients (UK)</label>
                      <input
                        type="text"
                        value={itemDescUk}
                        onChange={(e) => setItemDescUk(e.target.value)}
                        placeholder="e.g. Гіркий, солодкий"
                      />
                    </div>
                  </div>
                )}

                <div className="modal-footer-actions">
                  <button type="button" className="admin-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* C. EVENT FORM */}
            {modalType === 'event' && (
              <form onSubmit={handleSaveEvent} className="modal-tabbed-form">
                {/* Modal Internal Tabs */}
                <div className="modal-tabs-header">
                  <button
                    type="button"
                    className={`modal-tab-btn ${eventModalTab === 'general' ? 'active' : ''}`}
                    onClick={() => setEventModalTab('general')}
                  >
                    General Info
                  </button>
                  <button
                    type="button"
                    className={`modal-tab-btn ${eventModalTab === 'ka' ? 'active' : ''}`}
                    onClick={() => setEventModalTab('ka')}
                  >
                    ქართული (KA)
                  </button>
                  <button
                    type="button"
                    className={`modal-tab-btn ${eventModalTab === 'en' ? 'active' : ''}`}
                    onClick={() => setEventModalTab('en')}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    className={`modal-tab-btn ${eventModalTab === 'uk' ? 'active' : ''}`}
                    onClick={() => setEventModalTab('uk')}
                  >
                    Українська (UK)
                  </button>
                </div>

                {/* Tab: General Settings */}
                {eventModalTab === 'general' && (
                  <div className="modal-tab-content">
                    <div className="form-group">
                      <label>Day of the Week Helper</label>
                      <select
                        value={eventDayWeekday}
                        onChange={(e) => handleWeekdayChange(e.target.value)}
                      >
                        <option value="custom">Custom Date (Manual Input)</option>
                        <option value="monday">Monday (ორშაბათი / Monday / Понеділок)</option>
                        <option value="tuesday">Tuesday (სამშაბათი / Tuesday / Вівторок)</option>
                        <option value="wednesday">Wednesday (ოთხშაბათი / Wednesday / Середа)</option>
                        <option value="thursday">Thursday (ხუთშაბათი / Thursday / Четвер)</option>
                        <option value="friday">Friday (პარასკევი / Friday / П'ятниця)</option>
                        <option value="saturday">Saturday (შაბათი / Saturday / Субота)</option>
                        <option value="sunday">Sunday (კვირა / Sunday / Неділя)</option>
                      </select>
                      <span className="form-helper-text">
                        Selecting a weekday automatically populates translation day text in other tabs.
                      </span>
                    </div>

                    <div className="form-group">
                      <label>Event Start Time</label>
                      <input
                        type="time"
                        required
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="admin-time-picker"
                      />
                      <span className="form-helper-text">
                        Standardized 24-hour selector.
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab: Georgian (KA) */}
                {eventModalTab === 'ka' && (
                  <div className="modal-tab-content">
                    <div className="form-group">
                      <label>Event Day (KA)</label>
                      <input
                        type="text"
                        required
                        value={eventDayKa}
                        onChange={(e) => setEventDayKa(e.target.value)}
                        placeholder="მაგ: ოთხშაბათი"
                      />
                    </div>
                    <div className="form-group">
                      <label>Event Title / Name (KA)</label>
                      <input
                        type="text"
                        required
                        value={eventTitleKa}
                        onChange={(e) => setEventTitleKa(e.target.value)}
                        placeholder="მაგ: ცოცხალი მუსიკა"
                      />
                    </div>
                    <div className="form-group">
                      <label>Event Description / Details (KA)</label>
                      <textarea
                        value={eventDescKa}
                        onChange={(e) => setEventDescKa(e.target.value)}
                        placeholder="მაგ: მოწვეული არტისტები"
                        rows={3}
                        className="admin-textarea"
                      />
                    </div>
                  </div>
                )}

                {/* Tab: English (EN) */}
                {eventModalTab === 'en' && (
                  <div className="modal-tab-content">
                    <div className="form-group">
                      <label>Event Day (EN)</label>
                      <input
                        type="text"
                        required
                        value={eventDayEn}
                        onChange={(e) => setEventDayEn(e.target.value)}
                        placeholder="e.g. Wednesday"
                      />
                    </div>
                    <div className="form-group">
                      <label>Event Title / Name (EN)</label>
                      <input
                        type="text"
                        required
                        value={eventTitleEn}
                        onChange={(e) => setEventTitleEn(e.target.value)}
                        placeholder="e.g. Live Bands"
                      />
                    </div>
                    <div className="form-group">
                      <label>Event Description / Details (EN)</label>
                      <textarea
                        value={eventDescEn}
                        onChange={(e) => setEventDescEn(e.target.value)}
                        placeholder="e.g. Featured Artists"
                        rows={3}
                        className="admin-textarea"
                      />
                    </div>
                  </div>
                )}

                {/* Tab: Ukrainian (UK) */}
                {eventModalTab === 'uk' && (
                  <div className="modal-tab-content">
                    <div className="form-group">
                      <label>Event Day (UK)</label>
                      <input
                        type="text"
                        required
                        value={eventDayUk}
                        onChange={(e) => setEventDayUk(e.target.value)}
                        placeholder="e.g. Середа"
                      />
                    </div>
                    <div className="form-group">
                      <label>Event Title / Name (UK)</label>
                      <input
                        type="text"
                        required
                        value={eventTitleUk}
                        onChange={(e) => setEventTitleUk(e.target.value)}
                        placeholder="e.g. Живі гурти"
                      />
                    </div>
                    <div className="form-group">
                      <label>Event Description / Details (UK)</label>
                      <textarea
                        value={eventDescUk}
                        onChange={(e) => setEventDescUk(e.target.value)}
                        placeholder="e.g. Запрошені არტისტები"
                        rows={3}
                        className="admin-textarea"
                      />
                    </div>
                  </div>
                )}

                <div className="modal-footer-actions">
                  <button type="button" className="admin-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
