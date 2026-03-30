export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  sku: string;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortField = "title" | "price" | "rating" | "brand";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField | null;
  order: SortOrder;
}
