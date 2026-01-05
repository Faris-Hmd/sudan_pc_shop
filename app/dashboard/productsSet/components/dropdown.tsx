"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { product_feature_toggle } from "@/services/productsServices"; // Adjust path
import { Edit, EllipsisVertical, Trash2, Star } from "lucide-react";
import Link from "next/link";
import { product_dlt } from "@/services/productsServices";

// Added isFeatured to props
function Dropdown({ id, isFeatured }: { id: string; isFeatured: boolean }) {
  const [isPending, startToggleTransition] = useTransition();

  const handleToggleFeature = () => {
    startToggleTransition(async () => {
      await product_feature_toggle(id, isFeatured);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95 outline-none">
          <EllipsisVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl shadow-xl dark:bg-slate-900 dark:border-slate-800 min-w-[160px] p-1.5 animation-in fade-in zoom-in-95 duration-200">
        
        {/* --- FEATURE TOGGLE ITEM --- */}
        <DropdownMenuItem
          disabled={isPending}
          onClick={handleToggleFeature}
          className="flex gap-3 items-center w-full px-3 py-2.5 rounded-xl cursor-pointer text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/40 transition-colors outline-none disabled:opacity-50"
        >
          <Star size={16} className={isFeatured ? "fill-amber-500 text-amber-500" : "text-slate-400"} />
          <span>{isFeatured ? "Unfeature Item" : "Feature Product"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/productsSet/${id}` as any}
            className="flex gap-3 items-center w-full px-3 py-2.5 rounded-xl cursor-pointer text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors outline-none"
          >
            <Edit size={16} />
            <span>Edit Product</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={isPending}
          onClick={() => product_dlt(id)}
          className="flex gap-3 items-center w-full px-3 py-2.5 rounded-xl cursor-pointer text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors outline-none disabled:opacity-50"
        >
          <Trash2 size={16} className="text-red-500" />
          <span>Remove Item</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;