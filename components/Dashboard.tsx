
import React from 'react';
import type { PurchaseOrder, Supplier, Item } from '../types';
import { Status } from '../types';
import { Card } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  purchaseOrders: PurchaseOrder[];
  suppliers: Supplier[];
  items: Item[];
}

// Fix: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactElement }> = ({ title, value, icon }) => (
  <Card>
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  </Card>
);


export const Dashboard: React.FC<DashboardProps> = ({ purchaseOrders, suppliers, items }) => {
  const totalSpend = purchaseOrders
    .filter(po => po.status !== Status.CANCELLED)
    .reduce((sum, po) => sum + po.totalAmount, 0);

  const pendingApprovals = purchaseOrders.filter(po => po.status === Status.PENDING).length;

  const spendBySupplier = purchaseOrders.reduce((acc, po) => {
    if (po.status !== Status.CANCELLED) {
      const supplierName = suppliers.find(s => s.id === po.supplierId)?.name || 'Unknown';
      acc[supplierName] = (acc[supplierName] || 0) + po.totalAmount;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(spendBySupplier).map(name => ({
    name,
    spend: spendBySupplier[name]
  })).sort((a,b) => b.spend - a.spend).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Spend" 
          value={`$${(totalSpend / 1000).toFixed(1)}k`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} 
        />
        <StatCard 
          title="Active POs" 
          value={purchaseOrders.filter(po => po.status !== Status.DELIVERED && po.status !== Status.CANCELLED).length}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
        />
        <StatCard 
          title="Pending Approvals" 
          value={pendingApprovals}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Total Suppliers" 
          value={suppliers.length}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" /></svg>}
        />
      </div>
      
      <Card title="Top 5 Suppliers by Spend">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fill: '#475569', fontSize: 12}} />
              <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tick={{fill: '#475569', fontSize: 12}}/>
              <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))}/>
              <Legend />
              <Bar dataKey="spend" fill="#3b82f6" name="Total Spend"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
