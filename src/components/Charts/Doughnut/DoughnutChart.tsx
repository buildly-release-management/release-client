import React from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, LinearScale, Title, Tooltip, Legend);

const DoughnutChart = ({ id, labels, label, data }: any) => {
  const backgroundColor = ["#0D5595", "#C91B1A", "#F8943C"];
  const chartData = { labels, datasets: [{ label, data, backgroundColor }] };

  const options = {
    responsive: true,
    plugins: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: label,
      },
      emptyDoughnut: {
        color: "rgba(255, 128, 0, 0.5)",
        width: 2,
        radiusDecrease: 20,
      },
    },
  };

  return <Doughnut id={id} options={options} data={chartData} />;
};

DoughnutChart.propTypes = {
  id: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default DoughnutChart;
