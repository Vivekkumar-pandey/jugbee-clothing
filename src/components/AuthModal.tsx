import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Simulate auth
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }, 2000);
  };

  const handleClose = () => {
    setSuccess(false);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    onClose();
  };

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
            className="bg-zinc-950 border border-white/10 shadow-2xl rounded-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-display font-black uppercase italic mb-2">
                  {mode === "login" ? "Welcome Back!" : "Account Created!"}
                </h3>
                <p className="text-white/50 text-sm">Redirecting you...</p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-brand-accent flex items-center justify-center rounded-sm rotate-45">
                        <span className="-rotate-45 font-display font-black text-sm italic">J</span>
                      </div>
                      <span className="font-display font-black uppercase italic text-lg">Jugbee</span>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X size={18} />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-white/10">
                    <button
                      onClick={() => setMode("login")}
                      className={`flex-1 pb-3 text-xs font-black uppercase tracking-widest transition-colors relative ${
                        mode === "login" ? "text-white" : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      Login
                      {mode === "login" && (
                        <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
                      )}
                    </button>
                    <button
                      onClick={() => setMode("signup")}
                      className={`flex-1 pb-3 text-xs font-black uppercase tracking-widest transition-colors relative ${
                        mode === "signup" ? "text-white" : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      Sign Up
                      {mode === "signup" && (
                        <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {mode === "signup" && (
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                          <input
                            type="text"
                            placeholder="FULL NAME"
                            required
                            className="form-input pl-11"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      )}

                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="email"
                          placeholder="EMAIL ADDRESS"
                          required
                          className="form-input pl-11"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="relative">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="PASSWORD"
                          required
                          className="form-input pl-11 pr-11"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      {mode === "signup" && (
                        <div className="relative">
                          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="CONFIRM PASSWORD"
                            required
                            className="form-input pl-11"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {mode === "login" && (
                    <div className="flex justify-end">
                      <button type="button" className="text-[10px] text-brand-accent font-bold uppercase tracking-widest hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-brand-accent hover:bg-red-600 text-white py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors mt-2"
                  >
                    {mode === "login" ? "Login" : "Create Account"} <ArrowRight size={16} />
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                    <div className="relative flex justify-center"><span className="bg-zinc-950 px-4 text-[10px] text-white/30 uppercase tracking-widest">or continue with</span></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" className="flex items-center justify-center gap-2 py-3 border border-white/10 hover:bg-white/5 transition-colors rounded text-sm font-bold">
                      <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 py-3 border border-white/10 hover:bg-white/5 transition-colors rounded text-sm font-bold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      GitHub
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
