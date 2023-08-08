import React from "react";
import { useParams } from "react-router-dom";
import DoughnutChart from "../../../components/Charts/Doughnut";
import BarChart from "../../../components/Charts/BarChart";
import "./ReleaseDetails.css";

function ReleaseDetails() {
  const { releaseUuid } = useParams();

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
      <div className="container">
        <section className="toolbar">
          {" "}
          <h6>{releaseUuid}</h6>
        </section>
        {/*<Card>*/}
        {/*  <Card.Body>*/}
        {/*    <h6>{releaseUuid}</h6>*/}
        {/*  </Card.Body>*/}
        {/*</Card>*/}

        <div className="container-fluid my-2">
          <div className="row">
            <div className="col chart-container">
              <DoughnutChart
                id="releases"
                labels={pieChartLabels}
                label={pieChartLabel}
                data={pieChartData}
              />
            </div>
            <div className="col chart-container">
              <BarChart
                id="features"
                label="Features summary"
                labels={barChartLabels}
                data={barChartData}
                backgroundColor={backgroundColor}
                borderWidth={borderWidth}
                borderColor={borderColor}
              />
            </div>
            <div className="col chart-container">
              <BarChart
                id="issues"
                label="Issues summary"
                labels={barChartLabels}
                data={barChartData}
                backgroundColor={backgroundColor}
                borderWidth={borderWidth}
                borderColor={borderColor}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ReleaseDetails;
