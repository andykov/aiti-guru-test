import { useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductsStore } from "../store/products.store";
import { AddProductDialog } from "./AddProductDialog";

export function ProductsToolbar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { sort, setSort } = useProductsStore();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const SortIcon =
    sort.field === "price"
      ? sort.order === "asc"
        ? ArrowUpWideNarrow
        : ArrowDownWideNarrow
      : ArrowUpDown;

  return (
    <>
      <div className="flex items-center justify-between px-8 pt-7.5 pb-10">
        <h2 className="text-xl font-semibold">Все позиции</h2>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="icon-lg"
            className="w-10.5 h-10.5 p-0 shrink-0"
            title="Обновить"
          >
            <RefreshCw className="h-5 w-5" color="#515161" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={(props) => (
                <Button
                  {...props}
                  variant="outline"
                  size="icon-lg"
                  className="w-10.5 h-10.5 p-0 shrink-0"
                  title="Сортировка"
                />
              )}
            >
              <SortIcon className="h-5 w-5" color="#515161" />
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="min-w-48">
              <DropdownMenuItem onClick={() => setSort({ field: "price", order: "asc" })}>
                <ArrowUpWideNarrow className="h-4 w-4" color="#515161"/>
                Цена по возрастанию
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort({ field: "price", order: "desc" })}>
                <ArrowDownWideNarrow className="h-4 w-4" color="#515161"/>
                Цена по убыванию
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setDialogOpen(true)}
            className="font-semibold text-white gap-3.75 px-5 py-2.5 h-auto"
          >
            <PlusCircle className="h-6 w-6" />
            Добавить
          </Button>
        </div>
      </div>

      <AddProductDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
