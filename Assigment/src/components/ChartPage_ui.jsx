import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PreceptorVsStudentChart = ({ collectiveData }) => {
  // Default months for the x-axis
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // If collectiveData is not provided, return a loading placeholder
  if (!collectiveData) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">No chart data available</p>
        </div>
      </div>
    );
  }

  // Transform collectiveData into the format expected by the chart
  const preceptorData = months.map((month, index) => collectiveData?.[index]?.preceptors || 0);
  const studentData = months.map((month, index) => collectiveData?.[index]?.students || 0);

  // Calculate the maximum value for the y-axis (with some padding)
  const maxPreceptor = Math.max(...preceptorData);
  const maxStudent = Math.max(...studentData);
  const maxValue = Math.max(maxPreceptor, maxStudent);
  const yAxisMax = Math.ceil(maxValue / 500) * 500 + 500; // Round up to nearest 500 and add padding

  // Prepare the datasets for Preceptors and Students
  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Preceptors',
        data: preceptorData,
        backgroundColor: '#F87171', // Red color for Preceptors
        borderWidth: 0,
      },
      {
        label: 'Students',
        data: studentData,
        backgroundColor: '#FECACA', // Light pink color for Students
        borderWidth: 0,
      },
    ],
  };

  // Chart options to match the styling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Preceptors vs Students Comparison',
        align: 'start',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          // Customize tooltip to show "Month - Preceptors: X, Students: Y"
          label: function (context) {
            const month = context.label;
            const datasetLabel = context.dataset.label;
            const preceptors = chartData.datasets[0].data[context.dataIndex];
            const students = chartData.datasets[1].data[context.dataIndex];
            if (datasetLabel === 'Preceptors' && (preceptors > 0 || students > 0)) {
              return `${month} - Preceptors: ${preceptors}, Students: ${students}`;
            }
            return ''; // Only show tooltip for Preceptors to avoid duplication
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: false,
          color: '#E5E7EB', // Light gray grid lines
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: 0,
        max: yAxisMax,
        ticks: {
          stepSize: yAxisMax / 4, // Divide the y-axis into 4 equal parts
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          color: '#E5E7EB',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

// Default props in case no data is provided
PreceptorVsStudentChart.defaultProps = {
  collectiveData: Array(12).fill({ preceptors: 0, students: 0 }),
};

export default PreceptorVsStudentChart;