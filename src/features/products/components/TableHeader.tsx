import { ArrowUp, ArrowDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHeader as ShadcnTableHeader, TableHead, TableRow } from "@/components/ui/table";
import { useProductsStore } from "../store/products.store";
import type { SortField } from "../types/product.types";

interface TableHeaderProps {
  productIds: number[];
}

interface Column {
  key: SortField | null;
  label: string;
  sortable: boolean;
  className?: string;
}

const columns: Column[] = [
  { key: "title", label: "Наименование", sortable: true, className: "min-w-[350px]" },
  { key: "brand", label: "Вендор", sortable: true, className: "w-[15%] text-center" },
  { key: null, label: "Артикул", sortable: false, className: "w-[15%] text-center" },
  { key: "rating", label: "Оценка", sortable: true, className: "w-[15%] text-center" },
  { key: "price", label: "Цена, \u20BD", sortable: true, className: "w-[15%] text-center" },
  { key: null, label: "", sortable: false, className: "w-[15%]" },
];

export function TableHeader({ productIds }: TableHeaderProps) {
  const { sort, setSort, selectedIds, selectAll, deselectAll } = useProductsStore();

  const allSelected = productIds.length > 0 && productIds.every((id) => selectedIds.has(id));
  const someSelected = productIds.some((id) => selectedIds.has(id)) && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAll();
    } else {
      selectAll(productIds);
    }
  };

  const handleSort = (field: SortField) => {
    if (sort.field === field) {
      if (sort.order === "asc") {
        setSort({ field, order: "desc" });
      } else {
        setSort({ field: null, order: "asc" });
      }
    } else {
      setSort({ field, order: "asc" });
    }
  };

  const getSortIcon = (field: SortField | null) => {
    if (!field || sort.field !== field) return null;
    return sort.order === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" />
    );
  };

  return (
    <ShadcnTableHeader>
      <TableRow className="h-18.25 border-b-[#e2e2e2] font-sans font-bold text-base tracking-wider">
        <TableHead className="w-12.5 pl-4.5">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onCheckedChange={handleSelectAll}
          />
        </TableHead>
        {columns.map((col, i) => (
          <TableHead key={i} className={col.className}>
            {col.sortable && col.key ? (
              <button
                onClick={() => handleSort(col.key as SortField)}
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors text-muted-foreground"
              >
                {col.label}
                {getSortIcon(col.key)}
              </button>
            ) : (
              <span className="text-muted-foreground">{col.label}</span>
            )}
          </TableHead>
        ))}
      </TableRow>
    </ShadcnTableHeader>
  );
}
