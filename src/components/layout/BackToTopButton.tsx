import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-24 right-6 z-40",
        "inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 shadow-lg shadow-foreground/20",
        "hover:-translate-y-0.5 transition-all duration-200",
        "md:bottom-28 md:right-8"
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-4 w-4" />
      <span className="text-sm font-medium">Topo</span>
    </button>
  );
}
