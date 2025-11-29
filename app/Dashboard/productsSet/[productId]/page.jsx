import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";
import UpdateForm from "./Updateform";
export async function UpdateFormPage({ params }) {
  const { productId } = await params;

  const docRef = doc(db, "productsTest", productId);
  const docsnapshot = await getDoc(docRef);
  const product = docsnapshot.exists()
    ? { ...docsnapshot.data(), id: docsnapshot.id }
    : {};
  // console.log(product);

  return (
    <>
      <div className="bg-white flex justify-between items-center mb-2 p-2 border-b shadow flex-wrap">
        <h3>Update Product</h3>
      </div>
      {product && <UpdateForm product={product} />}
    </>
  );
}

export default UpdateFormPage;
