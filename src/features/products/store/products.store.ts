import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, SortConfig } from "../types/product.types";

interface ProductsState {
  currentPage: number;
  sort: SortConfig;
  searchQuery: string;
  localProducts: Product[];
  selectedIds: Set<number>;
  setCurrentPage: (page: number) => void;
  setSort: (sort: SortConfig) => void;
  setSearchQuery: (query: string) => void;
  addLocalProduct: (product: Product) => void;
  toggleSelected: (id: number) => void;
  selectAll: (ids: number[]) => void;
  deselectAll: () => void;
}

export const ITEMS_PER_PAGE = 5;

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      currentPage: 1,
      sort: { field: null, order: "asc" },
      searchQuery: "",
      localProducts: [],
      selectedIds: new Set(),

      setCurrentPage: (page) => set({ currentPage: page }),

      setSort: (sort) => set({ sort, currentPage: 1 }),

      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

      addLocalProduct: (product) =>
        set((state) => ({
          localProducts: [product, ...state.localProducts],
        })),

      toggleSelected: (id) =>
        set((state) => {
          const next = new Set(state.selectedIds);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return { selectedIds: next };
        }),

      selectAll: (ids) => set({ selectedIds: new Set(ids) }),

      deselectAll: () => set({ selectedIds: new Set() }),
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ sort: state.sort }),
    }
  )
);
