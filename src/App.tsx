import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { useEffect } from "react";

import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import AuthPage from "@/pages/AuthPage";
import ClubeVBPage from "@/pages/ClubeVBPage";
import AccountLayout from "@/pages/account/AccountLayout";
import ProfilePage from "@/pages/account/ProfilePage";
import AddressesPage from "@/pages/account/AddressesPage";
import OrdersPage from "@/pages/account/OrdersPage";
import NotFound from "@/pages/NotFound";

// Occasion pages
import OccasionPage from "@/pages/occasions/OccasionPage";

// Institutional pages
import EntregaFretePage from "@/pages/institutional/EntregaFretePage";
import ContatoPage from "@/pages/institutional/ContatoPage";
import PoliticaPrivacidadePage from "@/pages/institutional/PoliticaPrivacidadePage";
import PoliticaCookiesPage from "@/pages/institutional/PoliticaCookiesPage";
import TermosCondicoesPage from "@/pages/institutional/TermosCondicoesPage";
import AcessibilidadePage from "@/pages/institutional/AcessibilidadePage";

const queryClient = new QueryClient();

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div
      key={pathname}
      className="animate-fade-in"
      style={{ animationDuration: '0.35s' }}
    >
      {children}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ErrorBoundary>
              <div className="flex flex-col min-h-screen">
                <AnnouncementBar />
                <Header />
                <div className="flex-1">
                  <ScrollToTop />
                  <PageTransition>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/loja" element={<CatalogPage />} />
                      <Route path="/categoria/:category" element={<CatalogPage />} />
                      <Route path="/categoria/:category/:subcategory" element={<CatalogPage />} />
                      <Route path="/produto/:slug" element={<ProductPage />} />
                      <Route path="/carrinho" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/confirmacao" element={<ConfirmationPage />} />
                      <Route path="/entrar" element={<AuthPage />} />
                      <Route path="/clube-vb" element={<ClubeVBPage />} />
                      {/* Occasion pages */}
                      <Route path="/ocasioes/:occasion" element={<OccasionPage />} />
                      {/* Institutional pages */}
                      <Route path="/entrega-frete" element={<EntregaFretePage />} />
                      <Route path="/contato" element={<ContatoPage />} />
                      <Route path="/politica-privacidade" element={<PoliticaPrivacidadePage />} />
                      <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
                      <Route path="/termos-condicoes" element={<TermosCondicoesPage />} />
                      <Route path="/acessibilidade" element={<AcessibilidadePage />} />
                      {/* Account */}
                      <Route path="/minha-conta" element={<AccountLayout />}>
                        <Route index element={<ProfilePage />} />
                        <Route path="enderecos" element={<AddressesPage />} />
                        <Route path="pedidos" element={<OrdersPage />} />
                      </Route>
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageTransition>
                </div>
                <Footer />
              </div>
              <CartDrawer />
              <WhatsAppButton />
              <BackToTopButton />
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
