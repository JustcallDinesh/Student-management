import { FaTriangleExclamation } from "react-icons/fa6";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/10
          backdrop-blur-xl
          shadow-2xl
          p-6
          animate-in
          fade-in
          zoom-in-95
        "
      >
        {/* Icon */}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
          <FaTriangleExclamation className="text-3xl text-red-400" />
        </div>

        {/* Title */}

        <h2 className="mt-5 text-center text-2xl font-bold text-white">
          {title}
        </h2>

        {/* Message */}

        <p className="mt-3 text-center text-slate-300">
          {message}
        </p>

        {/* Buttons */}

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-xl
              border
              border-white/10
              bg-white/10
              px-5
              py-2.5
              text-white
              transition
              hover:bg-white/20
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading ? "Deleting..." : confirmText}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;