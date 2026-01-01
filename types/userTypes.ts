export interface ShippingInfo {
  address: string;
  city: string;
  zip: string;
  phone: string;
}

export interface UserData {
  email: string;
  name?: string;
  image?: string;
  shippingInfo?: ShippingInfo;
  updatedAt?: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: "Active" | "Inactive";
  currentOrders?: string[]; // IDs of orders assigned to this driver
  updatedAt?: string;
}
