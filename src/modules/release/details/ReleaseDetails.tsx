import React from "react";
import { useParams } from "react-router-dom";
import DoughnutChart from "../../../components/Charts/Doughnut";

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
      <div className="row col-12">
        <section className="col-4">
          <DoughnutChart chartData={data} />
        </section>
        <section className="col-4">
          <DoughnutChart chartData={data} />
        </section>
        <section className="col-4">
          <DoughnutChart chartData={data} />
        </section>
      </div>
    </>
  );
}
export default ReleaseDetails;
