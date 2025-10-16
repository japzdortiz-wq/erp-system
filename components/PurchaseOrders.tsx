
import React, { useState } from 'react';
import type { PurchaseOrder, Supplier, Item } from '../types';
import { Status } from '../types';
import { Table } from './ui/Table';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface PurchaseOrdersProps {
  purchaseOrders: PurchaseOrder[];
  suppliers: Supplier[];
  items: Item[];
}

const statusColorMap: Record<Status, string> = {
  [Status.PENDING]: 'bg-yellow-100 text-yellow-800',
  [Status.APPROVED]: 'bg-blue-100 text-blue-800',
  [Status.SHIPPED]: 'bg-indigo-100 text-indigo-800',
  [Status.DELIVERED]: 'bg-green-100 text-green-800',
  [Status.CANCELLED]: 'bg-red-100 text-red-800',
};

export const PurchaseOrders: React.FC<PurchaseOrdersProps> = ({ purchaseOrders, suppliers, items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSupplierName = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId)?.name || 'Unknown Supplier';
  };
  
  const columns = [
    { header: 'PO Number', accessor: 'id' as const },
    { header: 'Supplier', accessor: (po: PurchaseOrder) => getSupplierName(po.supplierId) },
    { header: 'Order Date', accessor: 'orderDate' as const },
    { header: 'Total Amount', accessor: (po: PurchaseOrder) => `$${po.totalAmount.toFixed(2)}` },
    { 
      header: 'Status', 
      accessor: (po: PurchaseOrder) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[po.status]}`}>
          {po.status}
        </span>
      )
    },
    { 
      header: 'Actions',
      accessor: (po: PurchaseOrder) => (
        <Button size="sm" variant="secondary">View Details</Button>
      )
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">All Purchase Orders</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Create PO
        </Button>
      </div>
      <Table columns={columns} data={purchaseOrders} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Purchase Order">
        <div>
          <p>Purchase order creation form will be here.</p>
        </div>
      </Modal>
    </div>
  );
};
