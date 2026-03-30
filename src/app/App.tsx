import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Providers } from "./providers";
import { LoginPage } from "@/features/auth/components/LoginPage";
import { ProductsPage } from "@/features/products/components/ProductsPage";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ProductsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
