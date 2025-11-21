import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../db/firebase";
import Link from "next/link";
import Dlt_btn from "../../comp/dlt_btn";
import SearchForm from "../../comp/SearchForm";

export default async function ProductTable({ searchParams }) {
  const { search_word } = await searchParams;

  const productsRef = collection(db, "products");
  const q = query(
    productsRef,
    where("p_name", ">=", search_word || ""),
    where("p_name", "<=", (search_word || "") + "\uf8ff")
  );
  const querySnapshot = await getDocs(search_word ? q : productsRef);
  const products = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return (
    <table>
      <thead>
        <tr>
          <td colSpan="2" className="font-bold text-sm">
            Products
          </td>
          <td colSpan="2" className="text-right">
            <Link
              href="/products/productsSet/prod_add"
              className="add_product_link w-full"
            >
              Add Product
            </Link>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <SearchForm />
          </td>
        </tr>
        <tr className="table_header">
          <td className="w-full">Name</td>
          <td>Cost</td>
          <td>Category</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {products && products.length > 0 ? (
          products.map((row) => (
            <tr key={row.id}>
              <td>{row.p_name}</td>
              <td>{row.p_cost}</td>
              <td>{row.p_cat}</td>
              <td className="flex justify-center">
                <Link className="edit_btn" href={`productsSet/${row.id}`}>
                  Edit
                </Link>
                <Dlt_btn id={row.id} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              0 results
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
