
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PurchaseOrders } from './components/PurchaseOrders';
import { Suppliers } from './components/Suppliers';
import { Items } from './components/Items';
import { Reports } from './components/Reports';
import { ProcurementAssistant } from './components/ProcurementAssistant';
import { MOCK_PURCHASE_ORDERS, MOCK_SUPPLIERS, MOCK_ITEMS } from './constants';
import type { PurchaseOrder, Supplier, Item } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // In a real app, this would come from a global state manager or API calls
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(MOCK_PURCHASE_ORDERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);

  const viewTitles: { [key: string]: string } = {
    dashboard: 'Dashboard',
    purchaseOrders: 'Purchase Orders',
    suppliers: 'Suppliers',
    items: 'Items',
    reports: 'Reports',
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard purchaseOrders={purchaseOrders} suppliers={suppliers} items={items} />;
      case 'purchaseOrders':
        return <PurchaseOrders purchaseOrders={purchaseOrders} suppliers={suppliers} items={items} />;
      case 'suppliers':
        return <Suppliers suppliers={suppliers} />;
      case 'items':
        return <Items items={items} suppliers={suppliers} />;
      case 'reports':
        return <Reports purchaseOrders={purchaseOrders} />;
      default:
        return <Dashboard purchaseOrders={purchaseOrders} suppliers={suppliers} items={items} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={viewTitles[currentView]} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
          {renderView()}
        </main>
      </div>
      <ProcurementAssistant 
        purchaseOrders={purchaseOrders}
        suppliers={suppliers}
        items={items}
      />
    </div>
  );
};

export default App;
