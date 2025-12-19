import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { BackToTopButton } from "@/components/layout/BackToTopButton";

import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AuthPage from "./pages/AuthPage";
import ClubeVBPage from "./pages/ClubeVBPage";
import AccountLayout from "./pages/account/AccountLayout";
import ProfilePage from "./pages/account/ProfilePage";
import AddressesPage from "./pages/account/AddressesPage";
import OrdersPage from "./pages/account/OrdersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-1">
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
                  <Route path="/minha-conta" element={<AccountLayout />}>
                    <Route index element={<ProfilePage />} />
                    <Route path="enderecos" element={<AddressesPage />} />
                    <Route path="pedidos" element={<OrdersPage />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
            <CartDrawer />
            <WhatsAppButton />
            <BackToTopButton />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
