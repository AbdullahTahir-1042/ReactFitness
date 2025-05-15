import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TimeSeriesBarChart({ data, title, yMax }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(item => item.dateTime),
    datasets: [
      {
        label: title,
        data: data.map(item => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yMax
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default TimeSeriesBarChart; 