import Image from "next/image";
import ServerComp from "./comp/servercomo";

export default function Home() {
  const products = [
    {
      p_id: 1,
      p_img: "pc1.png",
      p_name: "Dell Inspiron",
      p_cost: 999,
      p_cat: "PC",
    },
    {
      p_id: 2,
      p_img: "pc2.png",
      p_name: "HP Pavilion",
      p_cost: 1099,
      p_cat: "PC",
    },
    {
      p_id: 3,
      p_img: "pc3.png",
      p_name: "Acer Aspire",
      p_cost: 899,
      p_cat: "PC",
    },
    {
      p_id: 4,
      p_img: "pc4.png",
      p_name: "Lenovo ThinkPad",
      p_cost: 1199,
      p_cat: "PC",
    },
    {
      p_id: 5,
      p_img: "pc1.png",
      p_name: "Asus VivoBook",
      p_cost: 999,
      p_cat: "PC",
    },
    {
      p_id: 6,
      p_img: "pc2.png",
      p_name: "MSI Modern",
      p_cost: 1099,
      p_cat: "PC",
    },
    {
      p_id: 7,
      p_img: "pc3.png",
      p_name: "Apple iMac",
      p_cost: 1499,
      p_cat: "PC",
    },
    {
      p_id: 8,
      p_img: "pc4.png",
      p_name: "Samsung Galaxy",
      p_cost: 1199,
      p_cat: "PC",
    },
    {
      p_id: 9,
      p_img: "pc1.png",
      p_name: "Microsoft Surface",
      p_cost: 1599,
      p_cat: "PC",
    },
    {
      p_id: 10,
      p_img: "pc2.png",
      p_name: "Razer Blade",
      p_cost: 1799,
      p_cat: "PC",
    },
  ];

  return (
    <div className="list">
      {products && products.length > 0 ? (
        products.map((row) => (
          <div className="product_card" key={row.p_id}>
            <a href={`prod_details?id=${row.p_id}`}>
              <div className="img_container">
                <img height={120} src={row.p_img} alt="Product Image" />
              </div>
            </a>
            <div className="name">{row.p_name}</div>
            <div className="wrapper">
              <span className="cost">{row.p_cost}</span>
              <span className="category"> | {row.p_cat}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no_product">No products available</div>
      )}
    </div>
  );
}
