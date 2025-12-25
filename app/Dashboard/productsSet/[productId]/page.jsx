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

  return product && <UpdateForm product={product} />;
}

export default UpdateFormPage;
