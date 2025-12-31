import { getProduct } from "@/services/productsServices";
import UpdateForm from "./components/updateform";
export async function UpdateFormPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await getProduct(id);
  // console.log(product);

  return product && <UpdateForm product={product} />;
}

export default UpdateFormPage;
