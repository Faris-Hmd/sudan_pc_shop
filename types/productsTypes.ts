export interface ProductImage {
  url: string;
  productImgFile?: any; // Optional, used only during upload
}

export type ProductFilterKey = "p_name" | "p_cat" | "all";
// --- Types ---

// Updated interface to match the user's data structure
export interface ProductType {
  productId: string;
  p_name: string;
  p_cost: number;
  p_cat: string;
  p_details: string;
  p_imgs: ProductImage[];
  createdAt?: any; // Optional, as it may not be present in all contexts
  p_qu?: number; // Quantity
}

interface ProductCardProps {
  product: ProductType;
}

interface ProductGridProps {
  products: ProductType[]; // The prop you will pass in
}

export type OrderData = {
  orderId: string;
  customer_email: string;
  productsList: ProductType[];
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  estimatedDate: string;
  shippedAt?: any;
  deliveredAt?: any;
  createdAt?: any;
  deleveratstamp?: any;
};

export interface CategoryDistribution {
  category: string;
  quantity: number;
  fill: string;
}

export interface DailySalesData {
  month: string;
  day: number;
  sales: number;
  orders: number;
}

export type { ProductCardProps, ProductGridProps };
