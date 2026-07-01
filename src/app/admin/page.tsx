'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

    // Update in database
    await supabase
      .from('menu_categories')
      .update({ order_index: newCategories[index].order_index })
      .eq('id', newCategories[index].id);

    await supabase
      .from('menu_categories')
      .update({ order_index: newCategories[targetIndex].order_index })
      .eq('id', newCategories[targetIndex].id);

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
    
    await supabase
      .from('menu_items')
      .update({ order_index: catItems[targetIndex].order_index })
      .eq('id', catItems[filteredIndex].id);

    await supabase
      .from('menu_items')
      .update({ order_index: temp })
      .eq('id', catItems[targetIndex].id);

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

    await supabase
      .from('events')
      .update({ order_index: newEvents[index].order_index })
      .eq('id', newEvents[index].id);

    await supabase
      .from('events')
      .update({ order_index: newEvents[targetIndex].order_index })
      .eq('id', newEvents[targetIndex].id);

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
    }
    setIsModalOpen(true);
  };

  const openEventModal = (ev: any = null) => {
    setModalType('event');
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
      setEventTime('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
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
              <h2>Events List</h2>
              <button className="admin-action-btn-primary" onClick={() => openEventModal()}>
                + Add Event
              </button>
            </div>
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Day</th>
                  <th>Event Name</th>
                  <th>Time / Details</th>
                  <th style={{ width: '200px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev, index) => (
                  <tr key={ev.id}>
                    <td>
                      <div className="order-arrows">
                        <button
                          disabled={index === 0}
                          onClick={() => moveEvent(index, 'up')}
                        >
                          ▲
                        </button>
                        <button
                          disabled={index === events.length - 1}
                          onClick={() => moveEvent(index, 'down')}
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td>{ev.event_day_en} / {ev.event_day_ka}</td>
                    <td>{ev.title_en} / {ev.title_ka}</td>
                    <td>
                      <strong>{ev.event_time}</strong>
                      {ev.description_en && (
                        <div className="item-description-preview">
                          <small>{ev.description_en}</small>
                        </div>
                      )}
                    </td>
                    <td className="table-row-actions">
                      <button className="edit-btn" onClick={() => openEventModal(ev)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteEvent(ev.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan={5} className="no-data-cell">
                      No events found. Click "Add Event" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
              <form onSubmit={handleSaveItem}>
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
                  <label>Item Name (Georgian - KA)</label>
                  <input
                    type="text"
                    required
                    value={itemNameKa}
                    onChange={(e) => setItemNameKa(e.target.value)}
                    placeholder="მაგ: ნეგრონი"
                  />
                </div>
                <div className="form-group">
                  <label>Item Name (English - EN)</label>
                  <input
                    type="text"
                    required
                    value={itemNameEn}
                    onChange={(e) => setItemNameEn(e.target.value)}
                    placeholder="e.g. Negroni"
                  />
                </div>
                <div className="form-group">
                  <label>Item Name (Ukrainian - UK)</label>
                  <input
                    type="text"
                    required
                    value={itemNameUk}
                    onChange={(e) => setItemNameUk(e.target.value)}
                    placeholder="e.g. Негроні"
                  />
                </div>

                <div className="form-group">
                  <label>Description (KA)</label>
                  <input
                    type="text"
                    value={itemDescKa}
                    onChange={(e) => setItemDescKa(e.target.value)}
                    placeholder="მაგ: მწარე, ცხარე"
                  />
                </div>
                <div className="form-group">
                  <label>Description (EN)</label>
                  <input
                    type="text"
                    value={itemDescEn}
                    onChange={(e) => setItemDescEn(e.target.value)}
                    placeholder="e.g. Spicy, Chilli"
                  />
                </div>
                <div className="form-group">
                  <label>Description (UK)</label>
                  <input
                    type="text"
                    value={itemDescUk}
                    onChange={(e) => setItemDescUk(e.target.value)}
                    placeholder="e.g. Пряний, гострий"
                  />
                </div>

                <div className="form-group-checkbox">
                  <input
                    type="checkbox"
                    id="is_available_chk"
                    checked={itemAvailable}
                    onChange={(e) => setItemAvailable(e.target.checked)}
                  />
                  <label htmlFor="is_available_chk">Available (In Stock)</label>
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

            {/* C. EVENT FORM */}
            {modalType === 'event' && (
              <form onSubmit={handleSaveEvent}>
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
                  <label>Event Day (UK)</label>
                  <input
                    type="text"
                    required
                    value={eventDayUk}
                    onChange={(e) => setEventDayUk(e.target.value)}
                    placeholder="e.g. Середа"
                  />
                </div>

                <div className="form-row-two-columns">
                  <div className="form-group">
                    <label>Event Name (EN)</label>
                    <input
                      type="text"
                      required
                      value={eventTitleEn}
                      onChange={(e) => setEventTitleEn(e.target.value)}
                      placeholder="e.g. Underground Jam"
                    />
                  </div>
                  <div className="form-group">
                    <label>Time Info</label>
                    <input
                      type="text"
                      required
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="e.g. 21:00"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Event Name (KA)</label>
                  <input
                    type="text"
                    required
                    value={eventTitleKa}
                    onChange={(e) => setEventTitleKa(e.target.value)}
                    placeholder="მაგ: ცოცხალი მუსიკა"
                  />
                </div>
                <div className="form-group">
                  <label>Event Name (UK)</label>
                  <input
                    type="text"
                    required
                    value={eventTitleUk}
                    onChange={(e) => setEventTitleUk(e.target.value)}
                    placeholder="e.g. Жива музика"
                  />
                </div>

                <div className="form-group">
                  <label>Event Description (KA)</label>
                  <input
                    type="text"
                    value={eventDescKa}
                    onChange={(e) => setEventDescKa(e.target.value)}
                    placeholder="მაგ: ღია მიკროფონი"
                  />
                </div>
                <div className="form-group">
                  <label>Event Description (EN)</label>
                  <input
                    type="text"
                    value={eventDescEn}
                    onChange={(e) => setEventDescEn(e.target.value)}
                    placeholder="e.g. Open Mic Night"
                  />
                </div>
                <div className="form-group">
                  <label>Event Description (UK)</label>
                  <input
                    type="text"
                    value={eventDescUk}
                    onChange={(e) => setEventDescUk(e.target.value)}
                    placeholder="e.g. Відкритий мікрофон"
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
          </div>
        </div>
      )}
    </div>
  );
}
