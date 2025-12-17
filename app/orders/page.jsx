import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "./../db/firebase";
import getUser from "../data/getUser";
import OrderList from "./../comp/orders";

export default async function Orders() {
  const user = await getUser();
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("customer_email", "==", user.email));

  const getOrders = async () => {
    const querySnapshot = await getDocs(q);

    // Map through each document in the "orders" collection
    const allOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        orderId: doc.id,
        customerEmail: data.customer_email,
        // Map the internal items array to ensure consistent keys
        productList: data.items.map((item) => ({
          p_name: item.p_name,
          p_cost: item.p_cost,
          productId: item.productId,
          p_qu: item.p_qu,
          p_cat: item.p_cat,
        })),
        // Default UI fields for your Progress Bar
        status: data.status || "Processing",
        estimatedDate: data.estimatedDate || "Dec 20, 2025",
      };
    });

    return allOrders;
  };
  const steps = ["Placed", "Processing", "Shipped", "Delivered"];
  const orders = await getOrders();
  return <OrderList orders={orders} steps={steps} />;
}
