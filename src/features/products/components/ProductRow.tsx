import { CircleEllipsis, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { useProductsStore } from "../store/products.store";
import type { Product } from "../types/product.types";
import { Button } from "@/components/ui/button";

interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  const { selectedIds, toggleSelected } = useProductsStore();
  const checked = selectedIds.has(product.id);

  const lowRatingChecker = product.rating < 3.5;
  const [integer, decimal] = formatPrice(product.price).split(',');

  return (
    <TableRow
      data-state={checked ? "selected" : undefined}
      className={`h-17.75 border-b-[#e2e2e2] ${checked ? "shadow-[inset_3px_0_0_0_#3C538E]" : ""}`}
    >
      <TableCell className="w-12.5 pl-4.5">
        <Checkbox
          checked={checked}
          onCheckedChange={() => toggleSelected(product.id)}
        />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-4.5">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="size-12 rounded-lg object-cover bg-[#c4c4c4] border border-[#ececeb] shrink-0"
          />
          <div className="max-w-52.5">
            <p className="font-sans font-bold text-base text-[#222] truncate">{product.title}</p>
            <p className="font-sans text-sm text-[#b2b3b9]">{product.category}</p>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <span className="font-open-sans font-bold text-base text-black">{product.brand || "-"}</span>
      </TableCell>

      <TableCell className="text-center">
        <span className="font-open-sans text-base text-black">{product.sku || "-"}</span>
      </TableCell>

      <TableCell className="text-center">
        <span className="font-open-sans text-base">
          <span className={lowRatingChecker ? "text-[#f11010]" : ""}>
            {product.rating.toFixed(1)}
          </span>/5
        </span>
      </TableCell>

      <TableCell className="text-center">
        <span className="font-roboto-mono text-base text-[#222]">
          {integer}
          <span className="text-[#999]">,{decimal}</span>
        </span>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-center gap-8">
          <Button size="icon-sm" className="w-13 rounded-full">
            <Plus className="size-6"/>
          </Button>
          <Button variant="ghost" size="icon-sm" className="rounded-full">
            <CircleEllipsis className="size-6.5 text-muted-foreground"/>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
