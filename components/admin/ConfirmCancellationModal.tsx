"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  loading?: boolean;
  onClose: () => void;
};

const ConfirmationModal = ({
  open,
  title,
  description,
  loading = false,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl p-6 flex flex-col gap-4"
      >
        {/* Title */}
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        {/* Description */}
        <div className="text-sm text-gray-300 leading-relaxed">
          {description}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 hover:bg-zinc-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
