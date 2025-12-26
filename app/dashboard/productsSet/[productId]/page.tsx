import { getProduct } from "@/data/products";
import UpdateForm from "./components/updateform";
export async function UpdateFormPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;

  const product = await getProduct(productId);
  // console.log(product);

  return product && <UpdateForm product={product} />;
}

export default UpdateFormPage;
