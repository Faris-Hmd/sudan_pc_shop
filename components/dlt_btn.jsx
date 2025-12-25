"use client";

import { startTransition, useActionState } from "react";
import { product_dlt } from "../actions/product_dlt";

export default function Dlt_btn({ id: id }) {
  const [dlt_state, dlt_action, dlt_pending] = useActionState(
    product_dlt,
    false
  );
  console.log(id);

  return (
    <button
      onClick={() => startTransition(dlt_action.bind(null, id))}
      className={`dlt_btn ${
        dlt_pending
          ? "bg-green-400 hover:bg-green-600"
          : "bg-red-400 hover:bg-red-500"
      }`}
    >
      Delete
    </button>
  );
}
