import { collection, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase";

export default async function ProductTable() {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(productsRef);
  const products = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3" style={{ textAlign: "center" }}>
            Products
          </th>
          <td colSpan="2">
            <a
              href="/products/productsSet/prod_add"
              className="add_product_link"
            >
              Add Product
            </a>
          </td>
        </tr>
        <tr className="bg-blue-300">
          <th>Name</th>
          <th>Cost</th>
          <th>Category</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products && products.length > 0 ? (
          products.map((row) => (
            <tr key={row.id}>
              <td>{row.p_name}</td>
              <td>{row.p_cost}</td>
              <td>{row.p_cat}</td>
              <td>
                <a
                  className="dlt_btn bg-red-400"
                  href={`/actions/product_delete?dlt_p_id=${row.p_id}`}
                >
                  {/* Delete Icon */}
                  <svg
                    fill="#fe4949ff"
                    width="14px"
                    height="14px"
                    viewBox="0 0 408.483 408.483"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path>
                    <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path>
                  </svg>
                </a>
              </td>
              <td>
                <a className="edit_btn" href={`productsSet/${row.id}`}>
                  {/* Edit Icon */}
                  <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    strokeWidth="1.032"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                      fill="#fff"
                    />
                  </svg>
                </a>
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
