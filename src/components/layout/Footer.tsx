import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-primary-foreground">Villa Bella</h3>
              <p className="text-xs tracking-widest uppercase text-muted-foreground">Floricultura</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Somos especialistas em plantar flores e colher sorrisos. Desde 2015 levando emoções através das mais belas flores para Araguaína e região.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navegue</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/loja" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Loja
              </Link>
              <Link to="/categoria/flores" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Flores
              </Link>
              <Link to="/categoria/cestas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cestas
              </Link>
              <Link to="/categoria/chocolates" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Chocolates
              </Link>
              <Link to="/clube-vb" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Clube VB
              </Link>
              <Link to="/ocasioes/aniversario" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Aniversário
              </Link>
              <Link to="/ocasioes/romantico" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Romântico
              </Link>
            </nav>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Institucional</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/entrega-frete" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Entrega & Frete
              </Link>
              <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contato / Localização
              </Link>
              <Link to="/politica-privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/politica-cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Cookies
              </Link>
              <Link to="/termos-condicoes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Termos e Condições
              </Link>
              <Link to="/acessibilidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Acessibilidade
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Av. Amazonas, 529 - St. Central<br />
                  Araguaína - TO
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="https://wa.me/5563992379935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +55 63 99237-9935
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:contato@villabella.com.br"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  contato@villabella.com.br
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Seg - Sáb: 8h às 18h<br />
                  Dom: 8h às 12h
                </p>
              </div>
            </div>

            {/* Fast delivery badge */}
            <div className="mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">Entrega em até 3 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-muted-foreground/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Villa Bella Floricultura. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Pagamento seguro</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-muted-foreground/20 rounded flex items-center justify-center text-[8px]">
                PIX
              </div>
              <div className="w-10 h-6 bg-muted-foreground/20 rounded flex items-center justify-center text-[8px]">
                VISA
              </div>
              <div className="w-10 h-6 bg-muted-foreground/20 rounded flex items-center justify-center text-[8px]">
                MC
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
