import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
