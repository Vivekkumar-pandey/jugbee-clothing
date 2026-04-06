import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag, Menu, X, ArrowRight, Star, Truck, RotateCcw,
  ShieldCheck, Instagram, ChevronRight, ChevronUp, Play,
  Search, User, Heart
} from "lucide-react";
import { cn } from "./lib/utils";
import { products, categories } from "./data/products";
import type { Product } from "./data/products";
import { StoreProvider, useStore } from "./context/StoreContext";
import { ToastContainer } from "./components/Toast";
import { CartDrawer } from "./components/CartDrawer";
import { ProductModal } from "./components/ProductModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { AuthModal } from "./components/AuthModal";
import { VideoModal } from "./components/VideoModal";

/* ============================================ */
/* Announcement Bar                             */
/* ============================================ */
const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const messages = [
    "Free Shipping on Orders Over ₹2,000 🚀",
    "Premium Streetwear for Disciplined Athletes",
    "New Arrivals Dropping Every Week 🔥",
  ];
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % messages.length), 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-brand-accent text-white py-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-center relative z-[60] overflow-hidden h-9 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p key={index} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.5 }} className="absolute w-full">
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

/* ============================================ */
/* Navbar                                       */
/* ============================================ */
interface NavbarProps {
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  onAuthOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
}

const Navbar = ({ onCartOpen, onWishlistOpen, onAuthOpen, searchQuery, onSearchChange, onSearchSubmit }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchToggle = () => {
    if (isSearchOpen && searchQuery.trim()) {
      onSearchSubmit();
    } else {
      setIsSearchOpen(!isSearchOpen);
      if (!isSearchOpen) setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchSubmit();
    }
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      onSearchChange("");
    }
  };

  return (
    <>
      <AnnouncementBar />
      <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", isScrolled ? "glass translate-y-0" : "bg-transparent")} style={{ top: isScrolled ? 0 : "auto" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={cn("flex items-center justify-between transition-all duration-500", isScrolled ? "h-16" : "h-24")}>
            <div className="flex-shrink-0">
              <a href="/" className="group flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-accent flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500">
                  <span className="-rotate-45 group-hover:-rotate-90 transition-transform duration-500 font-display font-black text-xl italic">J</span>
                </div>
                <span className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase italic leading-none">
                  Jugbee<span className="text-brand-accent"> Clothing</span>
                </span>
              </a>
            </div>
            <div className="flex items-center gap-6 md:gap-10">
              <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
                <a href="#shop" className="hover:text-brand-accent transition-colors">Shop</a>
                <a href="#collections" className="hover:text-brand-accent transition-colors">Collections</a>
                <a href="#story" className="hover:text-brand-accent transition-colors">The Mission</a>
              </div>
              <div className="flex items-center gap-2 md:gap-4 border-l border-white/10 pl-6 md:pl-10">
                <div className="flex items-center">
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.input
                        ref={searchRef}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        placeholder="SEARCH GEAR..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        className="bg-white/5 border-b border-white/20 px-4 py-1 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-brand-accent hidden md:block"
                      />
                    )}
                  </AnimatePresence>
                  <button onClick={handleSearchToggle} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Search size={18} /></button>
                </div>
                <button onClick={onAuthOpen} className="hidden sm:block p-2 hover:bg-white/10 rounded-full transition-colors"><User size={18} /></button>
                <button onClick={onWishlistOpen} className="hidden sm:block p-2 hover:bg-white/10 rounded-full transition-colors relative">
                  <Heart size={18} />
                  {wishlist.length > 0 && <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand-accent text-[8px] flex items-center justify-center rounded-full font-black">{wishlist.length}</span>}
                </button>
                <button onClick={onCartOpen} className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                  <ShoppingBag size={18} />
                  {cartCount > 0 && <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand-accent text-[8px] flex items-center justify-center rounded-full font-black">{cartCount}</span>}
                </button>
                <button className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-0 z-[100] bg-brand-secondary lg:hidden">
              <div className="flex flex-col h-full p-8">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-xl font-display font-black italic uppercase">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={24} /></button>
                </div>
                {/* Mobile Search */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded">
                    <Search size={16} className="text-white/40" />
                    <input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { onSearchSubmit(); setIsMobileMenuOpen(false); } }}
                      className="bg-transparent text-sm font-medium focus:outline-none flex-1 placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  {["Shop All", "New Drops", "Collections", "Our Mission", "Support"].map((item, i) => (
                    <motion.a key={item} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-black uppercase italic hover:text-brand-accent transition-colors">{item}</motion.a>
                  ))}
                </div>
                <div className="mt-auto pt-12 border-t border-white/10">
                  <button onClick={() => { setIsMobileMenuOpen(false); onAuthOpen(); }} className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.2em] text-sm">Account Login</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

/* ============================================ */
/* Hero                                         */
/* ============================================ */
const Hero = ({ onWatchFilm }: { onWatchFilm: () => void }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 10}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop" alt="Athlete training" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/40 to-brand-secondary/60" />
      </div>
      {/* Particles */}
      {particles.map((p) => (
        <div key={p.id} className="particle" style={{ left: p.left, bottom: "-10px", animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }} />
      ))}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tighter leading-none mb-8 italic">
            Built for <br /><span className="text-gradient-accent">Discipline</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-sm md:text-base mb-10 leading-relaxed font-medium">
            Jugbee Clothing isn't just gym wear. It's the armor you wear when you face the grind. Engineered for those who thrive in the struggle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#shop" className="group w-full sm:w-auto bg-white text-black px-10 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-accent hover:text-white transition-all">
              Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={onWatchFilm} className="w-full sm:w-auto border border-white/20 px-10 py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Play size={16} fill="currentColor" /> Watch Film
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================ */
/* Product Card                                 */
/* ============================================ */
const ProductCard = ({ product, onQuickView }: { key?: React.Key; product: Product; onQuickView: (p: Product) => void }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="product-card group cursor-pointer">
      <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-4 rounded-lg" onClick={() => onQuickView(product)}>
        <img src={product.image} alt={product.name} className="product-img w-full h-full object-cover" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.trending && <span className="bg-white text-black text-[10px] font-black uppercase px-2.5 py-1 rounded flex items-center gap-1">🔥 Trending</span>}
          {product.newArrival && <span className="bg-brand-gold text-black text-[10px] font-black uppercase px-2.5 py-1 rounded">✨ New</span>}
          {product.lowStock && <span className="bg-brand-accent text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">Only 5 Left</span>}
          {discount > 0 && <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded">-{discount}%</span>}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
        >
          <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </button>
        {/* Quick Add */}
        <div className="quick-actions flex gap-0">
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product, "M", product.colors[0]?.name || "Default"); }}
            className="flex-1 bg-white text-black py-3.5 font-black uppercase text-[11px] hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-1"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </div>
      {/* Info */}
      <div className="flex justify-between items-start px-1">
        <div className="min-w-0 flex-1">
          <h4 className="font-bold uppercase text-sm mb-1 truncate">{product.name}</h4>
          <div className="flex items-center gap-1 text-yellow-500 mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
            <span className="text-[10px] text-gray-500 ml-1">({product.reviews})</span>
          </div>
          {/* Color dots */}
          <div className="flex gap-1.5 mt-1">
            {product.colors.map((c) => (
              <div key={c.name} className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} title={c.name} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="font-display font-black text-lg">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="block text-xs text-white/30 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================ */
/* Category Card                                */
/* ============================================ */
const CategoryCard = ({ title, img, delay }: { title: string; img: string; delay: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5 }} className="group relative aspect-[4/5] overflow-hidden cursor-pointer rounded-lg">
    <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
    <div className="absolute bottom-0 left-0 p-8 w-full">
      <h3 className="text-2xl font-display font-black uppercase italic mb-2">{title}</h3>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        Explore <ChevronRight size={14} />
      </div>
    </div>
  </motion.div>
);

/* ============================================ */
/* Sections: Brand, Trust, Social, Newsletter, Footer */
/* ============================================ */
const BrandStory = () => (
  <section id="story" className="py-24 px-6 bg-zinc-900/50">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-brand-accent opacity-20" />
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop" alt="Brand story" className="w-full aspect-[4/5] object-cover relative z-10 rounded-lg" />
        <div className="absolute -bottom-6 -right-6 bg-brand-accent p-8 z-20 hidden md:block rounded-lg">
          <p className="text-4xl font-display font-black italic uppercase leading-tight">Est. <br /> 2024</p>
        </div>
      </div>
      <div>
        <span className="text-brand-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Our Mission</span>
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic mb-8 leading-tight">Not Just Gym Wear. <br /> A Statement of <span className="text-brand-accent">Will.</span></h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-8">Jugbee Clothing was born in the basement gyms and the early morning runs. We don't build clothes for the casual. We build for the disciplined, the obsessed, and the ones who refuse to quit.</p>
        <div className="grid grid-cols-2 gap-8">
          <div><h5 className="font-black uppercase text-xs tracking-widest mb-2">Performance</h5><p className="text-sm text-gray-500">Advanced moisture-wicking tech for the most intense sessions.</p></div>
          <div><h5 className="font-black uppercase text-xs tracking-widest mb-2">Durability</h5><p className="text-sm text-gray-500">Reinforced stitching that survives the heaviest lifts.</p></div>
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-16 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { icon: Truck, title: "Free Shipping", desc: "On orders over ₹2,000" },
        { icon: RotateCcw, title: "Easy Returns", desc: "30-day no-hassle policy" },
        { icon: ShieldCheck, title: "Secure Payment", desc: "100% encrypted checkout" },
        { icon: Star, title: "Elite Quality", desc: "Premium fabrics only" },
      ].map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-white/5 rounded-full"><Icon size={24} className="text-brand-accent" /></div>
          <h6 className="font-black uppercase text-xs tracking-widest">{title}</h6>
          <p className="text-[10px] text-gray-500 uppercase">{desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-24 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic mb-4">Join 10,000+ <br /> Athletes</h2>
        <p className="text-gray-500 font-medium">Tag us @JugbeeClothing to be featured</p>
      </div>
      <button className="flex items-center gap-2 bg-white/5 px-6 py-3 font-black uppercase text-xs hover:bg-white/10 transition-all rounded-lg"><Instagram size={18} /> Follow on Instagram</button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-square bg-zinc-900 overflow-hidden relative group rounded-lg">
          <img src={`https://images.unsplash.com/photo-${1550000000000 + i * 7654321}?w=300&h=300&fit=crop`} alt="User post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/social-${i}/300/300`; }} />
          <div className="absolute inset-0 bg-brand-accent/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"><Instagram size={24} /></div>
        </div>
      ))}
    </div>
  </section>
);

const Newsletter = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="py-24 px-6 bg-brand-accent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic mb-6 text-white">Get 10% OFF <br /> Your First Order</h2>
        <p className="text-white/80 font-bold uppercase tracking-widest text-sm mb-10">Join the inner circle for early access to drops.</p>
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="ENTER YOUR EMAIL" className="flex-1 bg-black/10 border-2 border-white/20 px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white font-bold uppercase tracking-widest" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-24">
      <div className="md:col-span-2">
        <a href="/" className="text-3xl font-display font-black tracking-tighter uppercase italic mb-8 block">Jugbee Clothing</a>
        <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">The ultimate identity for disciplined athletes. We provide the armor, you provide the will.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-brand-accent transition-colors"><Instagram size={20} /></a>
          <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-brand-accent transition-colors"><Play size={20} fill="currentColor" /></a>
        </div>
      </div>
      <div>
        <h5 className="font-black uppercase text-xs tracking-widest mb-6">Shop</h5>
        <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
          {["All Products", "Oversized Tees", "Hoodies", "Joggers"].map((l) => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
        </ul>
      </div>
      <div>
        <h5 className="font-black uppercase text-xs tracking-widest mb-6">Support</h5>
        <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
          {["Contact Us", "Shipping Policy", "Returns & Exchanges", "FAQs"].map((l) => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
        </ul>
      </div>
    </div>
    {/* Payment Icons */}
    <div className="max-w-7xl mx-auto px-0 mb-12 flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
      {["💳 Visa", "💳 Mastercard", "💳 RuPay", "📱 UPI", "🏦 Net Banking", "💰 COD"].map((p) => (
        <span key={p} className="px-3 py-1.5 border border-white/10 rounded">{p}</span>
      ))}
    </div>
    <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-600">
      <p>© 2024 Jugbee Clothing. All Rights Reserved.</p>
      <div className="flex items-center gap-8">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

/* ============================================ */
/* Back to Top                                  */
/* ============================================ */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="back-to-top">
          <ChevronUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ============================================ */
/* App Inner (uses store context)               */
/* ============================================ */
function AppInner() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setSearchActive(true);
      setActiveCategory("All");
      // Scroll to shop section
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setSearchActive(false);
    }
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) setSearchActive(false);
  };

  const filteredProducts = (() => {
    let result = products;
    // Apply search filter
    if (searchActive && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    return result;
  })();

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent selection:text-white">
      <Navbar
        onCartOpen={() => setIsCartOpen(true)}
        onWishlistOpen={() => setIsWishlistOpen(true)}
        onAuthOpen={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main>
        <Hero onWatchFilm={() => setIsVideoOpen(true)} />

        {/* Categories */}
        <section id="collections" className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard title="Oversized Tees" img="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop" delay={0.1} />
            <CategoryCard title="Co-ord Sets" img="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop" delay={0.2} />
            <CategoryCard title="Performance Tanks" img="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop" delay={0.3} />
            <CategoryCard title="Elite Hoodies" img="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop" delay={0.4} />
          </div>
        </section>

        {/* Shop - Product Grid */}
        <section id="shop" className="py-24 px-6 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
              <div>
                <span className="text-brand-accent text-xs font-black uppercase tracking-[0.3em] mb-4 block">Top Picks</span>
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic">
                  {searchActive ? `Results for "${searchQuery}"` : "Our Collection"}
                </h2>
                {searchActive && (
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-sm text-white/50">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found</span>
                    <button
                      onClick={() => { setSearchQuery(""); setSearchActive(false); }}
                      className="text-xs text-brand-accent font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                      <X size={12} /> Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            {!searchActive && (
              <div className="flex flex-wrap gap-2 mb-12">
                {categories.filter(c => {
                  if (c === "All") return true;
                  return products.some(p => p.category === c);
                }).map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`filter-tab ${activeCategory === cat ? "active" : ""}`}>
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-white/20 mb-4" />
                <p className="text-white/40 font-bold uppercase tracking-widest text-sm mb-2">No products found</p>
                <p className="text-white/20 text-sm mb-6">Try a different search term or browse our categories</p>
                <button
                  onClick={() => { setSearchQuery(""); setSearchActive(false); }}
                  className="bg-white/5 hover:bg-white/10 px-6 py-3 font-black uppercase text-xs tracking-widest transition-all rounded"
                >
                  Browse All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence mode="wait">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        <BrandStory />
        <TrustSection />
        <SocialProof />
        <Newsletter />
      </main>
      <Footer />

      {/* Overlays */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} onProductClick={setSelectedProduct} />
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <ToastContainer />
      <BackToTop />
    </div>
  );
}

/* ============================================ */
/* App Root (wraps with provider)               */
/* ============================================ */
export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  );
}
