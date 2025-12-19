import * as React from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand, getWhatsAppUrl } from "@/config/brand";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  private reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="min-h-[70vh] flex items-center">
        <div className="container max-w-2xl py-16">
          <div className="rounded-xl border bg-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h1 className="font-display text-2xl md:text-3xl font-bold">Algo deu errado</h1>
                <p className="text-muted-foreground mt-2">
                  Ocorreu um erro inesperado. Se preferir, você pode voltar para a página inicial ou falar com a gente no
                  WhatsApp.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button onClick={this.reset} variant="outline">
                <RefreshCcw className="h-4 w-4" />
                Tentar novamente
              </Button>
              <Button onClick={() => window.location.assign("/")} variant="hero">
                <Home className="h-4 w-4" />
                Ir para a home
              </Button>
              <Button asChild variant="ghost">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {brand.contact.whatsapp.numberDisplay}
                </a>
              </Button>
            </div>

            <details className="mt-6">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                Ver detalhes técnicos
              </summary>
              <pre className="mt-3 max-h-56 overflow-auto rounded-lg bg-muted p-3 text-xs">
                {this.state.error.stack ?? this.state.error.message}
              </pre>
            </details>
          </div>
        </div>
      </main>
    );
  }
}

