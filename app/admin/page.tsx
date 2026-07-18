"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  BookOpen,
  ChevronRight,
  Copy,
  DollarSign,
  Image as ImageIcon,
  Inbox,
  GripVertical,
  LayoutDashboard,
  LogOut,
  Plus,
  Quote,
  RefreshCw,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { CMS_FIELDS, defaultCmsValues } from "@/site/cmsFields";
import { portfolioItems as defaultPortfolio } from "@/site/data";
import { supabase, uploadSiteImage } from "@/site/supabase";
import type { BlogArticle } from "@/site/blogData";
import { defaultBlogArticles, defaultContactFields, defaultFaqs, defaultPricingContent, defaultTestimonials, parseJsonSetting, type ContactField, type FaqItem, type PricingContent, type PricingPackage, type Testimonial } from "@/site/contentModels";

type Tab = "content" | "portfolio" | "pricing" | "blog" | "testimonials" | "faq" | "contact" | "messages";
type PortfolioRow = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
  gear: string;
  location: string;
  settings: Record<string, string>;
  sort_order: number;
  is_visible: boolean;
};
type MessageRow = {
  id: string;
  ticket_id: string;
  source: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  session_type: string | null;
  preferred_date: string | null;
  budget: string | null;
  details: string | null;
  attachment_path: string | null;
  status: string;
  created_at: string;
};

const blankPortfolio = (): PortfolioRow => ({
  id: crypto.randomUUID(),
  title: "New portfolio image",
  category: "portraits",
  image_url: "",
  description: "",
  gear: "",
  location: "Dallas, Texas",
  settings: { lens: "", aperture: "", shutter: "", iso: "" },
  sort_order: 999,
  is_visible: true,
});

const blankArticle = (): BlogArticle => ({
  id: Date.now(),
  title: "New article",
  category: "Photography Tips",
  keyword: "",
  summary: "",
  content: [""],
  readTime: "5 min read",
  imageUrl: "",
});

const blankTestimonial = (): Testimonial => ({
  id: crypto.randomUUID(),
  name: "Client name",
  type: "Session type",
  text: "",
  imageUrl: "",
});

const blankPricingPackage = (): PricingPackage => ({
  id: crypto.randomUUID(),
  name: "New package",
  price: "$0",
  currency: "USD",
  description: "",
  features: ["Included feature"],
  badge: "",
  buttonLabel: "Book this package",
  highlighted: false,
  visible: true,
});

const mergePricingContent = (saved?: string): PricingContent => {
  const parsed = parseJsonSetting<Partial<PricingContent>>(saved, {});
  return {
    ...defaultPricingContent,
    ...parsed,
    packages: Array.isArray(parsed.packages) ? parsed.packages : defaultPricingContent.packages,
    commercial: { ...defaultPricingContent.commercial, ...(parsed.commercial || {}) },
    faq: {
      ...defaultPricingContent.faq,
      ...(parsed.faq || {}),
      items: Array.isArray(parsed.faq?.items) ? parsed.faq.items : defaultPricingContent.faq.items,
    },
  };
};

function Login({ onSession }: { onSession: (session: Session) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError || !data.session) {
      setError(authError?.message || "Unable to sign in.");
      return;
    }
    onSession(data.session);
  };

  return (
    <main className="min-h-screen bg-[#090B0B] px-5 py-16 text-[#F8F4F2]">
      <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-[#283133]/40 p-7 shadow-2xl">
        <div className="mb-8">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A27B5D]">Private access</p>
          <h1 className="font-display text-4xl font-semibold">Guliyev Photo Admin</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">Sign in with the administrator account created in Supabase.</p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-[#A27B5D]"
            />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-[#A27B5D]"
            />
          </label>
          {error && <p role="alert" className="rounded border border-red-400/25 bg-red-500/10 p-3 text-xs text-red-200">{error}</p>}
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded bg-[#A27B5D] px-5 py-3 text-sm font-bold text-[#090B0B] transition hover:bg-[#AA876C] disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}<ChevronRight size={16} />
          </button>
        </form>
        <a href="/" className="mt-6 block text-center text-xs text-white/45 hover:text-[#A27B5D]">Return to website</a>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [tab, setTab] = useState<Tab>("content");
  const [content, setContent] = useState<Record<string, string>>(defaultCmsValues);
  const [portfolio, setPortfolio] = useState<PortfolioRow[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>(defaultBlogArticles);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);
  const [pricing, setPricing] = useState<PricingContent>(defaultPricingContent);
  const [contactFields, setContactFields] = useState<ContactField[]>(defaultContactFields);
  const [draggedPortfolioIndex, setDraggedPortfolioIndex] = useState<number | null>(null);
  const [draggedPricingIndex, setDraggedPricingIndex] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingAuth(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError("");
    const [contentResult, portfolioResult, messageResult] = await Promise.all([
      supabase.from("site_content").select("key,value"),
      supabase.from("portfolio_items").select("*").order("sort_order"),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    const firstError = contentResult.error || portfolioResult.error || messageResult.error;
    if (firstError) setError(`${firstError.message} Run the included Supabase setup script if this is a new project.`);
    if (contentResult.data) {
      const overrides = Object.fromEntries(contentResult.data.map((row) => [row.key, row.value]));
      setContent({ ...defaultCmsValues, ...overrides });
      setArticles(parseJsonSetting(overrides['blog.articles'], defaultBlogArticles));
      setTestimonials(parseJsonSetting(overrides['home.testimonials.data'], defaultTestimonials));
      setFaqs(parseJsonSetting(overrides['home.faq.data'], defaultFaqs));
      setPricing(mergePricingContent(overrides['pricing.data']));
      setContactFields(parseJsonSetting(overrides['contact.fields'], defaultContactFields));
    }
    if (portfolioResult.data) setPortfolio(portfolioResult.data.map((row) => ({
      ...row,
      description: String((row.settings as Record<string, unknown> | null)?.description || ""),
    })) as PortfolioRow[]);
    if (messageResult.data) setMessages(messageResult.data as MessageRow[]);
    setLoading(false);
  }, [session]);

  useEffect(() => { void loadData(); }, [loadData]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const saveContent = async () => {
    setLoading(true);
    setError("");
    const rows = CMS_FIELDS.map((field) => ({
      key: field.key,
      value: content[field.key] ?? "",
      label: field.label,
      category: field.category,
      type: field.type,
    }));
    const { error: saveError } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setLoading(false);
    if (saveError) return setError(saveError.message);
    showNotice("Website content saved");
  };

  const saveStructuredContent = async (key: string, value: unknown, label: string, category: string) => {
    setLoading(true);
    setError("");
    const { error: saveError } = await supabase.from("site_content").upsert({ key, value: JSON.stringify(value), label, category, type: "json" }, { onConflict: "key" });
    setLoading(false);
    if (saveError) return setError(saveError.message);
    showNotice(`${label} saved`);
  };

  const uploadArticleImage = async (index: number, file?: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadSiteImage(file, "blog");
      setArticles((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, imageUrl: url } : row));
      showNotice("Article image uploaded. Save articles to publish it.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const uploadTestimonialImage = async (index: number, file?: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadSiteImage(file, "testimonials");
      setTestimonials((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, imageUrl: url } : row));
      showNotice("Client image uploaded. Save testimonials to publish it.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const uploadForField = async (key: string, file?: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadSiteImage(file, "content");
      setContent((current) => ({ ...current, [key]: url }));
      showNotice("Image uploaded. Save content to publish it.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const seedPortfolio = () => {
    setPortfolio(defaultPortfolio.map((item, index) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      image_url: item.imageUrl,
      description: item.description || "",
      gear: item.gear,
      location: item.location,
      settings: { ...item.settings, description: item.description || "" },
      sort_order: index,
      is_visible: true,
    })));
    showNotice("Current portfolio loaded. Click Save portfolio to publish it.");
  };

  const savePortfolio = async () => {
    setLoading(true);
    setError("");
    // Only send editable columns. Rows loaded with select("*") also contain
    // database-managed timestamps; mixing those rows with a newly added row in
    // one bulk upsert can cause PostgREST to fill the new row's created_at with
    // null instead of allowing the database default to run.
    const rows = portfolio.map((item, index) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      image_url: item.image_url,
      gear: item.gear,
      location: item.location,
      settings: item.settings,
      sort_order: index,
      is_visible: item.is_visible,
    }));
    const { error: saveError } = await supabase.from("portfolio_items").upsert(rows, { onConflict: "id" });
    setLoading(false);
    if (saveError) return setError(saveError.message);
    showNotice("Portfolio saved");
  };

  const movePortfolioItem = (targetIndex: number) => {
    if (draggedPortfolioIndex === null || draggedPortfolioIndex === targetIndex) return;
    setPortfolio((current) => {
      const next = [...current];
      const [moved] = next.splice(draggedPortfolioIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next.map((item, index) => ({ ...item, sort_order: index }));
    });
    setDraggedPortfolioIndex(null);
    showNotice("Order changed. Click Save portfolio to publish it.");
  };

  const movePricingPackage = (targetIndex: number) => {
    if (draggedPricingIndex === null || draggedPricingIndex === targetIndex) return;
    setPricing((current) => {
      const packages = [...current.packages];
      const [moved] = packages.splice(draggedPricingIndex, 1);
      packages.splice(targetIndex, 0, moved);
      return { ...current, packages };
    });
    setDraggedPricingIndex(null);
    showNotice("Package order changed. Save pricing to publish it.");
  };

  const updatePricingPackage = (index: number, changes: Partial<PricingPackage>) => {
    setPricing((current) => ({
      ...current,
      packages: current.packages.map((pkg, packageIndex) => packageIndex === index ? { ...pkg, ...changes } : pkg),
    }));
  };

  const uploadPortfolioImage = async (index: number, file?: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadSiteImage(file, "portfolio");
      setPortfolio((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, image_url: url } : row));
      showNotice("Image uploaded. Save portfolio to publish it.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolioItem = async (index: number) => {
    const item = portfolio[index];
    setPortfolio((rows) => rows.filter((_, rowIndex) => rowIndex !== index));
    if (!item) return;
    const { error: deleteError } = await supabase.from("portfolio_items").delete().eq("id", item.id);
    if (deleteError && deleteError.code !== "PGRST116") setError(deleteError.message);
  };

  const setMessageStatus = async (id: string, status: string) => {
    const { error: updateError } = await supabase.from("contact_messages").update({ status }).eq("id", id);
    if (updateError) return setError(updateError.message);
    setMessages((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
  };

  const deleteMessage = async (message: MessageRow) => {
    const confirmed = window.confirm(`Delete the inquiry from ${message.name}? This cannot be undone.`);
    if (!confirmed) return;
    setLoading(true);
    setError("");
    const { data: deletedMessage, error: deleteError } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", message.id)
      .select("id")
      .maybeSingle();
    if (deleteError) {
      setLoading(false);
      return setError(deleteError.message);
    }
    if (!deletedMessage) {
      setLoading(false);
      return setError("Supabase did not delete this inquiry. Run supabase/fix-inquiry-delete.sql once in the Supabase SQL Editor, then try again.");
    }
    if (message.attachment_path) {
      const { error: attachmentError } = await supabase.storage.from("contact-attachments").remove([message.attachment_path]);
      if (attachmentError) setError(`The inquiry was deleted, but its attachment could not be removed: ${attachmentError.message}`);
    }
    setLoading(false);
    setMessages((rows) => rows.filter((row) => row.id !== message.id));
    showNotice("Inquiry deleted");
  };

  const openAttachment = async (path: string) => {
    const { data, error: signedError } = await supabase.storage.from("contact-attachments").createSignedUrl(path, 60);
    if (signedError) return setError(signedError.message);
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const categories = useMemo(() => [...new Set(CMS_FIELDS.map((field) => field.category))], []);

  if (checkingAuth) return <div className="min-h-screen bg-[#090B0B]" />;
  if (!session) return <Login onSession={setSession} />;

  return (
    <div className="min-h-screen bg-[#090B0B] text-[#F8F4F2]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#090B0B]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3"><LayoutDashboard className="text-[#A27B5D]" size={20} /><div><p className="font-display text-xl font-semibold">Guliyev Photo</p><p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Content administration</p></div></div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="rounded border border-white/10 px-3 py-2 text-xs text-white/60 hover:border-[#A27B5D] hover:text-[#A27B5D]">View site</a>
            <button onClick={() => void supabase.auth.signOut()} className="rounded border border-white/10 p-2 text-white/60 hover:text-[#A27B5D]" title="Sign out"><LogOut size={16} /></button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 md:grid-cols-[230px_1fr]">
        <aside className="border-b border-white/10 p-4 md:min-h-[calc(100vh-73px)] md:border-b-0 md:border-r">
          <nav className="flex gap-2 overflow-x-auto md:flex-col">
            {([
              ["content", "Content & images", ImageIcon],
              ["portfolio", "Portfolio", LayoutDashboard],
              ["pricing", "Pricing", DollarSign],
              ["blog", "Blog articles", BookOpen],
              ["testimonials", "Testimonials", Quote],
              ["faq", "FAQ", Plus],
              ["contact", "Contact form", Save],
              ["messages", `Inquiries (${messages.filter((message) => message.status === "new").length})`, Inbox],
            ] as const).map(([id, label, Icon]) => (
              <button key={id} onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-3 rounded px-4 py-3 text-left text-xs font-semibold transition ${tab === id ? "bg-[#A27B5D] text-[#090B0B]" : "text-white/60 hover:bg-white/5 hover:text-white"}`}><Icon size={15} />{label}</button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 p-5 md:p-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A27B5D]">Dashboard</p><h1 className="mt-1 font-display text-4xl font-semibold">{{ content: "Section content & images", portfolio: "Portfolio manager", pricing: "Pricing manager", blog: "Blog manager", testimonials: "Client testimonials", faq: "Frequently asked questions", contact: "Contact form fields", messages: "Contact inquiries" }[tab]}</h1></div>
            <button onClick={() => void loadData()} disabled={loading} className="flex items-center gap-2 rounded border border-white/10 px-4 py-2 text-xs text-white/60 hover:border-[#A27B5D] hover:text-[#A27B5D]"><RefreshCw size={14} className={loading ? "animate-spin" : ""} />Refresh</button>
          </div>

          {notice && <div className="mb-6 flex items-center gap-2 rounded border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200"><Check size={14} />{notice}</div>}
          {error && <div role="alert" className="mb-6 rounded border border-red-400/25 bg-red-500/10 px-4 py-3 text-xs text-red-200">{error}</div>}

          {tab === "content" && (
            <div className="space-y-8">
              {categories.map((category) => (
                <section key={category} className="rounded-lg border border-white/10 bg-[#283133]/20 p-5 md:p-6">
                  <h2 className="mb-5 font-display text-2xl font-semibold">{category}</h2>
                  <div className="grid gap-5 lg:grid-cols-2">
                    {CMS_FIELDS.filter((field) => field.category === category).map((field) => (
                      <label key={field.key} className={field.type === "textarea" ? "lg:col-span-2" : ""}>
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/45">{field.label}</span>
                        {field.type === "textarea" ? (
                          <textarea rows={4} value={content[field.key] || ""} onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-sm outline-none focus:border-[#A27B5D]" />
                        ) : field.type === "checkbox" ? (
                          <button type="button" onClick={() => setContent((current) => ({ ...current, [field.key]: current[field.key] === 'false' ? 'true' : 'false' }))} className={`flex w-full items-center justify-between rounded border px-4 py-3 text-sm ${content[field.key] !== 'false' ? 'border-[#A27B5D]/50 bg-[#A27B5D]/10 text-[#A27B5D]' : 'border-white/10 bg-black/25 text-white/45'}`}><span>{content[field.key] !== 'false' ? 'Visible' : 'Hidden'}</span><span className={`h-5 w-9 rounded-full p-0.5 ${content[field.key] !== 'false' ? 'bg-[#A27B5D]' : 'bg-white/15'}`}><span className={`block h-4 w-4 rounded-full bg-white transition-transform ${content[field.key] !== 'false' ? 'translate-x-4' : ''}`} /></span></button>
                        ) : field.type === "range" ? (
                          <div className="flex items-center gap-4 rounded border border-white/10 bg-black/25 px-4 py-3"><input type="range" min="0" max="100" value={content[field.key] || "50"} onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))} className="flex-1 accent-[#A27B5D]" /><span className="w-12 text-right text-sm text-[#A27B5D]">{content[field.key] || '50'}%</span></div>
                        ) : (
                          <input type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"} value={content[field.key] || ""} onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-sm outline-none focus:border-[#A27B5D]" />
                        )}
                        {field.type === "image" && (
                          <div className="mt-3 flex items-center gap-3">
                            {content[field.key] && <img src={content[field.key]} alt="" className="h-16 w-20 rounded border border-white/10 object-cover" />}
                            <span className="relative inline-flex cursor-pointer items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs text-white/60 hover:border-[#A27B5D] hover:text-[#A27B5D]"><Upload size={13} />Upload image<input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0" onChange={(event) => void uploadForField(field.key, event.target.files?.[0])} /></span>
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </section>
              ))}
              <button onClick={() => void saveContent()} disabled={loading} className="flex items-center gap-2 rounded bg-[#A27B5D] px-6 py-3 text-sm font-bold text-[#090B0B] hover:bg-[#AA876C] disabled:opacity-60"><Save size={16} />Save all content</button>
            </div>
          )}

          {tab === "portfolio" && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setPortfolio((rows) => [...rows, blankPortfolio()])} className="flex items-center gap-2 rounded bg-[#A27B5D] px-4 py-2 text-xs font-bold text-[#090B0B]"><Plus size={14} />Add image</button>
                {!portfolio.length && <button onClick={seedPortfolio} className="rounded border border-white/10 px-4 py-2 text-xs text-white/60 hover:text-white">Load current portfolio</button>}
                <button onClick={() => void savePortfolio()} disabled={loading || !portfolio.length} className="flex items-center gap-2 rounded border border-[#A27B5D]/40 px-4 py-2 text-xs text-[#A27B5D] disabled:opacity-40"><Save size={14} />Save portfolio</button>
              </div>
              {portfolio.map((item, index) => (
                <article key={item.id} onDragOver={(event) => event.preventDefault()} onDrop={() => movePortfolioItem(index)} className={`relative grid gap-5 rounded-lg border bg-[#283133]/20 p-5 lg:grid-cols-[180px_1fr_auto] ${draggedPortfolioIndex === index ? 'border-[#A27B5D]' : 'border-white/10'}`}>
                  <button type="button" draggable onDragStart={() => setDraggedPortfolioIndex(index)} onDragEnd={() => setDraggedPortfolioIndex(null)} className="absolute right-12 top-4 cursor-grab rounded p-2 text-white/30 hover:bg-white/5 hover:text-[#A27B5D] active:cursor-grabbing" title="Drag to reorder"><GripVertical size={18} /></button>
                  <div>
                    <div className="aspect-[4/3] overflow-hidden rounded bg-black/30">{item.image_url ? <img src={item.image_url} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-white/20"><ImageIcon /></div>}</div>
                    <label className="relative mt-3 flex cursor-pointer items-center justify-center gap-2 rounded border border-white/10 px-3 py-2 text-xs text-white/60 hover:text-[#A27B5D]"><Upload size={13} />Replace<input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0" onChange={(event) => void uploadPortfolioImage(index, event.target.files?.[0])} /></label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {([['title','Title'],['category','Category'],['image_url','Image URL']] as const).map(([key, label]) => (
                      <label key={key} className={key === "image_url" ? "md:col-span-2" : ""}><span className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-white/40">{label}</span><input value={String(item[key])} onChange={(event) => setPortfolio((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 px-3 py-2 text-xs outline-none focus:border-[#A27B5D]" /></label>
                    ))}
                    <label className="md:col-span-2"><span className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-white/40">Description</span><textarea rows={3} value={item.description || ""} onChange={(event) => setPortfolio((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, description: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 px-3 py-2 text-xs outline-none focus:border-[#A27B5D]" /></label>
                    <label className="flex items-center gap-2 text-xs text-white/60"><input type="checkbox" checked={item.is_visible} onChange={(event) => setPortfolio((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, is_visible: event.target.checked } : row))} className="accent-[#A27B5D]" />Visible on website</label>
                  </div>
                  <button onClick={() => void deletePortfolioItem(index)} className="self-start rounded border border-red-400/15 p-2 text-red-300/60 hover:bg-red-500/10 hover:text-red-200" title="Delete"><Trash2 size={15} /></button>
                </article>
              ))}
            </div>
          )}

          {tab === "pricing" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[#A27B5D]/25 bg-[#A27B5D]/5 p-4">
                <button onClick={() => setPricing((current) => ({ ...current, packages: [...current.packages, blankPricingPackage()] }))} className="flex items-center gap-2 rounded bg-[#A27B5D] px-4 py-2 text-xs font-bold text-[#090B0B]"><Plus size={14} />Add package</button>
                <button onClick={() => void saveStructuredContent('pricing.data', pricing, 'Pricing', 'Pricing')} disabled={loading} className="flex items-center gap-2 rounded border border-[#A27B5D]/50 px-4 py-2 text-xs font-semibold text-[#A27B5D] disabled:opacity-40"><Save size={14} />Save all pricing</button>
                <p className="text-[10px] text-white/45">Edit every part of the pricing page. Changes go live after you save.</p>
              </div>

              <section className="rounded-lg border border-white/10 bg-[#283133]/20 p-5 md:p-6">
                <div className="mb-5"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A27B5D]">Page header</p><h2 className="mt-1 font-display text-2xl font-semibold">Pricing introduction</h2></div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Eyebrow</span><input value={pricing.eyebrow} onChange={(event) => setPricing((current) => ({ ...current, eyebrow: event.target.value }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs outline-none focus:border-[#A27B5D]" /></label>
                  <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Main heading</span><input value={pricing.heading} onChange={(event) => setPricing((current) => ({ ...current, heading: event.target.value }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs outline-none focus:border-[#A27B5D]" /></label>
                  <label className="md:col-span-2"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Introduction</span><textarea rows={4} value={pricing.intro} onChange={(event) => setPricing((current) => ({ ...current, intro: event.target.value }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-6 outline-none focus:border-[#A27B5D]" /></label>
                </div>
              </section>

              <div className="space-y-4">
                <div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A27B5D]">Packages</p><h2 className="mt-1 font-display text-2xl font-semibold">Package cards</h2><p className="mt-1 text-[10px] text-white/40">Drag the handle to change display order. Hidden packages remain saved but do not appear on the website.</p></div>
                {pricing.packages.map((pkg, index) => (
                  <article key={pkg.id} onDragOver={(event) => event.preventDefault()} onDrop={() => movePricingPackage(index)} className={`relative rounded-lg border bg-[#283133]/20 p-5 md:p-6 ${draggedPricingIndex === index ? 'border-[#A27B5D]' : 'border-white/10'}`}>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <button type="button" draggable onDragStart={() => setDraggedPricingIndex(index)} onDragEnd={() => setDraggedPricingIndex(null)} className="cursor-grab rounded p-2 text-white/30 hover:bg-white/5 hover:text-[#A27B5D] active:cursor-grabbing" title="Drag to reorder"><GripVertical size={18} /></button>
                        <div><p className="text-[9px] uppercase tracking-wider text-white/35">Package {index + 1}</p><h3 className="font-display text-xl font-semibold">{pkg.name || 'Untitled package'}</h3></div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <label className="flex items-center gap-2 text-white/60"><input type="checkbox" checked={pkg.visible !== false} onChange={(event) => updatePricingPackage(index, { visible: event.target.checked })} className="accent-[#A27B5D]" />Visible</label>
                        <label className="flex items-center gap-2 text-white/60"><input type="checkbox" checked={pkg.highlighted} onChange={(event) => updatePricingPackage(index, { highlighted: event.target.checked })} className="accent-[#A27B5D]" />Highlight card</label>
                        <button onClick={() => setPricing((current) => { const copy = { ...pkg, id: crypto.randomUUID(), name: `${pkg.name} copy` }; const packages = [...current.packages]; packages.splice(index + 1, 0, copy); return { ...current, packages }; })} className="rounded border border-white/10 p-2 text-white/45 hover:text-[#A27B5D]" title="Duplicate package"><Copy size={14} /></button>
                        <button onClick={() => setPricing((current) => ({ ...current, packages: current.packages.filter((_, packageIndex) => packageIndex !== index) }))} className="rounded border border-red-400/15 p-2 text-red-300/60 hover:bg-red-500/10 hover:text-red-200" title="Delete package"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <label className="md:col-span-2"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Package name</span><input value={pkg.name} onChange={(event) => updatePricingPackage(index, { name: event.target.value })} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs outline-none focus:border-[#A27B5D]" /></label>
                      <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Displayed price</span><input value={pkg.price} onChange={(event) => updatePricingPackage(index, { price: event.target.value })} placeholder="$350 or From $350" className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs outline-none focus:border-[#A27B5D]" /></label>
                      <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Currency / suffix</span><input value={pkg.currency} onChange={(event) => updatePricingPackage(index, { currency: event.target.value })} placeholder="USD" className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs uppercase outline-none focus:border-[#A27B5D]" /></label>
                      <label className="md:col-span-2 lg:col-span-4"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Description</span><textarea rows={3} value={pkg.description} onChange={(event) => updatePricingPackage(index, { description: event.target.value })} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-5 outline-none focus:border-[#A27B5D]" /></label>
                      <label className="md:col-span-2"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Included features — one per line</span><textarea rows={8} value={pkg.features.join('\n')} onChange={(event) => updatePricingPackage(index, { features: event.target.value.split('\n') })} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-6 outline-none focus:border-[#A27B5D]" /></label>
                      <div className="grid content-start gap-4 md:col-span-2">
                        <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Badge text (optional)</span><input value={pkg.badge} onChange={(event) => updatePricingPackage(index, { badge: event.target.value })} placeholder="Most Popular" className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs outline-none focus:border-[#A27B5D]" /></label>
                        <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Booking button label</span><input value={pkg.buttonLabel} onChange={(event) => updatePricingPackage(index, { buttonLabel: event.target.value })} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs outline-none focus:border-[#A27B5D]" /></label>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <section className="rounded-lg border border-white/10 bg-[#283133]/20 p-5 md:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A27B5D]">Custom quotes</p><h2 className="mt-1 font-display text-2xl font-semibold">Commercial pricing section</h2></div><label className="flex items-center gap-2 text-xs text-white/60"><input type="checkbox" checked={pricing.commercial.visible !== false} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, visible: event.target.checked } }))} className="accent-[#A27B5D]" />Show section</label></div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Eyebrow</span><input value={pricing.commercial.eyebrow} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, eyebrow: event.target.value } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                  <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Heading</span><input value={pricing.commercial.heading} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, heading: event.target.value } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                  <label className="md:col-span-2"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Main text</span><textarea rows={3} value={pricing.commercial.body} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, body: event.target.value } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-5" /></label>
                  <label className="md:col-span-2"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Secondary text</span><textarea rows={3} value={pricing.commercial.secondaryBody} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, secondaryBody: event.target.value } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-5" /></label>
                  <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Quote button label</span><input value={pricing.commercial.buttonLabel} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, buttonLabel: event.target.value } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                  <label><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Factors heading</span><input value={pricing.commercial.factorsHeading} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, factorsHeading: event.target.value } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                  <label className="md:col-span-2"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Pricing factors — one per line</span><textarea rows={8} value={pricing.commercial.factors.join('\n')} onChange={(event) => setPricing((current) => ({ ...current, commercial: { ...current.commercial, factors: event.target.value.split('\n') } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-6" /></label>
                </div>
              </section>

              <section className="rounded-lg border border-white/10 bg-[#283133]/20 p-5 md:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A27B5D]">Questions</p><h2 className="mt-1 font-display text-2xl font-semibold">Pricing FAQ</h2></div><div className="flex items-center gap-4"><label className="flex items-center gap-2 text-xs text-white/60"><input type="checkbox" checked={pricing.faq.visible !== false} onChange={(event) => setPricing((current) => ({ ...current, faq: { ...current.faq, visible: event.target.checked } }))} className="accent-[#A27B5D]" />Show FAQ</label><button onClick={() => setPricing((current) => ({ ...current, faq: { ...current.faq, items: [...current.faq.items, { id: crypto.randomUUID(), question: 'New pricing question', answer: '' }] } }))} className="flex items-center gap-2 rounded border border-[#A27B5D]/40 px-3 py-2 text-xs text-[#A27B5D]"><Plus size={13} />Add question</button></div></div>
                <label className="mb-5 block"><span className="mb-1.5 block text-[9px] font-bold uppercase text-white/40">Section heading</span><input value={pricing.faq.heading} onChange={(event) => setPricing((current) => ({ ...current, faq: { ...current.faq, heading: event.target.value } }))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                <div className="space-y-3">
                  {pricing.faq.items.map((faq, index) => <article key={faq.id} className="grid gap-3 rounded border border-white/10 bg-black/15 p-4 md:grid-cols-[1fr_auto]"><div className="space-y-3"><input value={faq.question} onChange={(event) => setPricing((current) => ({ ...current, faq: { ...current.faq, items: current.faq.items.map((item, itemIndex) => itemIndex === index ? { ...item, question: event.target.value } : item) } }))} placeholder="Question" className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs font-semibold" /><textarea rows={3} value={faq.answer} onChange={(event) => setPricing((current) => ({ ...current, faq: { ...current.faq, items: current.faq.items.map((item, itemIndex) => itemIndex === index ? { ...item, answer: event.target.value } : item) } }))} placeholder="Answer" className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-5" /></div><button onClick={() => setPricing((current) => ({ ...current, faq: { ...current.faq, items: current.faq.items.filter((_, itemIndex) => itemIndex !== index) } }))} className="self-start rounded border border-red-400/15 p-2 text-red-300/60"><Trash2 size={14} /></button></article>)}
                </div>
              </section>

              <button onClick={() => void saveStructuredContent('pricing.data', pricing, 'Pricing', 'Pricing')} disabled={loading} className="flex items-center gap-2 rounded bg-[#A27B5D] px-6 py-3 text-sm font-bold text-[#090B0B] hover:bg-[#AA876C] disabled:opacity-60"><Save size={16} />Save all pricing</button>
            </div>
          )}

          {tab === "blog" && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setArticles((rows) => [blankArticle(), ...rows])} className="flex items-center gap-2 rounded bg-[#A27B5D] px-4 py-2 text-xs font-bold text-[#090B0B]"><Plus size={14} />Add article</button>
                <button onClick={() => void saveStructuredContent('blog.articles', articles, 'Blog articles', 'Blog')} disabled={loading} className="flex items-center gap-2 rounded border border-[#A27B5D]/40 px-4 py-2 text-xs text-[#A27B5D]"><Save size={14} />Save articles</button>
              </div>
              {articles.map((article, index) => (
                <article key={article.id} className="grid gap-5 rounded-lg border border-white/10 bg-[#283133]/20 p-5 lg:grid-cols-[180px_1fr_auto]">
                  <div>
                    <div className="aspect-[16/10] overflow-hidden rounded bg-black/30">{article.imageUrl ? <img src={article.imageUrl} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-white/20"><ImageIcon /></div>}</div>
                    <label className="relative mt-3 flex cursor-pointer items-center justify-center gap-2 rounded border border-white/10 px-3 py-2 text-xs text-white/60 hover:text-[#A27B5D]"><Upload size={13} />Upload image<input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0" onChange={(event) => void uploadArticleImage(index, event.target.files?.[0])} /></label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="md:col-span-2"><span className="mb-1 block text-[9px] font-bold uppercase text-white/40">Title</span><input value={article.title} onChange={(event) => setArticles((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, title: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-sm" /></label>
                    <label><span className="mb-1 block text-[9px] font-bold uppercase text-white/40">Category</span><input value={article.category} onChange={(event) => setArticles((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, category: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                    <label><span className="mb-1 block text-[9px] font-bold uppercase text-white/40">Read time</span><input value={article.readTime} onChange={(event) => setArticles((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, readTime: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                    <label className="md:col-span-2"><span className="mb-1 block text-[9px] font-bold uppercase text-white/40">Search keyword</span><input value={article.keyword} onChange={(event) => setArticles((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, keyword: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                    <label className="md:col-span-2"><span className="mb-1 block text-[9px] font-bold uppercase text-white/40">Summary</span><textarea rows={3} value={article.summary} onChange={(event) => setArticles((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, summary: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>
                    <label className="md:col-span-2"><span className="mb-1 block text-[9px] font-bold uppercase text-white/40">Article body — separate paragraphs with a blank line</span><textarea rows={10} value={article.content.join('\n\n')} onChange={(event) => setArticles((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, content: event.target.value.split(/\n\n+/) } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs leading-6" /></label>
                  </div>
                  <button onClick={() => setArticles((rows) => rows.filter((_, rowIndex) => rowIndex !== index))} className="self-start rounded border border-red-400/15 p-2 text-red-300/60 hover:bg-red-500/10"><Trash2 size={15} /></button>
                </article>
              ))}
            </div>
          )}

          {tab === "testimonials" && (
            <div className="space-y-5">
              <div className="flex gap-3"><button onClick={() => setTestimonials((rows) => [...rows, blankTestimonial()])} className="flex items-center gap-2 rounded bg-[#A27B5D] px-4 py-2 text-xs font-bold text-[#090B0B]"><Plus size={14} />Add testimonial</button><button onClick={() => void saveStructuredContent('home.testimonials.data', testimonials, 'Testimonials', 'Homepage')} className="flex items-center gap-2 rounded border border-[#A27B5D]/40 px-4 py-2 text-xs text-[#A27B5D]"><Save size={14} />Save testimonials</button></div>
              {testimonials.map((item, index) => <article key={item.id} className="grid gap-4 rounded-lg border border-white/10 bg-[#283133]/20 p-5 md:grid-cols-[110px_1fr_auto]">
                <div><div className="aspect-square overflow-hidden rounded-full bg-black/25">{item.imageUrl ? <img src={item.imageUrl} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-white/20"><Quote /></div>}</div><label className="relative mt-2 flex cursor-pointer justify-center rounded border border-white/10 p-2 text-[10px] text-white/50">Upload<input type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={(event) => void uploadTestimonialImage(index, event.target.files?.[0])} /></label></div>
                <div className="grid gap-3 md:grid-cols-2"><input value={item.name} placeholder="Client name" onChange={(event) => setTestimonials((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, name: event.target.value } : row))} className="rounded border border-white/10 bg-black/25 p-3 text-xs" /><input value={item.type} placeholder="Session type" onChange={(event) => setTestimonials((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, type: event.target.value } : row))} className="rounded border border-white/10 bg-black/25 p-3 text-xs" /><textarea rows={4} value={item.text} placeholder="Client testimonial" onChange={(event) => setTestimonials((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, text: event.target.value } : row))} className="rounded border border-white/10 bg-black/25 p-3 text-xs md:col-span-2" /></div>
                <button onClick={() => setTestimonials((rows) => rows.filter((_, rowIndex) => rowIndex !== index))} className="self-start rounded border border-red-400/15 p-2 text-red-300/60"><Trash2 size={15} /></button>
              </article>)}
            </div>
          )}

          {tab === "faq" && (
            <div className="space-y-5">
              <div className="flex gap-3"><button onClick={() => setFaqs((rows) => [...rows, { id: crypto.randomUUID(), question: 'New question', answer: '' }])} className="flex items-center gap-2 rounded bg-[#A27B5D] px-4 py-2 text-xs font-bold text-[#090B0B]"><Plus size={14} />Add question</button><button onClick={() => void saveStructuredContent('home.faq.data', faqs, 'FAQ', 'Homepage')} className="flex items-center gap-2 rounded border border-[#A27B5D]/40 px-4 py-2 text-xs text-[#A27B5D]"><Save size={14} />Save FAQ</button></div>
              {faqs.map((faq, index) => <article key={faq.id} className="grid gap-4 rounded-lg border border-white/10 bg-[#283133]/20 p-5 md:grid-cols-[1fr_auto]"><div className="space-y-3"><input value={faq.question} onChange={(event) => setFaqs((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, question: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-sm font-semibold" /><textarea rows={4} value={faq.answer} onChange={(event) => setFaqs((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, answer: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></div><button onClick={() => setFaqs((rows) => rows.filter((_, rowIndex) => rowIndex !== index))} className="self-start rounded border border-red-400/15 p-2 text-red-300/60"><Trash2 size={15} /></button></article>)}
            </div>
          )}

          {tab === "contact" && (
            <div className="space-y-5">
              <div className="rounded border border-[#A27B5D]/20 bg-[#A27B5D]/5 p-4 text-xs text-white/60">Change labels, placeholders, required status, visibility, and dropdown choices. Core field names stay fixed so inquiries continue to save correctly.</div>
              <button onClick={() => void saveStructuredContent('contact.fields', contactFields, 'Contact fields', 'Contact')} className="flex items-center gap-2 rounded bg-[#A27B5D] px-4 py-2 text-xs font-bold text-[#090B0B]"><Save size={14} />Save contact fields</button>
              {contactFields.map((field, index) => <article key={field.key} className="rounded-lg border border-white/10 bg-[#283133]/20 p-5"><div className="mb-4 flex items-center justify-between"><div><p className="font-semibold">{field.label}</p><p className="text-[10px] text-white/35">Field: {field.key}</p></div><div className="flex gap-4 text-xs text-white/60"><label className="flex items-center gap-2"><input type="checkbox" checked={field.visible} onChange={(event) => setContactFields((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, visible: event.target.checked } : row))} className="accent-[#A27B5D]" />Visible</label><label className="flex items-center gap-2"><input type="checkbox" checked={field.required} onChange={(event) => setContactFields((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, required: event.target.checked } : row))} className="accent-[#A27B5D]" />Required</label></div></div><div className="grid gap-3 md:grid-cols-2"><label><span className="mb-1 block text-[9px] uppercase text-white/40">Label</span><input value={field.label} onChange={(event) => setContactFields((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, label: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label><label><span className="mb-1 block text-[9px] uppercase text-white/40">Placeholder</span><input value={field.placeholder} onChange={(event) => setContactFields((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, placeholder: event.target.value } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>{field.type === 'select' && <label className="md:col-span-2"><span className="mb-1 block text-[9px] uppercase text-white/40">Dropdown options — one per line</span><textarea rows={5} value={(field.options || []).join('\n')} onChange={(event) => setContactFields((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, options: event.target.value.split('\n').map((option) => option.trim()).filter(Boolean) } : row))} className="w-full rounded border border-white/10 bg-black/25 p-3 text-xs" /></label>}</div></article>)}
            </div>
          )}

          {tab === "messages" && (
            <div className="space-y-4">
              {!messages.length && <div className="rounded-lg border border-dashed border-white/10 p-12 text-center text-sm text-white/35">No inquiries yet.</div>}
              {messages.map((message) => (
                <article key={message.id} className="rounded-lg border border-white/10 bg-[#283133]/20 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div><div className="flex items-center gap-2"><h2 className="font-display text-2xl font-semibold">{message.name}</h2><span className={`rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${message.status === "new" ? "bg-[#A27B5D] text-[#090B0B]" : "bg-white/10 text-white/50"}`}>{message.status}</span></div><p className="mt-1 text-xs text-white/45">{message.email}{message.phone ? ` · ${message.phone}` : ""} · {new Date(message.created_at).toLocaleString()}</p></div>
                    <div className="flex items-center gap-2"><select value={message.status} onChange={(event) => void setMessageStatus(message.id, event.target.value)} className="rounded border border-white/10 bg-[#090B0B] px-3 py-2 text-xs"><option value="new">New</option><option value="contacted">Contacted</option><option value="booked">Booked</option><option value="archived">Archived</option></select><button onClick={() => void deleteMessage(message)} disabled={loading} className="rounded border border-red-400/20 p-2 text-red-300/60 hover:bg-red-500/10 hover:text-red-200 disabled:opacity-40" title="Delete inquiry" aria-label={`Delete inquiry from ${message.name}`}><Trash2 size={15} /></button></div>
                  </div>
                  <div className="mt-5 grid gap-3 text-xs text-white/65 md:grid-cols-3"><p><span className="text-white/30">Ticket:</span> {message.ticket_id}</p><p><span className="text-white/30">Type:</span> {message.session_type || message.source}</p><p><span className="text-white/30">Date:</span> {message.preferred_date || "Not specified"}</p><p><span className="text-white/30">Company:</span> {message.company || "—"}</p><p><span className="text-white/30">Budget:</span> {message.budget || "—"}</p></div>
                  {message.details && <p className="mt-5 whitespace-pre-wrap rounded bg-black/20 p-4 text-sm leading-6 text-white/70">{message.details}</p>}
                  {message.attachment_path && <button onClick={() => void openAttachment(message.attachment_path!)} className="mt-4 flex items-center gap-2 text-xs text-[#A27B5D]"><ImageIcon size={14} />Open attachment</button>}
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
