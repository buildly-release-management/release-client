import React from "react";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData }: any) => {
  return <Doughnut data={chartData} />;
};

DoughnutChart.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.array.isRequired,
        backgroundColor: PropTypes.array.isRequired,
      })
    ),
  }).isRequired,
};

export default DoughnutChart;
