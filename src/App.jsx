import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import QuickViewModal from "./components/modals/QuickViewModal";
import SearchModal from "./components/modals/SearchModal";
import {
  HomePage,
  CategoriesPage,
  ShopPage,
  ContactPage,
} from "./pages/RoutePages";

function AppContent() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setIsSidebarToggled(false);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <main className="wrapper sb-default">
        <Loader />
        <Sidebar isOpen={isSidebarToggled} onClose={closeSidebar} />
        <Header
          isSidebarOpen={isSidebarToggled}
          onSidebarToggle={() => setIsSidebarToggled((isOpen) => !isOpen)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <Routes>
          <Route path="/" element={<HomePage onOpenQuickView={openQuickView} />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/shop" element={<ShopPage onOpenQuickView={openQuickView} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer isSidebarOpen={isSidebarToggled} onOpenSearch={() => setIsSearchOpen(true)} />
        <QuickViewModal
          isOpen={isQuickViewOpen}
          product={selectedProduct}
          onClose={closeQuickView}
        />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
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
