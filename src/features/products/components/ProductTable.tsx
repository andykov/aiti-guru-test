import { Progress } from "@/components/ui/progress";
import { Table, TableBody } from "@/components/ui/table";
import { useProducts } from "../hooks/useProducts";
import { useProductsStore } from "../store/products.store";
import { TableHeader } from "./TableHeader";
import { ProductRow } from "./ProductRow";
import { Pagination } from "./Pagination";
import type { Product } from "../types/product.types";

export function ProductTable() {
  const { data, isLoading, isFetching } = useProducts();
  const localProducts = useProductsStore((s) => s.localProducts);

  const products: Product[] = [
    ...localProducts,
    ...(data?.products ?? []),
  ];
  const total = (data?.total ?? 0) + localProducts.length;

  return (
    <div className="flex flex-col">
      {(isLoading || isFetching) && (
        <Progress value={null} className="h-1 rounded-none -mt-1" />
      )}

      <Table className="mb-10">
        <TableHeader productIds={products.map((p) => p.id)} />

        <TableBody>
          {isLoading ? (
            <tr>
              <td colSpan={7} className="py-20 text-center text-muted-foreground">
                Загрузка...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-20 text-center text-muted-foreground">
                Товары не найдены
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))
          )}
        </TableBody>
      </Table>

      <Pagination total={total}/>
    </div>
  );
}
