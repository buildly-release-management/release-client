import React from "react";
import { useParams } from "react-router-dom";
import DoughnutChart from "../../../components/Charts/Doughnut";
import BarChart from "../../../components/Charts/BarChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ReleaseDetails() {
  const { releaseUuid } = useParams();
  console.log("releaseUuid : ", releaseUuid);

  // Sample data
  const pieChartLabels = ["Done", "In progress", "Overdue"];
  const pieChartLabel = "Release summary";
  const pieChartData = [7, 5, 3];

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

  const barChartData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Hours Studied in Geeksforgeeks",
        data: [2, 5, 6, 7, 3, 3, 4],
        backgroundColor: "#02b844",
        borderWidth: 1,
        borderColor: "#000000",
      },
    ],
  };

  return (
    <>
      <div className="row col-12">
        <section className="col-4">
          <DoughnutChart
            id="releases"
            labels={pieChartLabels}
            label={pieChartLabel}
            data={pieChartData}
          />
        </section>
        {/*<section className="col-4">*/}
        {/*  <BarChart id="features" chartData={barChartData} />*/}
        {/*</section>*/}
        {/*<section className="col-4">*/}
        {/*  <DoughnutChart id="isssues" chartData={data} />*/}
        {/*</section>*/}
      </div>
    </>
  );
}
export default ReleaseDetails;
