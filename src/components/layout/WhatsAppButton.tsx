import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/config/brand';

export function WhatsAppButton() {

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        variant="whatsapp"
        size="lg"
        className="rounded-full h-14 w-14 p-0 shadow-xl hover:scale-110 transition-transform"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  );
}
