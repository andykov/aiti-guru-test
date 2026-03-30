import { ProductsHeader } from "./ProductsHeader";
import { ProductsToolbar } from "./ProductsToolbar";
import { ProductTable } from "./ProductTable";

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] pt-5 flex flex-col">
      <ProductsHeader />

      <div className="bg-white rounded-t-[10px] grow">
        <div className="max-w-480 mx-auto">
          <ProductsToolbar />
          <div className="px-8">
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  );
}
