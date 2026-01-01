import { getProduct } from "@/services/productsServices";
import UpdateForm from "./components/updateform";
export async function UpdateFormPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await getProduct(id);
  // console.log(product);

  return product &&
  
  
  <>            <header className="mb-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Edit Product Details
            </h1>
          </div>
        </div>
      </header>
      <UpdateForm product={product} />
      </>
}

export default UpdateFormPage;
