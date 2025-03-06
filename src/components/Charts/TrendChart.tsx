
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenses } from '@/context/ExpenseContext';

const TrendChart: React.FC = () => {
  const { getExpensesByMonth } = useExpenses();
  const monthlyData = getExpensesByMonth();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border">
          <p className="font-medium">{label}</p>
          <p className="text-gray-600">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={monthlyData}
        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        <XAxis 
          dataKey="month" 
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          dy={10}
        />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#3B82F6"
          strokeWidth={3}
          fill="url(#colorAmount)"
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrendChart;
