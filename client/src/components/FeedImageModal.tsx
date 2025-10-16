import type { FC, MouseEvent } from "react";

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ imageUrl, isOpen, onClose }) => {
    if (!isOpen) return null;

  // Close only when background (not image) is clicked
  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full p-4 flex justify-center"
      >
        <img

          src={imageUrl}
          alt="Full view"
          className="max-h-[85vh] rounded-lg object-contain shadow-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-6 cursor-pointer text-white text-3xl font-bold hover:text-orange-400 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
