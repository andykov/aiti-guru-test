import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import { useProductsStore, ITEMS_PER_PAGE } from "../store/products.store";
import { useDebounce } from "./useDebounce";
import type { ProductsResponse } from "../types/product.types";

export function useProducts() {
  const { currentPage, sort, searchQuery } = useProductsStore();
  const debouncedSearch = useDebounce(searchQuery);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  return useQuery({
    queryKey: ["products", { skip, sort, search: debouncedSearch }],
    placeholderData: keepPreviousData,
    queryFn: async (): Promise<ProductsResponse> => {
      const params: Record<string, string | number> = {
        limit: ITEMS_PER_PAGE,
        skip,
      };

      if (sort.field) {
        params.sortBy = sort.field;
        params.order = sort.order;
      }

      if (debouncedSearch) {
        const { data } = await api.get<ProductsResponse>("/products/search", {
          params: { ...params, q: debouncedSearch },
        });
        return data;
      }

      const { data } = await api.get<ProductsResponse>("/products", {
        params,
      });
      return data;
    },
  });
}
