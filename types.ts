
export enum Status {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  supplierId: string;
}

export interface PurchaseOrderItem {
  itemId: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  orderDate: string;
  expectedDeliveryDate: string;
  items: PurchaseOrderItem[];
  status: Status;
  totalAmount: number;
}
