import { AnimatePresence, motion } from "motion/react";
import { X, Check } from "lucide-react";
import { useStore } from "../context/StoreContext";

export const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 left-6 z-[500] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-lg shadow-2xl border backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-200"
                : toast.type === "error"
                ? "bg-red-950/80 border-red-500/30 text-red-200"
                : "bg-zinc-900/80 border-white/10 text-white"
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-red-500" : "bg-white/20"
            }`}>
              <Check size={14} />
            </div>
            <span className="text-sm font-semibold">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-2 hover:opacity-70">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
