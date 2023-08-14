import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Main.css";
import ReleaseList from "./release/list/ReleaseList";
import MainNavbar from "../components/Navbar/Navbar";
import ReleaseDetails from "./release/details/ReleaseDetails";
import ProjectSelect from "../components/ProjectSelect/ProjectSelect";

const orgUuid = "baa50960-1a98-4ced-bb16-b60662ddea55";
const Main = () => {
  return (
    <>
      <MainNavbar />
      <div className="container">
        {/*<div className="toolbar">*/}
        <ProjectSelect orgUuid={orgUuid} />
        {/*</div>*/}
      </div>

      <Routes>
        <Route path="/" element={<ReleaseList />} />
        <Route path="releases" element={<ReleaseList />} />
        <Route path="releases/:releaseUuid" element={<ReleaseDetails />} />
      </Routes>
    </>
  );
};

export default Main;
