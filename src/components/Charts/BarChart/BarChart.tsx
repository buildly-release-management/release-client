import React from "react";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// style={{ maxHeight: "600px" }}
const BarChart = ({ id, chartData }: any) => {
  return <Bar id={id} data={chartData} />;
};

BarChart.propTypes = {
  id: PropTypes.string.isRequired,
  chartData: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.array.isRequired,
        backgroundColor: PropTypes.string,
        borderWidth: PropTypes.array,
        borderColor: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default BarChart;
