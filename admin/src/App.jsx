import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import TablePage from "./pages/TablePage";
import CrudFormPage from "./pages/CrudFormPage";
import CrudListPage from "./pages/CrudListPage";
import LoginPage from "./pages/LoginPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderListPage from "./pages/OrderListPage";
import { crudResources } from "./config/crudResources";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<CrudListPage resource={crudResources.products} />} />
        <Route path="products/create" element={<CrudFormPage resource={crudResources.products} />} />
        <Route path="products/:id/edit" element={<CrudFormPage resource={crudResources.products} />} />
        <Route path="categories" element={<CrudListPage resource={crudResources.categories} />} />
        <Route path="categories/create" element={<CrudFormPage resource={crudResources.categories} />} />
        <Route path="categories/:id/edit" element={<CrudFormPage resource={crudResources.categories} />} />
        <Route path="orders" element={<OrderListPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="users" element={<TablePage title="Users" apiPath="/admin/users" />} />
        <Route path="coupons" element={<CrudListPage resource={crudResources.coupons} />} />
        <Route path="coupons/create" element={<CrudFormPage resource={crudResources.coupons} />} />
        <Route path="coupons/:id/edit" element={<CrudFormPage resource={crudResources.coupons} />} />
        <Route path="reviews" element={<TablePage title="Reviews" apiPath="/reviews" />} />
        <Route path="banners" element={<CrudListPage resource={crudResources.banners} />} />
        <Route path="banners/create" element={<CrudFormPage resource={crudResources.banners} />} />
        <Route path="banners/:id/edit" element={<CrudFormPage resource={crudResources.banners} />} />
        <Route path="hero-slides" element={<CrudListPage resource={crudResources.heroSlides} />} />
        <Route path="hero-slides/create" element={<CrudFormPage resource={crudResources.heroSlides} />} />
        <Route path="hero-slides/:id/edit" element={<CrudFormPage resource={crudResources.heroSlides} />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
