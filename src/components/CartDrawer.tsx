import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer = ({ isOpen, onClose, onCheckout }: CartDrawerProps) => {
  const { cart, removeFromCart, updateCartQty, cartTotal, cartCount } = useStore();
  const shipping = cartTotal >= 2000 ? 0 : 99;

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
                <ShoppingBag size={20} />
                <h2 className="text-lg font-black uppercase tracking-wider">Your Cart</h2>
                <span className="bg-brand-accent text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto custom-scroll p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={48} className="text-white/20" />
                  <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="text-brand-accent text-xs font-black uppercase tracking-widest hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-4 p-4 card-glass rounded-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.product.name}</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                          {item.size} · {item.color}
                        </p>
                        <p className="font-display font-black text-brand-accent mt-1">
                          ₹{item.product.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() =>
                              updateCartQty(item.product.id, item.size, item.color, item.quantity - 1)
                            }
                            className="w-7 h-7 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-black w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQty(item.product.id, item.size, item.color, item.quantity + 1)
                            }
                            className="w-7 h-7 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="ml-auto text-white/30 hover:text-red-400 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-black text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>₹{(cartTotal + shipping).toLocaleString("en-IN")}</span>
                  </div>
                </div>
                {cartTotal < 2000 && (
                  <p className="text-[10px] text-center text-white/40 uppercase tracking-widest">
                    Add ₹{(2000 - cartTotal).toLocaleString("en-IN")} more for free shipping
                  </p>
                )}
                <button
                  onClick={onCheckout}
                  className="w-full bg-brand-accent hover:bg-red-600 text-white py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors animate-pulse-glow"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
