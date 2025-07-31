import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatusPieChart = ({ data }) => {
  const chartData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Tasks',
        data: [data.todo, data.inProgress, data.done],
        backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default TaskStatusPieChart;
