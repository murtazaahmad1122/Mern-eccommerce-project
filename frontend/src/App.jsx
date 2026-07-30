import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import QuickViewModal from "./components/modals/QuickViewModal";
import SearchModal from "./components/modals/SearchModal";
import OpenCartModal from "./components/modals/CartModal";
import WishlistModal from "./components/modals/WishlistModal";
import {
  HomePage,
  CategoriesPage,
  ContactPage,
} from "./pages/RoutePages";
import ShopListFullWidthPage from "./pages/shop/ShopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Checkout from "./pages/Checkout";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";

function AppContent() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const closeSidebar = () => setIsSidebarToggled(false);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const openWishlist = () => {
    setIsWishlistOpen(true);
  };

  return (
    <main className="wrapper sb-default">
        <Loader />
        <Sidebar isOpen={isSidebarToggled} onClose={closeSidebar} />
        <Header
          isSidebarOpen={isSidebarToggled}
          onSidebarToggle={() => setIsSidebarToggled((isOpen) => !isOpen)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onCartOpen={openCart}
          onWishlistOpen={openWishlist}
        />

        <Routes>
          <Route path="/" element={<HomePage onOpenQuickView={openQuickView} />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/shop" element={<ShopListFullWidthPage onOpenQuickView={openQuickView} />} />
          <Route path="/shop-list-full-width" element={<ShopListFullWidthPage onOpenQuickView={openQuickView} />} />
          <Route path="/product/:id" element={<ProductDetailPage onOpenQuickView={openQuickView} />} />
          <Route path="/product-detail" element={<Navigate to="/shop" replace />} />
          <Route path="/product-accordion-full-width" element={<Navigate to="/shop" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>

        <Footer
          isSidebarOpen={isSidebarToggled}
          onOpenSearch={() => setIsSearchOpen(true)}
          onWishlistOpen={openWishlist}
        />
        <QuickViewModal
          isOpen={isQuickViewOpen}
          product={selectedProduct}
          onClose={closeQuickView}
        />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <OpenCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <WishlistModal
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
        />
      </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
