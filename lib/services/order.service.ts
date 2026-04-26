import orders from "../data/orders.json";
import orderItems from "../data/order_items.json";

export type Order = (typeof orders)[number];
export type OrderItem = (typeof orderItems)[number];

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}

export function getOrderItems(orderId: string): OrderItem[] {
  return orderItems.filter((item) => item.order_id === orderId);
}
