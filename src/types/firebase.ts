export type Category = {
  id: string;
  name: string;
  displayOrder: number;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  categoryId: string;
  displayOrder: number;
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type OrderStatus = "pending" | "delivered" | "cancelled";

export type Order = {
  id: string;
  items: OrderItem[];
  orderDate: Date;
  status: OrderStatus;
};

export type CreateOrder = Omit<Order, "id">;
