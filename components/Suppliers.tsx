
import React, { useState } from 'react';
import type { Supplier } from '../types';
import { Table } from './ui/Table';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface SuppliersProps {
  suppliers: Supplier[];
}

export const Suppliers: React.FC<SuppliersProps> = ({ suppliers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { header: 'Supplier ID', accessor: 'id' as const },
    { header: 'Name', accessor: 'name' as const },
    { header: 'Contact Person', accessor: 'contactPerson' as const },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Phone', accessor: 'phone' as const },
    {
      header: 'Actions',
      accessor: (supplier: Supplier) => (
        <Button size="sm" variant="secondary">Edit</Button>
      )
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Suppliers</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add Supplier
        </Button>
      </div>
      <Table columns={columns} data={suppliers} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Supplier">
        <div>
          <p>Supplier creation form will be here.</p>
        </div>
      </Modal>
    </div>
  );
};
