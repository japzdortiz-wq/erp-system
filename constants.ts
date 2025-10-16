
import type { Supplier, Item, PurchaseOrder } from './types';
import { Status } from './types';

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'SUP001', name: 'Global Tech Inc.', contactPerson: 'John Doe', email: 'john.doe@globaltech.com', phone: '123-456-7890', address: '123 Tech Park, Silicon Valley, CA' },
  { id: 'SUP002', name: 'Office Supplies Co.', contactPerson: 'Jane Smith', email: 'jane.s@officesupplies.co', phone: '098-765-4321', address: '456 Business Rd, New York, NY' },
  { id: 'SUP003', name: 'Industrial Parts Ltd.', contactPerson: 'Peter Jones', email: 'p.jones@industrialparts.com', phone: '555-123-4567', address: '789 Factory Lane, Chicago, IL' },
];

export const MOCK_ITEMS: Item[] = [
  { id: 'ITM001', name: 'Laptop Pro 15"', description: 'High-performance laptop for professionals', price: 1200, stock: 50, supplierId: 'SUP001' },
  { id: 'ITM002', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 25, stock: 200, supplierId: 'SUP001' },
  { id: 'ITM003', name: 'A4 Paper Ream', description: '500 sheets of high-quality A4 paper', price: 5, stock: 1000, supplierId: 'SUP002' },
  { id: 'ITM004', name: 'Ballpoint Pens (Box of 50)', description: 'Blue ink ballpoint pens', price: 10, stock: 500, supplierId: 'SUP002' },
  { id: 'ITM005', name: 'Heavy Duty Gearbox', description: 'Industrial grade gearbox model #G-500', price: 2500, stock: 10, supplierId: 'SUP003' },
  { id: 'ITM006', name: 'Conveyor Belt Roll', description: '100ft roll of durable conveyor belt', price: 450, stock: 30, supplierId: 'SUP003' },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'PO2024001',
    supplierId: 'SUP001',
    orderDate: '2024-07-01',
    expectedDeliveryDate: '2024-07-15',
    items: [
      { itemId: 'ITM001', quantity: 10, unitPrice: 1200 },
      { itemId: 'ITM002', quantity: 20, unitPrice: 25 },
    ],
    status: Status.DELIVERED,
    totalAmount: 12500,
  },
  {
    id: 'PO2024002',
    supplierId: 'SUP002',
    orderDate: '2024-07-05',
    expectedDeliveryDate: '2024-07-10',
    items: [
      { itemId: 'ITM003', quantity: 100, unitPrice: 5 },
      { itemId: 'ITM004', quantity: 50, unitPrice: 10 },
    ],
    status: Status.SHIPPED,
    totalAmount: 1000,
  },
  {
    id: 'PO2024003',
    supplierId: 'SUP003',
    orderDate: '2024-07-10',
    expectedDeliveryDate: '2024-08-01',
    items: [
      { itemId: 'ITM005', quantity: 2, unitPrice: 2500 },
    ],
    status: Status.APPROVED,
    totalAmount: 5000,
  },
  {
    id: 'PO2024004',
    supplierId: 'SUP001',
    orderDate: '2024-07-20',
    expectedDeliveryDate: '2024-08-05',
    items: [
      { itemId: 'ITM001', quantity: 5, unitPrice: 1200 },
    ],
    status: Status.PENDING,
    totalAmount: 6000,
  },
  {
    id: 'PO2024005',
    supplierId: 'SUP002',
    orderDate: '2024-05-15',
    expectedDeliveryDate: '2024-05-20',
    items: [
      { itemId: 'ITM003', quantity: 200, unitPrice: 4.5 },
    ],
    status: Status.CANCELLED,
    totalAmount: 900,
  }
];
