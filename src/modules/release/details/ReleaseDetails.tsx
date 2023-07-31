import React from "react";
import { useParams } from "react-router-dom";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
import DoughnutChart from "../../../components/Charts/Doughnut";

// ChartJS.register(ArcElement, Tooltip, Legend);

function ReleaseDetails() {
  const { releaseUuid } = useParams();
  console.log("releaseUuid : ", releaseUuid);

  // Sample data
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Hours Studied in Geeksforgeeks",
        data: [2, 5, 6, 7, 3],
        backgroundColor: ["blue", "green", "yellow", "pink", "orange"],
      },
    ],
  };

  return (
    <>
      <div className="container">
        <DoughnutChart chartData={data} />
      </div>
    </>
  );
}
export default ReleaseDetails;
