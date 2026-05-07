import { useState, useEffect } from 'react';
import React from 'react';
import { auth, db, storage } from '../lib/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SERVICES, PRODUCTS as STATIC_PRODUCTS, TECHNOLOGIES } from '../constants';
import { LogOut, Plus, Trash2, LayoutDashboard, PlusCircle, ExternalLink, Image as ImageIcon, Box, Briefcase, Loader2, Check, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [dbProducts, setDbProducts] = useState<any[]>([]); // Dynamic products
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'products'>('projects');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Whitelist: Sadece yetkili email erişebilir
  const ADMIN_EMAILS = ['ince.htce@gmail.com'];
  const initialItemState = {
    title: '',
    description: '',
    serviceId: SERVICES[0].id, // for projects
    category: 'SaaS Çözümü', // Default for products
    image: '', // Primary image
    images: [] as string[], // Additional images gallery
    tags: [] as string[],
    url: '', // for projects
    features: '' // for products
  };
  const [newItem, setNewItem] = useState(initialItemState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u && ADMIN_EMAILS.includes(u.email || '')) {
        setUser(u);
        fetchProjects();
        fetchProducts();
      } else if (u) {
        setError('Bu panele erişim yetkiniz bulunmamaktadır.');
        signOut(auth);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchProjects = async () => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(data);
  };

  const fetchProducts = async () => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDbProducts(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);

        if (!isGallery && i === 0) break; // Only first one if not gallery
      }

      if (isGallery) {
        setNewItem(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      } else {
        setNewItem(prev => ({ ...prev, image: uploadedUrls[0] }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Görsel yüklenirken bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setNewItem(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleToggleTag = (tag: string) => {
    setNewItem(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'projects') {
        const data = {
          title: newItem.title,
          description: newItem.description,
          serviceId: newItem.serviceId,
          image: newItem.image,
          images: newItem.images,
          tags: newItem.tags,
          url: newItem.url,
          updatedAt: serverTimestamp()
        };

        if (editingId) {
          await updateDoc(doc(db, 'projects', editingId), data);
        } else {
          await addDoc(collection(db, 'projects'), {
            ...data,
            createdAt: serverTimestamp()
          });
        }
        fetchProjects();
      } else {
        const data = {
          title: newItem.title,
          description: newItem.description,
          category: 'SaaS Çözümü', // Auto-set for all products
          image: newItem.image,
          images: newItem.images,
          features: newItem.features.split(',').map(f => f.trim()),
          url: newItem.url,
          updatedAt: serverTimestamp()
        };

        if (editingId) {
          await updateDoc(doc(db, 'products', editingId), data);
        } else {
          await addDoc(collection(db, 'products'), {
            ...data,
            createdAt: serverTimestamp()
          });
        }
        fetchProducts();
      }

      setNewItem(initialItemState);
      setIsAdding(false);
      setEditingId(null);
    } catch (err: any) {
      console.error("Error saving item:", err);
      setError('Kaydetme hatası: ' + (err?.message || 'Bilinmeyen hata'));
    }
  };

  const handleEdit = (item: any) => {
    setNewItem({
      title: item.title || '',
      description: item.description || '',
      serviceId: item.serviceId || SERVICES[0].id,
      category: item.category || 'SaaS Çözümü',
      image: item.image || '',
      images: item.images || [],
      tags: item.tags || [],
      url: item.url || '',
      features: Array.isArray(item.features) ? item.features.join(', ') : (item.features || '')
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (window.confirm('Bu ögeyi silmek istediğinize emin misiniz?')) {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'projects') fetchProjects();
      else fetchProducts();
    }
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!ADMIN_EMAILS.includes(result.user.email || '')) {
        await signOut(auth);
        setError('Bu panele erişim yetkiniz bulunmamaktadır.');
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Giriş penceresi kapatıldı. Lütfen tekrar deneyin.');
      } else {
        setError('Giriş yapılırken bir hata oluştu: ' + err.message);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-neutral-500 italic">Hazırlanıyor...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-[2.5rem] text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-accent/20 text-highlight/90 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">Admin Girişi</h1>
          <p className="text-neutral-500 mb-8 font-light">Panel erişimi için yetkili Google hesabınızla giriş yapın.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-4 bg-highlight text-white font-bold rounded-xl hover:bg-highlight/90 transition-colors flex items-center justify-center gap-3"
          >
            Google ile Giriş Yap
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display font-medium">Yönetim Paneli</h1>
            <p className="text-neutral-500 font-light mt-1">İçeriklerinizi ve SaaS ürünlerinizi buradan yönetin.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-6 py-3 bg-highlight text-white font-bold rounded-xl hover:bg-highlight/90 transition-colors"
            >
              <PlusCircle size={18} /> Yeni {activeTab === 'projects' ? 'Proje' : 'Ürün'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-surface border border-neutral-800 text-neutral-400 font-bold rounded-xl hover:text-white transition-all"
            >
              <LogOut size={18} /> Çıkış
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex justify-between items-center">
            {error}
            <button onClick={() => setError(null)} className="text-red-400/60 hover:text-red-400 ml-4">✕</button>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-12 border-b border-neutral-800 pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm transition-all ${activeTab === 'projects' ? 'bg-white text-black font-bold' : 'text-neutral-500 hover:text-white'}`}
          >
            <Briefcase size={16} /> Projeler
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm transition-all ${activeTab === 'products' ? 'bg-white text-black font-bold' : 'text-neutral-500 hover:text-white'}`}
          >
            <Box size={16} /> SaaS Ürünler
          </button>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-8 rounded-3xl mb-12 border-accent/30"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-medium">{editingId ? 'Ögeyi Düzenle' : `Yeni ${activeTab === 'projects' ? 'Proje' : 'Ürün'} Ekle`}</h3>
                <button onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setNewItem(initialItemState);
                }} className="text-neutral-500 hover:text-white">İptal</button>
              </div>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Başlık</label>
                  <input
                    required
                    value={newItem.title}
                    onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm"
                    placeholder="Örn: FinTek Uygulaması"
                  />
                </div>

                {activeTab === 'projects' && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Hizmet Kategori</label>
                    <select
                      value={newItem.serviceId}
                      onChange={e => setNewItem({ ...newItem, serviceId: e.target.value })}
                      className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm text-neutral-400"
                    >
                      {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                    </select>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Açıklama</label>
                  <textarea
                    value={newItem.description}
                    onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                    className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm resize-none"
                    rows={3}
                    placeholder="Kısa bilgi..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Ana Kapak Görseli</label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 h-14 bg-background border-2 border-dashed border-neutral-800 rounded-xl cursor-pointer hover:border-accent transition-all text-neutral-500 overflow-hidden relative">
                      {uploading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <Plus size={20} />
                          <span className="text-sm">Görsel Seç</span>
                          {newItem.image && <img src={newItem.image} className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                        </>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, false)} disabled={uploading} />
                    </label>
                    <div className="flex-1">
                      <input
                        value={newItem.image}
                        onChange={e => setNewItem({ ...newItem, image: e.target.value })}
                        className="w-full h-14 bg-background border border-neutral-800 rounded-xl px-4 outline-none focus:border-accent text-xs"
                        placeholder="Veya URL yapıştırın..."
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Proje Galerisi (Ek Görseller)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                    {newItem.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group border border-neutral-800">
                        <img src={img} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <label className="flex items-center justify-center aspect-video bg-background border-2 border-dashed border-neutral-800 rounded-lg cursor-pointer hover:border-accent transition-all text-neutral-500">
                      <Plus size={20} />
                      <input type="file" className="hidden" accept="image/*" multiple onChange={e => handleImageUpload(e, true)} disabled={uploading} />
                    </label>
                  </div>
                </div>

                {activeTab === 'projects' ? (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Canlı Site URL</label>
                      <input
                        value={newItem.url}
                        onChange={e => setNewItem({ ...newItem, url: e.target.value })}
                        className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-4">Teknolojiler (Seçiniz)</label>
                      <div className="flex flex-wrap gap-2">
                        {TECHNOLOGIES.map(tag => {
                          const isSelected = newItem.tags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleToggleTag(tag)}
                              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 border ${isSelected
                                  ? 'bg-accent border-accent text-white'
                                  : 'bg-surface border-neutral-800 text-neutral-500 hover:border-neutral-600'
                                }`}
                            >
                              {tag}
                              {isSelected && <Check size={12} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Ürün URL</label>
                      <input
                        value={newItem.url}
                        onChange={e => setNewItem({ ...newItem, url: e.target.value })}
                        className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm"
                        placeholder="https://urun.butiqyazilim.com.tr"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Özellikler (Virgül ile ayırın)</label>
                      <input
                        value={newItem.features}
                        onChange={e => setNewItem({ ...newItem, features: e.target.value })}
                        className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm"
                        placeholder="Hız, Güvenlik, Raporlama"
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={uploading || !newItem.image}
                    className="w-full py-4 bg-highlight text-white font-bold rounded-xl hover:bg-highlight/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingId ? 'Güncelle' : (activeTab === 'projects' ? 'Projeyi Yayınla' : 'Ürünü Yayınla')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'projects' ? (
            projects.map(project => (
              <div key={project.id} className="bg-surface border border-neutral-800 rounded-2xl overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-3 bg-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete('projects', project.id)}
                      className="p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{project.title}</h4>
                    <span className="text-[10px] font-mono text-highlight/90 bg-accent/10 px-2 py-0.5 rounded italic">
                      {SERVICES.find(s => s.id === project.serviceId)?.title}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 mb-4 font-light">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags?.map((tag: string) => (
                      <span key={tag} className="text-[9px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            dbProducts.map(product => (
              <div key={product.id} className="bg-surface border border-neutral-800 rounded-2xl overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-3 bg-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete('products', product.id)}
                      className="p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{product.title}</h4>
                    <span className="text-[10px] font-mono text-secondary bg-neutral-800 px-2 py-0.5 rounded italic">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 mb-4 font-light">{product.description}</p>
                </div>
              </div>
            ))
          )}

          {((activeTab === 'projects' && projects.length === 0) || (activeTab === 'products' && dbProducts.length === 0)) && !isAdding && (
            <div className="col-span-full py-20 text-center border border-dashed border-neutral-800 rounded-3xl">
              <p className="text-neutral-500 italic">Henüz öge eklenmemiş.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
