import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand, getWhatsAppUrl } from "@/config/brand";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="py-16">
      <div className="container max-w-2xl">
        <div className="rounded-xl border bg-card p-6 md:p-8">
          <p className="text-sm text-muted-foreground">Erro 404</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">Página não encontrada</h1>
          <p className="text-muted-foreground mt-3">
            A página <span className="font-mono text-foreground">{location.pathname}</span> não existe (ou foi movida).
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <Button asChild variant="hero">
              <Link to="/">
                <Home className="h-4 w-4" />
                Ir para a home
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/loja">
                <Search className="h-4 w-4" />
                Buscar produtos
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Se você precisa de ajuda, fale com a {brand.name} pelo WhatsApp.
            </p>
            <a
              href={getWhatsAppUrl("Olá! Não encontrei uma página no site e preciso de ajuda.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-primary hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp: {brand.contact.whatsapp.numberDisplay}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
