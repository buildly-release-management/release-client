import {useMachine} from '@xstate/react';
import {releaseMachine} from '../../../state/release/release';
import {ReleaseService} from '../../../services/release.service';
import Table from 'react-bootstrap/Table';
import {Release} from '../../../interfaces/release';
import React from 'react';

const releaseService = new ReleaseService()

function ReleaseList() {
    const [state, send] = useMachine(releaseMachine, {
        services: {
            loadReleases: async (): Promise<any> => {
                return releaseService.loadReleases('')
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
                    {state.matches('Entry.Loaded') && state.context.releases.map((release: Release) => (
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

export default ReleaseList;
