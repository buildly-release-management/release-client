import React from 'react';
import {useMachine} from '@xstate/react';
import {HttpService} from './services/http'
import Table from 'react-bootstrap/Table';

import './App.css';
import {releaseMachine} from './state/release/release';
import {Release} from './interfaces/release';

function App() {
    const [state, send] = useMachine(releaseMachine, {
        services: {
            loadReleases: async (): Promise<any> => {
                const http = new HttpService()
                return http.fetchData('/release/')
            },
        }
    });
    return (
        <>
            <div className="container">
              <div className="row">
                <h2>Releases</h2>
              </div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Release date</th>
                        <th>Features</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.matches('Releases Loaded') && state.context.releases.map((release: Release) => (
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
