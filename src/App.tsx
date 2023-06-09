import React from "react";
import { useMachine } from "@xstate/react";
import { HttpService } from "./services/http";
import Table from "react-bootstrap/Table";
import Select from "./components/Select";
import Button from "react-bootstrap/Button";

import { releaseMachine } from "./state/release/release";
import { Release } from "./interfaces/release";

import "./App.css";
import "./assets/custom-theme.scss";

function App() {
  const [state, send] = useMachine(releaseMachine, {
    services: {
      loadReleases: async (): Promise<any> => {
        const http = new HttpService();
        return http.fetchData("/release/");
      },
    },
  });
  return (
    <>
      <div className="container">
        <div className="flex-container d-flex flex-row justify-content-between align-items-center">
          <section className="col-6">
            <Select label="Select a product" size="large" info="last updated" />
          </section>

          <Button variant="secondary" className="secondary">
            New release
          </Button>
        </div>

        <div className="row">{/*<h2>Releases</h2>*/}</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Release date</th>
              <th>Features</th>
            </tr>
          </thead>
          <tbody>
            {state.matches("Releases Loaded") &&
              state.context.releases.map((release: Release) => (
                <tr key={release.release_uuid}>
                  <td>{release.name}</td>
                  <td>{release.release_date}</td>
                  <td>{release.features_count}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
