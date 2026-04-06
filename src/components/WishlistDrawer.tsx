import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { products } from "../data/products";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export const WishlistDrawer = ({ isOpen, onClose, onProductClick }: WishlistDrawerProps) => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="drawer-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="drawer-panel flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-brand-accent" />
                <h2 className="text-lg font-black uppercase tracking-wider">Wishlist</h2>
                <span className="bg-brand-accent text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {wishlistProducts.length}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto custom-scroll p-6">
              {wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <Heart size={48} className="text-white/20" />
                  <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Your wishlist is empty</p>
                  <p className="text-white/30 text-xs">Browse products and click the ❤️ to save them here</p>
                  <button
                    onClick={onClose}
                    className="text-brand-accent text-xs font-black uppercase tracking-widest hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlistProducts.map((product) => {
                    const discount = Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100
                    );
                    return (
                      <div
                        key={product.id}
                        className="flex gap-4 p-4 card-glass rounded-lg group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => {
                            onProductClick(product);
                            onClose();
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-bold text-sm truncate cursor-pointer hover:text-brand-accent transition-colors"
                            onClick={() => {
                              onProductClick(product);
                              onClose();
                            }}
                          >
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                            {product.category}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-display font-black text-brand-accent">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {discount > 0 && (
                              <span className="text-xs text-white/30 line-through">
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() =>
                                addToCart(product, "M", product.colors[0]?.name || "Default")
                              }
                              className="flex items-center gap-1 bg-white text-black px-3 py-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-brand-accent hover:text-white transition-all rounded"
                            >
                              <ShoppingBag size={12} /> Add to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                              title="Remove from wishlist"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlistProducts.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-3.5 font-black uppercase tracking-widest text-sm transition-colors rounded"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
