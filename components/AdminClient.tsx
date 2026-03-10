"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LogOut, Plus, Pencil, Trash2, Package, ShoppingCart, Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: string;
  category: string;
  category_label: string;
  name: string;
  wood_type: string | null;
  description: string | null;
  dimensions: string | null;
  price_from: number;
  extras: unknown;
  features: string[] | null;
  main_image: string;
  additional_images: string[] | null;
  sort_order: number;
  is_active: boolean;
  delivery_time: string | null;
}

interface Order {
  id: string;
  product_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  payment_method: string;
  notes: string | null;
  total_price: number | null;
  status: string;
  created_at: string;
}

const BUCKET = "product-images";

export default function AdminClient() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  const mainImageRef = useRef<HTMLInputElement>(null);
  const additionalImagesRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    category: "", category_label: "", name: "", wood_type: "",
    description: "", dimensions: "", price_from: "", extras: "[]",
    features: "", main_image: "", additional_images: [] as string[],
    sort_order: "0", is_active: true, delivery_time: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) checkAdmin(data.session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkAdmin(session.user.id);
      else { setIsAdmin(false); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin");
    setIsAdmin(!!(data && data.length > 0));
    setLoading(false);
    if (data && data.length > 0) { loadProducts(); loadOrders(); }
  };

  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("sort_order");
    if (data) setProducts(data as Product[]);
  };

  const loadOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data as Order[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showToast("Fehler: " + error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);
    if (error) { showToast("Upload-Fehler: " + error.message); return null; }
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file);
    if (url) setForm(prev => ({ ...prev, main_image: url }));
    setUploading(false);
  };

  const handleAdditionalImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }
    setForm(prev => ({ ...prev, additional_images: [...prev.additional_images, ...urls] }));
    setUploading(false);
  };

  const removeAdditionalImage = (index: number) => {
    setForm(prev => ({ ...prev, additional_images: prev.additional_images.filter((_, i) => i !== index) }));
  };

  const openNew = () => {
    setEditProduct(null);
    setForm({ category: "", category_label: "", name: "", wood_type: "", description: "", dimensions: "", price_from: "", extras: "[]", features: "", main_image: "", additional_images: [], sort_order: "0", is_active: true, delivery_time: "" });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      category: p.category, category_label: p.category_label, name: p.name,
      wood_type: p.wood_type || "", description: p.description || "",
      dimensions: p.dimensions || "", price_from: String(p.price_from),
      extras: JSON.stringify(p.extras || []),
      features: (p.features || []).join("\n"),
      main_image: p.main_image,
      additional_images: p.additional_images || [],
      sort_order: String(p.sort_order), is_active: p.is_active,
      delivery_time: p.delivery_time || "",
    });
    setDialogOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      category: form.category, category_label: form.category_label, name: form.name,
      wood_type: form.wood_type || null, description: form.description || null,
      dimensions: form.dimensions || null, price_from: parseFloat(form.price_from),
      extras: JSON.parse(form.extras || "[]"),
      features: form.features ? form.features.split("\n").filter(Boolean) : [],
      main_image: form.main_image, additional_images: form.additional_images,
      sort_order: parseInt(form.sort_order) || 0, is_active: form.is_active,
      delivery_time: form.delivery_time || null,
    };

    if (editProduct) {
      const { error } = await supabase.from("products").update(payload).eq("id", editProduct.id);
      if (error) { showToast("Fehler: " + error.message); return; }
      showToast("Produkt aktualisiert");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { showToast("Fehler: " + error.message); return; }
      showToast("Produkt erstellt");
    }
    setDialogOpen(false);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Produkt wirklich löschen?")) return;
    await supabase.from("products").delete().eq("id", id);
    showToast("Produkt gelöscht");
    loadProducts();
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-muted-foreground">Laden...</div>;

  if (!session || !isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 px-6">
          <h1 className="font-display text-2xl font-bold text-center mb-6">Admin Login</h1>
          {session && !isAdmin && <p className="text-destructive text-sm text-center">Kein Admin-Zugang.</p>}
          <Input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="elegant" className="w-full" disabled={authLoading}>
            {authLoading ? "..." : "Anmelden"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[9999] bg-foreground text-background px-4 py-2 text-sm rounded">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-display font-bold text-lg">Admin</h1>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <button onClick={() => setActiveTab("products")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${activeTab === "products" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              <Package size={14} /> Produkte
            </button>
            <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${activeTab === "orders" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              <ShoppingCart size={14} /> Bestellungen
            </button>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
            Zur Website ↗
          </a>
          <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut size={16} /></Button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "products" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-bold text-xl">Produkte ({products.length})</h2>
              <Button variant="elegant" size="sm" onClick={openNew}><Plus size={14} className="mr-1" /> Neu</Button>
            </div>
            <div className="space-y-2">
              {products.map(p => (
                <div key={p.id} className="flex items-center gap-4 border border-border rounded-lg p-3">
                  <img src={p.main_image} alt="" className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category_label} · CHF {p.price_from}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 size={14} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <h2 className="font-display font-bold text-xl mb-6">Bestellungen ({orders.length})</h2>
            <div className="space-y-2">
              {orders.map(o => (
                <div key={o.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{o.product_name}</p>
                      <p className="text-xs text-muted-foreground">{o.customer_name} · {o.customer_email}</p>
                      {o.customer_phone && <p className="text-xs text-muted-foreground">{o.customer_phone}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wider bg-muted px-2 py-1 rounded">{o.payment_method}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(o.created_at).toLocaleDateString("de-CH")}</p>
                    </div>
                  </div>
                  {o.notes && <p className="text-xs text-muted-foreground mt-2 italic">{o.notes}</p>}
                </div>
              ))}
              {orders.length === 0 && <p className="text-muted-foreground text-center py-12">Keine Bestellungen vorhanden.</p>}
            </div>
          </>
        )}
      </div>

      {/* Product dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editProduct ? "Produkt bearbeiten" : "Neues Produkt"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveProduct} className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Kategorie (Slug)</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required placeholder="stirnholz" /></div>
              <div><Label className="text-xs">Kategorie (Label)</Label><Input value={form.category_label} onChange={e => setForm({ ...form, category_label: e.target.value })} required placeholder="Stirnholz-Schneidebretter" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div><Label className="text-xs">Holzart</Label><Input value={form.wood_type} onChange={e => setForm({ ...form, wood_type: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label className="text-xs">Dimensionen</Label><Input value={form.dimensions} onChange={e => setForm({ ...form, dimensions: e.target.value })} placeholder="43x31x4cm" /></div>
              <div><Label className="text-xs">Preis ab (CHF)</Label><Input type="number" step="0.01" value={form.price_from} onChange={e => setForm({ ...form, price_from: e.target.value })} required /></div>
              <div><Label className="text-xs">Lieferzeit</Label><Input value={form.delivery_time} onChange={e => setForm({ ...form, delivery_time: e.target.value })} placeholder="2-3 Wochen" /></div>
            </div>
            <div><Label className="text-xs">Beschreibung</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="min-h-[60px]" /></div>
            <div><Label className="text-xs">Features (eine pro Zeile)</Label><Textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder={"Ohne Griffmulde\nInkl. Gummifüsse"} className="min-h-[60px]" /></div>
            <div><Label className="text-xs">Extras (JSON)</Label><Textarea value={form.extras} onChange={e => setForm({ ...form, extras: e.target.value })} placeholder='[{"name":"Griffmulde","price":30}]' className="min-h-[40px] font-mono text-xs" /></div>

            {/* Main image upload */}
            <div>
              <Label className="text-xs">Hauptbild</Label>
              <div className="flex gap-3 items-center mt-1">
                {form.main_image && <img src={form.main_image} alt="Hauptbild" className="w-16 h-16 rounded object-cover" />}
                <div className="flex-1">
                  <Input value={form.main_image} onChange={e => setForm({ ...form, main_image: e.target.value })} placeholder="URL oder Bild hochladen" required />
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => mainImageRef.current?.click()} disabled={uploading}>
                  <Upload size={14} className="mr-1" /> {uploading ? "..." : "Upload"}
                </Button>
                <input ref={mainImageRef} type="file" accept="image/*" className="hidden" onChange={handleMainImageUpload} />
              </div>
            </div>

            {/* Additional images */}
            <div>
              <Label className="text-xs">Weitere Bilder</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {form.additional_images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt="" className="w-16 h-16 rounded object-cover" />
                    <button type="button" onClick={() => removeAdditionalImage(i)} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" className="h-16 w-16" onClick={() => additionalImagesRef.current?.click()} disabled={uploading}>
                  <Plus size={20} />
                </Button>
                <input ref={additionalImagesRef} type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalImagesUpload} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Sortierung</Label><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: e.target.value })} /></div>
              <div className="flex items-end gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
                  Aktiv
                </label>
              </div>
            </div>
            <Button type="submit" variant="elegant" className="w-full mt-4">Speichern</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
