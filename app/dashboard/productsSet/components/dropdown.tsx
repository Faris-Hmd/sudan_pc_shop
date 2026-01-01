"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { startTransition, useActionState } from "react";
import { product_dlt } from "../actions/product_dlt";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import Link from "next/link";
function Dropdown({ id }: any) {
  const [dlt_state, dlt_action, dlt_pending] = useActionState(product_dlt, id);
  // console.log(id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={`productsSet/${id}` as any}
            className="flex gap-2 items-center w-full"
          >
            <Edit />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={dlt_pending}
          onClick={() => startTransition(dlt_action.bind(id))}
          className={
            "cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed items-center"
          }
        >
          <Trash2 className="text-red-400" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
