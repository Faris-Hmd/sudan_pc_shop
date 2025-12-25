import Link from "next/link";
import { getProducts } from "@/data/products";
import { Plus, Package } from "lucide-react";
import Dropdown from "./components/dropdown";
import TableSearchForm from "./components/tableSearchForm";

export default async function ProductTable({ searchParams }) {
  const { key, value } = await searchParams;
  const products = await getProducts(key, value, 20);

  return (
    <div className="h-screen  flex flex-col overflow-hidden">
      <div className="p-2 md:p-8 flex flex-col h-full gap-4 md:gap-6">
        {/* Header Section - More compact on mobile */}
        <header className="flex flex-col gap-4 bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Products
              </h1>
              <p className="hidden md:block text-sm text-gray-500">
                Manage your catalog
              </p>
            </div>
            <Link
              href="/dashboard/productsSet/prod_add"
              className="flex items-center gap-1 bg-blue-600 text-white font-bold py-2 px-3 md:px-5 rounded-xl shadow-lg text-xs md:text-sm transition-all active:scale-95"
            >
              <Plus size={16} strokeWidth={3} />
              <span className="xs:block">Add New</span>
            </Link>
          </div>
          <TableSearchForm />
        </header>

        {/* Table Container */}
        <div className="bg-white  border border-gray-200 shadow-sm grow overflow-hidden flex flex-col">
          <div className="overflow-y-auto grow">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50/50 sticky top-0 z-10 ">
                <tr>
                  {/* Name: Priority 1 */}
                  <th className="px-3 md:px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-full">
                    Product
                  </th>
                  {/* Price: Priority 2 */}
                  <th className="px-3 md:px-6 py-4 text-right md:text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-20 md:w-28">
                    Price
                  </th>
                  {/* Category: Hidden on Mobile */}
                  <th className="hidden md:table-cell px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-40">
                    Category
                  </th>
                  {/* Actions: Priority 3 */}
                  <th className="px-3 md:px-6 py-4 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest w-16 md:w-24">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {products?.length > 0 ? (
                  products.map((row) => (
                    <tr
                      key={row.productId}
                      className="group hover:bg-blue-50/30"
                    >
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <Link
                          href={"/products/" + row.productId}
                          className="flex items-center gap-2 md:gap-3"
                        >
                          <div className="hidden sm:flex p-2 bg-gray-100 rounded-lg text-gray-400">
                            <Package size={16} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs md:text-sm font-bold text-gray-900 truncate">
                              {row.p_name}
                            </span>
                            <span className="text-[12px] text-gray-400 font-mono truncate md:hidden">
                              {row.p_cat}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-right md:text-left whitespace-nowrap">
                        <span className="text-xs md:text-sm font-bold text-gray-800">
                          ${row.p_cost}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[12px] font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase">
                          {row.p_cat}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                        <Dropdown id={row.productId} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-20 text-center text-gray-400 text-xs"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
