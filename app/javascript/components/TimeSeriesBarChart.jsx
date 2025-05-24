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

function TimeSeriesBarChart({ data, title, yMax, cardStyle }) {
  if (!data || data.length === 0) return null;

  // Gradient color for bars
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#36d1c4'); // turquoise
    gradient.addColorStop(1, '#5b86e5'); // blue
    return gradient;
  };

  const chartData = {
    labels: data.map(item => item.dateTime),
    datasets: [
      {
        label: title,
        data: data.map(item => item.value),
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return '#36d1c4';
          return getGradient(ctx, chartArea);
        },
        borderRadius: 8,
        borderSkipped: false,
        borderWidth: 1,
        maxBarThickness: 32,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        font: { size: 20, weight: 'bold' },
        color: '#fff'
      },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#36d1c4',
        borderWidth: 1
      },
      datalabels: {
        display: true,
        color: '#fff',
        anchor: 'end',
        align: 'start',
        font: { weight: 'bold' },
        formatter: Math.round
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#bbb',
          font: { weight: 'bold' }
        }
      },
      y: {
        beginAtZero: true,
        max: yMax,
        grid: {
          color: '#333',
          borderDash: [4, 4]
        },
        ticks: {
          color: '#bbb',
          font: { weight: 'bold' }
        }
      }
    }
  };

  return (
    <div className="card mb-4 shadow-sm border-0" style={cardStyle || {}}>
      <div className="card-body" style={cardStyle || {}}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default TimeSeriesBarChart; 