import {
  Globe,
  Bell,
  Mail,
  LogOut,
  SlidersVertical,
} from "lucide-react";
import { SearchInput } from "./SearchInput";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function ProductsHeader() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex items-center justify-between px-8 py-7 mb-7.5 bg-white rounded-[10px]">
      <h1 className="text-2xl font-semibold whitespace-nowrap">Товары</h1>

      <div className="flex-1 flex justify-center px-8">
        <SearchInput />
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Globe className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#797FEA] rounded-full text-white text-[10px]">12</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Mail className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <SlidersVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          title="Выйти"
        >
          <LogOut className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
