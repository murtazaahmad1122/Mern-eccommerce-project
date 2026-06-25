import { useState } from "react";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import MainContent from "./components/main/MainContent";
import Footer from "./components/Footer";
import QuickViewModal from "./components/modals/QuickViewModal";

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
    <main className="wrapper sb-default">
      <Loader />
      <Sidebar isOpen={isSidebarToggled} onClose={closeSidebar} />
      <Header
        isSidebarOpen={isSidebarToggled}
        onSidebarToggle={() => setIsSidebarToggled((isOpen) => !isOpen)}
      />
      <MainContent onOpenQuickView={openQuickView} />
      <Footer isSidebarOpen={isSidebarToggled} />
      <QuickViewModal
        isOpen={isQuickViewOpen}
        product={selectedProduct}
        onClose={closeQuickView}
      />
    </main>
  );
}

export default App;
