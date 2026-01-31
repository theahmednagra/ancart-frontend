"use client";

import { motion } from "framer-motion";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmationModal = ({ open, title, description, confirmText = "Confirm", loading, onConfirm, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl w-full max-w-sm p-6 space-y-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:underline">
            Cancel
          </button>
          <button disabled={loading} onClick={onConfirm} className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white">
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
