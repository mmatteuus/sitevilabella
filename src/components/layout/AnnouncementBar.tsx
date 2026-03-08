import { useState, useEffect } from 'react';
import { X, Truck, Shield, Tag, Clock } from 'lucide-react';

const announcements = [
  {
    id: 1,
    icon: Truck,
    text: 'Entrega em até 3 horas para Araguaína e região',
    highlight: 'Entrega em até 3 horas',
  },
  {
    id: 2,
    icon: Tag,
    text: 'Frete grátis em pedidos acima de R$ 200',
    highlight: 'Frete grátis',
  },
  {
    id: 3,
    icon: Shield,
    text: 'Pagamento 100% seguro — PIX ou Cartão',
    highlight: 'Pagamento 100% seguro',
  },
  {
    id: 4,
    icon: Clock,
    text: 'Assine o Clube VB e economize até 20% toda semana',
    highlight: 'economize até 20%',
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <div className="relative bg-primary text-primary-foreground py-2 overflow-hidden">
      {/* Animated shimmer */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary-foreground to-transparent skew-x-12"
          style={{ animation: 'shimmer 4s ease-in-out infinite' }}
        />
      </div>

      <div className="container flex items-center justify-center gap-3 text-sm relative">
        {/* Dots nav */}
        <div className="hidden sm:flex items-center gap-1 mr-2">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-primary-foreground w-4' : 'bg-primary-foreground/40'
              }`}
              aria-label={`Anúncio ${i + 1}`}
            />
          ))}
        </div>

        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span>
            {current.text.split(current.highlight).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <strong className="font-bold underline decoration-primary-foreground/50 underline-offset-2">
                    {current.highlight}
                  </strong>
                )}
              </span>
            ))}
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          aria-label="Fechar banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-300%) skewX(-12deg); }
          100% { transform: translateX(400%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}
