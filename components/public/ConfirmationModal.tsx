"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  loading?: boolean;
  variant?: "primary" | "warning"; // NEW (optional)
  mode?: "light" | "dark";
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmationModal = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  loading = false,
  variant = "warning",
  mode = "light",
  onConfirm,
  onClose,
}: Props) => {
  if (!open) return null;

  const isDark = mode === "dark";

  const confirmButtonClasses = clsx(
    "px-4 py-2 text-sm font-medium rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed",
    variant === "primary" && [
      "bg-zinc-900 text-white hover:bg-zinc-800",
      isDark && "bg-white text-black hover:bg-gray-200",
    ],
    variant === "warning" && "bg-red-500 text-white hover:bg-red-600"
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={clsx(
          "w-full max-w-sm rounded-xl p-6 space-y-4 shadow-xl",
          isDark
            ? "bg-zinc-900 text-white border border-white/10"
            : "bg-white text-black"
        )}
      >
        <h3 className="text-lg font-semibold">{title}</h3>

        <p
          className={clsx(
            "text-sm",
            isDark ? "text-white/70" : "text-gray-600"
          )}
        >
          {description}
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className={clsx(
              "px-4 py-2 text-sm hover:underline disabled:opacity-60",
              isDark ? "text-white/60" : "text-gray-600"
            )}
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className={confirmButtonClasses}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
