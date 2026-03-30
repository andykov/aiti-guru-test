import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useProductsStore } from "../store/products.store";

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useProductsStore();

  return (
    <div className="relative w-full max-w-5xl">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Найти"
        className="pl-13 pr-10 h-12 bg-[#F3F3F3] border-0"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
