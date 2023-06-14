import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Main.css";
import ReleaseList from "./release/list/ReleaseList";
import MainNavbar from "../components/Navbar/Navbar";

const Main = () => {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<ReleaseList />} />
        <Route path="releases" element={<ReleaseList />} />
      </Routes>
    </>
  );
};

export default Main;
