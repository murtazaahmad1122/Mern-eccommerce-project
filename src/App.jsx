import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import QuickViewModal from "./components/modals/QuickViewModal";
import {
  HomePage,
  CategoriesPage,
  ShopPage,
  ContactPage,
} from "./pages/RoutePages";

function App() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const closeSidebar = () => setIsSidebarToggled(false);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <BrowserRouter>
      <main className="wrapper sb-default">
        <Loader />
        <Sidebar isOpen={isSidebarToggled} onClose={closeSidebar} />
        <Header
          isSidebarOpen={isSidebarToggled}
          onSidebarToggle={() => setIsSidebarToggled((isOpen) => !isOpen)}
        />

        <Routes>
          <Route path="/" element={<HomePage onOpenQuickView={openQuickView} />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/shop" element={<ShopPage onOpenQuickView={openQuickView} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer isSidebarOpen={isSidebarToggled} />
        <QuickViewModal
          isOpen={isQuickViewOpen}
          product={selectedProduct}
          onClose={closeQuickView}
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
