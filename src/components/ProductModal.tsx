import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ShoppingBag, Star, Ruler, Minus, Plus } from "lucide-react";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const sizeChart = [
  { size: "S", chest: "36\"", length: "27\"", shoulder: "17\"" },
  { size: "M", chest: "38\"", length: "28\"", shoulder: "18\"" },
  { size: "L", chest: "40\"", length: "29\"", shoulder: "19\"" },
  { size: "XL", chest: "42\"", length: "30\"", shoulder: "20\"" },
  { size: "XXL", chest: "44\"", length: "31\"", shoulder: "21\"" },
];

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    if (!selectedSize) { alert("Please select a size"); return; }
    const color = selectedColor || product.colors[0]?.name || "Default";
    addToCart(product, selectedSize, color, qty);
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="modal-content rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[3/4] md:aspect-auto bg-zinc-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-black px-3 py-1.5 rounded">
                    -{discount}% OFF
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`wishlist-btn top-4 right-4 ${isInWishlist(product.id) ? "active" : ""}`}
                >
                  <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Details */}
              <div className="p-8 flex flex-col custom-scroll overflow-y-auto max-h-[80vh]">
                <button onClick={onClose} className="self-end p-2 hover:bg-white/10 rounded-full mb-4">
                  <X size={20} />
                </button>

                <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                  {product.category}
                </span>
                <h2 className="text-2xl font-display font-black uppercase italic mb-3">{product.name}</h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-xs text-white/50">{product.rating} ({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-display font-black">₹{product.price.toLocaleString("en-IN")}</span>
                  <span className="text-lg text-white/30 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  {discount > 0 && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">
                      SAVE ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <p className="text-sm text-white/60 leading-relaxed mb-6">{product.description}</p>

                {/* Colors */}
                <div className="mb-6">
                  <p className="text-xs font-black uppercase tracking-widest mb-3">
                    Color: <span className="text-white/60 font-medium normal-case">{selectedColor || "Select"}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`color-swatch ${selectedColor === c.name ? "selected" : ""}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-black uppercase tracking-widest">Size</p>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[10px] text-brand-accent font-bold uppercase tracking-widest flex items-center gap-1 hover:underline"
                    >
                      <Ruler size={12} /> Size Guide
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`size-btn ${selectedSize === s ? "selected" : ""}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Guide Dropdown */}
                <AnimatePresence>
                  {showSizeGuide && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mb-6"
                    >
                      <table className="w-full text-xs border border-white/10">
                        <thead>
                          <tr className="bg-white/5">
                            <th className="p-2 text-left font-black uppercase">Size</th>
                            <th className="p-2 text-left font-black uppercase">Chest</th>
                            <th className="p-2 text-left font-black uppercase">Length</th>
                            <th className="p-2 text-left font-black uppercase">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeChart.map((row) => (
                            <tr key={row.size} className="border-t border-white/5">
                              <td className="p-2 font-bold">{row.size}</td>
                              <td className="p-2 text-white/60">{row.chest}</td>
                              <td className="p-2 text-white/60">{row.length}</td>
                              <td className="p-2 text-white/60">{row.shoulder}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-black uppercase tracking-widest">Qty</span>
                  <div className="flex items-center border border-white/20">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white/10">
                      <Minus size={14} />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center font-bold border-x border-white/20">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-white text-black py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-brand-accent hover:text-white transition-all"
                  >
                    <ShoppingBag size={16} /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-brand-accent text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-red-600 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>

                {product.lowStock && (
                  <p className="text-center mt-4 text-xs text-orange-400 font-bold uppercase tracking-widest animate-pulse">
                    ⚡ Only a few left in stock!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
