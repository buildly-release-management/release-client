import React from "react";
import { useParams } from "react-router-dom";
import DoughnutChart from "../../../components/Charts/Doughnut";
import BarChart from "../../../components/Charts/BarChart";

function ReleaseDetails() {
  const { releaseUuid } = useParams();
  console.log("releaseUuid : ", releaseUuid);

  // Sample data
  const pieChartLabels = ["Done", "In progress", "Overdue"];
  const pieChartLabel = "Releases summary";
  const pieChartData = [7, 5, 3];

  const barChartLabels = ["bike", "car", "scooter", "truck", "auto", "Bus"];
  const barChartData = [
    {
      label: "Done",
      backgroundColor: "#0D5595",
      data: [17, 16, 4, 11, 8, 9],
    },
    {
      label: "In progress",
      backgroundColor: "#F8943C",
      data: [14, 2, 10, 6, 12, 16],
    },
    {
      label: "Overdue",
      backgroundColor: "#C91B1A",
      data: [2, 21, 13, 3, 24, 7],
    },
  ];
  const backgroundColor = "#02b844";
  const borderWidth = 1;
  const borderColor = "#000000";

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
        <section className="col-4">
          <BarChart
            id="features"
            label="Features summary"
            labels={barChartLabels}
            data={barChartData}
            backgroundColor={backgroundColor}
            borderWidth={borderWidth}
            borderColor={borderColor}
          />
        </section>
        <section className="col-4">
          <BarChart
            id="issues"
            label="Issues summary"
            labels={barChartLabels}
            data={barChartData}
            backgroundColor={backgroundColor}
            borderWidth={borderWidth}
            borderColor={borderColor}
          />
        </section>
      </div>
    </>
  );
}
export default ReleaseDetails;
