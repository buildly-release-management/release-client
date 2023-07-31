import React from "react";
import { useParams } from "react-router-dom";

function ReleaseDetails() {
  const { releaseUuid } = useParams();
  console.log("releaseUuid : ", releaseUuid);

  return <></>;
}
export default ReleaseDetails;
