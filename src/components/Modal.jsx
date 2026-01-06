const Modal = ({ message, onClose, onConfirm, confirmMode = false }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-lineStrong/40 backdrop-blur-sm">
      <div
        className="
          max-w-sm w-full
          rounded-2xl
          bg-surface/90
          p-6
          text-center
          shadow-[0_10px_30px_rgba(43,58,103,0.25)]
        "
      >
        <p className="mb-5 text-base font-medium text-[#2B3A67]">
          {message}
        </p>

        {confirmMode ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onConfirm();
              }}
              className="
                px-4 py-2
                rounded-xl
                text-sm font-semibold
                text-white
                bg-[#E89BC6]
                hover:bg-[#D477AE]
                active:scale-[0.98]
                transition-all
                shadow-[0_4px_10px_rgba(43,58,103,0.12)]
              "
            >
              Tak
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClose();
              }}
              className="
                px-4 py-2
                rounded-xl
                text-sm font-semibold
                text-[#2B3A67]
                bg-[#FBE9DD]
                hover:bg-[#F6D3BE]
                active:scale-[0.98]
                transition-all
                border border-[#F2BFA3]
              "
            >
              Nie
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="
              mx-auto
              px-5 py-2
              rounded-xl
              text-sm font-semibold
              text-white
              bg-[#E89BC6]
              hover:bg-[#D477AE]
              active:scale-[0.98]
              transition-all
              shadow-[0_4px_10px_rgba(43,58,103,0.12)]
            "
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
