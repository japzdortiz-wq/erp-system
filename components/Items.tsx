
import React, { useState } from 'react';
import type { Item, Supplier } from '../types';
import { Table } from './ui/Table';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface ItemsProps {
  items: Item[];
  suppliers: Supplier[];
}

export const Items: React.FC<ItemsProps> = ({ items, suppliers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getSupplierName = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId)?.name || 'Unknown Supplier';
  };

  const columns = [
    { header: 'Item ID', accessor: 'id' as const },
    { header: 'Name', accessor: 'name' as const },
    { header: 'Description', accessor: 'description' as const },
    { header: 'Price', accessor: (item: Item) => `$${item.price.toFixed(2)}` },
    { header: 'Stock', accessor: 'stock' as const },
    { header: 'Supplier', accessor: (item: Item) => getSupplierName(item.supplierId) },
    {
      header: 'Actions',
      accessor: (item: Item) => (
        <Button size="sm" variant="secondary">Edit</Button>
      )
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Inventory Items</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add Item
        </Button>
      </div>
      <Table columns={columns} data={items} />
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Item">
        <div>
          <p>Item creation form will be here.</p>
        </div>
      </Modal>
    </div>
  );
};
