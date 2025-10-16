
import React from 'react';
import type { PurchaseOrder } from '../types';
import { Status } from '../types';
import { Card } from './ui/Card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsProps {
  purchaseOrders: PurchaseOrder[];
}

export const Reports: React.FC<ReportsProps> = ({ purchaseOrders }) => {
  const monthlySpend = purchaseOrders
    .filter(po => po.status !== Status.CANCELLED)
    .reduce((acc, po) => {
      const month = new Date(po.orderDate).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + po.totalAmount;
      return acc;
    }, {} as Record<string, number>);

  const monthlySpendData = Object.keys(monthlySpend).map(month => ({
    name: month,
    spend: monthlySpend[month],
  })).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const statusDistribution = purchaseOrders.reduce((acc, po) => {
    acc[po.status] = (acc[po.status] || 0) + 1;
    return acc;
  }, {} as Record<Status, number>);

  const statusData = Object.keys(statusDistribution).map(status => ({
    name: status,
    value: statusDistribution[status as Status],
  }));

  const COLORS = ['#FFBB28', '#00C49F', '#0088FE', '#8884d8', '#FF8042'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Monthly Procurement Spend">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={monthlySpendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))}/>
              <Legend />
              <Line type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="Purchase Order Status Distribution">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
