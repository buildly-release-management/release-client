import React from "react";
import {Routes, Route} from "react-router-dom";
import "./Main.css";
import ReleaseList from "./release/list/ReleaseList";
import MainNavbar from "../components/Navbar/Navbar";
import ReleaseDetails from "./release/details/ReleaseDetails";
import ProjectSelect from "../components/ProjectSelect/ProjectSelect";

const Main = () => {
    const currentUser = localStorage.getItem('currentUser')
    let organization: any = null;
    if (currentUser) {
        organization = JSON.parse(currentUser).organization;
    }
    return (
        <>
            <MainNavbar/>
            <ProjectSelect orgUuid={organization?.organization_uuid}/>

            <div className="main-container">
                <Routes>
                    <Route path="/" element={<ReleaseList/>}/>
                    <Route path="releases" element={<ReleaseList/>}/>
                    <Route path="releases/:releaseUuid" element={<ReleaseDetails/>}/>
                </Routes>
            </div>
        </>
    );
};

export default Main;
