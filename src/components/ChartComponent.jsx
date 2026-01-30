import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ type = "line", data, options, title }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    ...options,
  };

  if (!data) return null;

  return (
    <div className="w-full h-full">
      {type === "line" && <Line data={data} options={defaultOptions} />}
      {type === "bar" && <Bar data={data} options={defaultOptions} />}
    </div>
  );
};

export default ChartComponent;
