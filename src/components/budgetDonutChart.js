import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetDonutChart({ categories }) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  const chartData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => {
          const num = parseFloat(cat.target.replace('%', ''));
          return isNaN(num) ? 0 : num;
        }),
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#36A2EBaa',
          '#FF6384aa',
          '#FFCE56aa',
          '#4BC0C0aa',
          '#9966FFaa'
        ]
      }
    ]
  };

  return (
    <div className='h-120 w-auto'>
      <Doughnut data={chartData} />
    </div>
  );
}
