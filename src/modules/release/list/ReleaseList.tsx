import { useMachine } from "@xstate/react";
import { releaseMachine } from "../../../state/release/release";
import { ReleaseService } from "../../../services/release.service";
import Table from "react-bootstrap/Table";
import { Release } from "../../../interfaces/release";
import React, { useState } from "react";
import CustomModal from "../../../components/Modal/Modal";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, Stack } from "react-bootstrap";

const orgUuid = "baa50960-1a98-4ced-bb16-b60662ddea55";
const releaseService = new ReleaseService();

function ReleaseList() {
  const [state, send] = useMachine(releaseMachine, {
    services: {
      loadReleases: async (): Promise<any> => {
        return releaseService.loadReleases("");
      },
    },
  });

  // Add/Edit release modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/*handleShow*/}
      <div className="container">
        <Card>
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" gap={3}>
                <h4>Releases</h4>

                <Button
                  className=" ms-auto"
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleShow}
                >
                  New release
                </Button>
              </Stack>
            </Card.Title>
            <Card.Text>
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
                        <td>
                          <Link
                            to={{
                              pathname: `/releases/${release.release_uuid}`,
                            }}
                          >
                            {release.name}
                          </Link>{" "}
                        </td>
                        <td>{release.release_date}</td>
                        <td>{release.features_count}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>

        {/*Add/Edit release modal*/}
        <CustomModal show={show} />
      </div>
    </>
  );
}

export default ReleaseList;
