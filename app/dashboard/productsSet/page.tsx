import Link from "next/link";
import { Plus, Package } from "lucide-react";
import Dropdown from "./components/dropdown";
import TableSearchForm from "./components/tableSearchForm";
import { getProducts } from "@/services/productsServices";

export default async function ProductTable({
  searchParams,
}: {
  searchParams: Promise<{ key: string; value: string }>;
}) {
  const { key, value } = await searchParams;
  // cast key to any to satisfy getProducts parameter type
  const products = await getProducts(key as any, value, 20);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50/30 dark:bg-black transition-colors duration-500">
      <div className="p-2 md:p-8 flex flex-col h-full gap-4 md:gap-6">
        {/* Header Section - More compact on mobile */}
        <header className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0 transition-all">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Product Catalog
              </h1>
              <p className="hidden md:block text-sm text-slate-500 dark:text-slate-400 font-bold tracking-tight">
                Manage, audit, and expand your digital inventory
              </p>
            </div>
            <Link
              href="/dashboard/productsSet/prod_add"
              className="flex items-center gap-2 bg-blue-600 text-white font-black py-2.5 px-4 md:px-6 rounded-xl shadow-lg shadow-blue-500/20 text-xs md:text-sm transition-all active:scale-95 hover:bg-blue-700 hover:shadow-blue-500/40 uppercase tracking-widest"
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:block">Add Product</span>
            </Link>
          </div>
          <TableSearchForm />
        </header>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grow overflow-hidden flex flex-col rounded-[2rem] transition-all">
          <div className="overflow-y-auto grow">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 table-fixed">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-4 md:px-8 py-5 text-left text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] w-full">
                    Product Identification
                  </th>
                  <th className="px-4 md:px-8 py-5 text-right md:text-left text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] w-24 md:w-40">
                    Pricing
                  </th>
                  <th className="hidden lg:table-cell px-8 py-5 text-left text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] w-48">
                    Category Tag
                  </th>
                  <th className="px-4 md:px-8 py-5 text-center text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] w-16 md:w-28">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-50 dark:divide-slate-800/40">
                {products?.length > 0 ? (
                  products.map((row) => (
                    <tr key={row.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                      <td className="px-4 md:px-8 py-4 md:py-5">
                        <Link
                          href={"/products/" + row.id as any} 
                          className="flex items-center gap-3 md:gap-4 group/item"
                        >
                          <div className="hidden sm:flex p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all group-hover:scale-110">
                            <Package size={18} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm md:text-base font-black text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {row.p_name}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest truncate mt-1">
                              ID: {row.id.slice(-8).toUpperCase()}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 md:px-8 py-4 md:py-5 text-right md:text-left whitespace-nowrap">
                        <span className="text-sm md:text-base font-black text-slate-900 dark:text-white transition-colors">
                          {Number(row.p_cost).toLocaleString()} <span className="text-[10px] text-slate-400 font-bold">SDG</span>
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-8 py-4 md:py-5 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 uppercase tracking-widest transition-colors">
                          {row.p_cat.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 md:px-8 py-4 md:py-5 text-center">
                        <Dropdown id={row.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-32 text-center text-slate-300 dark:text-slate-700 text-xs font-black uppercase tracking-[0.3em] animate-pulse"
                    >
                      Empty Catalog Database
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
