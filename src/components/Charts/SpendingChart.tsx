
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useExpenses } from '@/context/ExpenseContext';
import { categoryLabels } from '@/lib/data';

const SpendingChart: React.FC = () => {
  const { getExpensesByCategory } = useExpenses();
  const categoryData = getExpensesByCategory();

  // Convert to array and filter out categories with zero amounts
  const chartData = Object.entries(categoryData)
    .filter(([_, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: categoryLabels[category],
      value: amount,
      category,
    }));

  // Colors for each category
  const COLORS = {
    food: '#0891B2',
    transport: '#6366F1',
    entertainment: '#EC4899',
    utilities: '#F97316',
    shopping: '#A855F7',
    health: '#10B981',
    housing: '#84CC16',
    other: '#64748B',
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-gray-600">${payload[0].value.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">
            {(payload[0].payload.percent * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate total for percentages
  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  // Add percent to each data point
  const dataWithPercent = chartData.map(item => ({
    ...item,
    percent: item.value / total
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dataWithPercent}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          innerRadius={60}
          paddingAngle={1}
          dataKey="value"
          animationDuration={800}
          animationBegin={200}
        >
          {dataWithPercent.map((entry) => (
            <Cell 
              key={`cell-${entry.category}`} 
              fill={COLORS[entry.category as keyof typeof COLORS]} 
              stroke="white"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom"
          align="center"
          iconSize={10}
          iconType="circle"
          formatter={(value) => <span className="text-sm">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpendingChart;
