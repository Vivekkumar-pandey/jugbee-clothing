import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Check, MapPin, CreditCard, Building2, Smartphone, Wallet, Truck } from "lucide-react";
import { useStore } from "../context/StoreContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, detail: "Visa, Mastercard, Amex, RuPay" },
  { id: "upi", label: "UPI", icon: Smartphone, detail: "Google Pay, PhonePe, Paytm" },
  { id: "netbanking", label: "Net Banking", icon: Building2, detail: "All major banks" },
  { id: "cod", label: "Cash on Delivery", icon: Wallet, detail: "Pay when you receive" },
  { id: "emi", label: "EMI / Pay Later", icon: CreditCard, detail: "No-cost EMI available" },
];

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { cart, cartTotal, clearCart, showToast } = useStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shipping = cartTotal >= 2000 ? 0 : 99;

  const [address, setAddress] = useState({
    name: "", phone: "", street: "", city: "", state: "", pincode: "",
  });

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    showToast("Order placed successfully! 🎉");
  };

  const handleClose = () => {
    setStep(1);
    setPaymentMethod("");
    setOrderPlaced(false);
    setAddress({ name: "", phone: "", street: "", city: "", state: "", pincode: "" });
    onClose();
  };

  const stepLabels = ["Address", "Payment", "Review"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="modal-content rounded-xl max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Steps */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-black uppercase italic">Checkout</h2>
                <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full">
                  <X size={20} />
                </button>
              </div>

              {!orderPlaced && (
                <div className="flex items-center gap-2">
                  {stepLabels.map((label, i) => (
                    <div key={label} className="flex items-center gap-2 flex-1">
                      <div className={`step-dot ${step > i + 1 ? "completed" : step === i + 1 ? "active" : "pending"}`}>
                        {step > i + 1 ? <Check size={14} /> : i + 1}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block ${
                        step === i + 1 ? "text-white" : "text-white/30"
                      }`}>{label}</span>
                      {i < stepLabels.length - 1 && (
                        <div className={`step-line ${step > i + 1 ? "completed" : step === i + 1 ? "active" : ""}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 custom-scroll overflow-y-auto max-h-[60vh]">
              {orderPlaced ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase italic mb-4">Order Confirmed!</h3>
                  <p className="text-white/50 mb-2">Order #JB{Date.now().toString().slice(-8)}</p>
                  <p className="text-white/50 mb-8">You'll receive a confirmation email shortly.</p>
                  <button
                    onClick={handleClose}
                    className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : step === 1 ? (
                /* Step 1: Address */
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={18} className="text-brand-accent" />
                    <h3 className="font-black uppercase text-sm tracking-widest">Shipping Address</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input className="form-input" placeholder="Full Name" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
                    <input className="form-input" placeholder="Phone Number" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                  </div>
                  <input className="form-input" placeholder="Street Address" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input className="form-input" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                    <input className="form-input" placeholder="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                    <input className="form-input" placeholder="Pincode" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
                  </div>
                </div>
              ) : step === 2 ? (
                /* Step 2: Payment */
                <div className="space-y-3">
                  <h3 className="font-black uppercase text-sm tracking-widest mb-4 flex items-center gap-2">
                    <CreditCard size={18} className="text-brand-accent" /> Payment Method
                  </h3>
                  {paymentMethods.map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`payment-option w-full ${paymentMethod === pm.id ? "selected" : ""}`}
                      >
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                          <Icon size={20} className={paymentMethod === pm.id ? "text-brand-accent" : "text-white/60"} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm">{pm.label}</p>
                          <p className="text-[10px] text-white/40">{pm.detail}</p>
                        </div>
                        {paymentMethod === pm.id && (
                          <div className="ml-auto w-5 h-5 bg-brand-accent rounded-full flex items-center justify-center">
                            <Check size={12} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Step 3: Review */
                <div className="space-y-6">
                  <h3 className="font-black uppercase text-sm tracking-widest flex items-center gap-2">
                    <Truck size={18} className="text-brand-accent" /> Order Summary
                  </h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-4 p-3 card-glass rounded-lg">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-14 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{item.product.name}</p>
                          <p className="text-[10px] text-white/40">{item.size} · {item.color} · x{item.quantity}</p>
                        </div>
                        <p className="font-display font-black">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-white/60"><span>Subtotal</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between text-white/60"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                    <div className="flex justify-between font-black text-lg pt-2 border-t border-white/10"><span>Total</span><span>₹{(cartTotal + shipping).toLocaleString("en-IN")}</span></div>
                  </div>
                  <div className="card-glass rounded-lg p-4 text-sm">
                    <p className="font-bold mb-1">📍 {address.name}</p>
                    <p className="text-white/50">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                    <p className="text-white/50 mt-1">📞 {address.phone}</p>
                    <p className="text-brand-accent font-bold mt-2">💳 {paymentMethods.find(p => p.id === paymentMethod)?.label}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {!orderPlaced && (
              <div className="p-6 border-t border-white/10 flex gap-4">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="px-8 py-4 border border-white/20 font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (step < 3) setStep(step + 1);
                    else handlePlaceOrder();
                  }}
                  disabled={step === 2 && !paymentMethod}
                  className="flex-1 bg-brand-accent hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {step === 3 ? "Place Order" : "Continue"} <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
