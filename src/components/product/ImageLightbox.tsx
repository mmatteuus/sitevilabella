import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  productName: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  productName,
  onClose,
  onNext,
  onPrev,
  onSelect,
}: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-foreground/95 flex flex-col items-center justify-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria de imagens: ${productName}`}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center text-primary-foreground transition-colors"
        onClick={onClose}
        aria-label="Fechar galeria"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-primary-foreground/70 text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main image */}
      <div
        className="relative max-w-3xl max-h-[75vh] w-full px-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`${productName} - Imagem ${currentIndex + 1}`}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl select-none"
          draggable={false}
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 hover:bg-background/50 flex items-center justify-center text-primary-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 hover:bg-background/50 flex items-center justify-center text-primary-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div
          className="flex gap-2 mt-4 px-4"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? 'border-primary scale-110'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Imagem ${i + 1}`}
            >
              <img
                src={img}
                alt={`${productName} miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      <p className="absolute bottom-4 text-primary-foreground/40 text-xs">
        Use as setas do teclado para navegar • ESC para fechar
      </p>
    </div>
  );
}

// Zoom hint overlay shown on image hover
export function ZoomHint() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-foreground/10 rounded-xl cursor-zoom-in">
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-3 py-2 rounded-full text-sm font-medium shadow-lg">
        <ZoomIn className="h-4 w-4" />
        Ampliar imagem
      </div>
    </div>
  );
}
