import { useMachine } from "@xstate/react";
import { releaseMachine } from "../../../state/release/release";
import { ReleaseService } from "../../../services/release.service";
import Table from "react-bootstrap/Table";
import { Release } from "../../../interfaces/release";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  Card,
  Dropdown,
  OverlayTrigger,
  ProgressBar,
  Stack,
  Tooltip,
} from "react-bootstrap";
import DoughnutChart from "../../../components/Charts/Doughnut";
import BarChart from "../../../components/Charts/BarChart";
import {
  Box,
  Collapse,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { productMachine } from "../../../state/product/product";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { HttpService } from "../../../services/http.service";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const releaseService = new ReleaseService();
const httpService = new HttpService();

interface BarChartData {
  label: string;
  key: string;
  backgroundColor: string;
  data: number[];
}

function ReleaseList() {
  // define current product (select from product state)
  const [currentProduct, setCurrentProduct] = useState(null as any);

  // define release summary
  const [releasesSummary, setReleasesSummary] = useState(null as any);

  // @ts-ignore
  const [productState] = useMachine(productMachine, {
    context: {
      products: [],
      error: undefined,
      organization_uuid: "baa50960-1a98-4ced-bb16-b60662ddea55",
      selectedProduct: null,
    },
  });

  // @ts-ignore
  const [releasesState, send] = useMachine(releaseMachine, {
    context: {
      releases: [],
    },
  });

  let featuresReleaseNames: string[] = [];
  let issuesReleaseNames: string[] = [];
  useEffect(() => {
    // set current product
    if (productState.context.selectedProduct) {
      setCurrentProduct(productState.context.selectedProduct);
      send("Load", {
        product_uuid: productState.context.selectedProduct.product_uuid,
      });

      try {
        httpService
          .fetchData(
            `/release/release_summary/?product_uuid=${productState.context.selectedProduct.product_uuid}`,
            "release"
          )
          .then((response: any) => {
            // Construct issues summary data
            const issuesSummaryObj = generateBarChartData(
              response.data.issues,
              "issues_data"
            );
            issuesReleaseNames = issuesSummaryObj.releaseNames;

            // Construct features summary data
            const featuresSummaryObj = generateBarChartData(
              response.data.features,
              "features_data"
            );
            featuresReleaseNames = featuresSummaryObj.releaseNames;

            setReleasesSummary({
              releases: Object.values(response.data.releases),
              features: featuresSummaryObj.barChartSummaryData,
              issues: issuesSummaryObj.barChartSummaryData,
            });
          });
      } catch (httpError) {
        console.log("httpError : ", httpError);
      }
    }
  }, [productState]);

  /**
   * Construct bar chart data
   * @param data
   * @param dataField
   */
  const generateBarChartData = (data: any, dataField: string) => {
    const releaseNames: string[] = [];
    const barChartSummaryData: BarChartData[] = [
      {
        label: "Completed",
        key: "completed",
        backgroundColor: "#0D5595",
        data: [],
      },
      {
        label: "In progress",
        key: "in_progress",
        backgroundColor: "#F8943C",
        data: [],
      },
      {
        label: "Overdue",
        key: "overdue",
        backgroundColor: "#C91B1A",
        data: [],
      },
    ];

    data.forEach((entry: any) => {
      releaseNames.push(entry.release);
      Object.keys(entry[dataField]).forEach((key) => {
        const index = barChartSummaryData.findIndex(
          (summaryEntry) => summaryEntry.key === key
        );

        if (index > -1) {
          barChartSummaryData[index].data.push(entry[dataField][key]);
        }
      });
    });

    return { releaseNames, barChartSummaryData };
  };

  // Add/Edit release modal
  const [showReleaseModal, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Release form
  const [formData, setFormData] = useState({} as Release);

  // Update formData on form value change
  const updateFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitRelease = (event: any) => {
    event.preventDefault();
    if (currentProduct) {
      const data = { product_uuid: currentProduct.product_uuid, ...formData };
      send("Submit", { release: data });
    }
  };

  const deleteRelease = (row: any) => {
    console.log("deleteRelease : ", row);
  };

  // Sample data
  const pieChartLabels = ["Completed", "Overdue", "In progress"];
  const backgroundColor = "#02b844";
  const borderWidth = 1;
  const borderColor = "#000000";

  // Table
  function createData(
    release_uuid: string,
    name: string,
    features_done: number,
    // progress_bar_variant: string,
    // status: number,
    features_count: number,
    issues_count: number,
    release_date: string
  ) {
    const barValue = (features_done / features_count) * 100;
    return {
      release_uuid,
      name,
      features_done,
      // progress_bar_variant,
      // status,
      features_count,
      issues_count,
      release_date,
      history: [
        {
          date: "2020-01-05",
          customerId: "11091700",
          amount: 3,
        },
        {
          date: "2020-01-02",
          customerId: "Anonymous",
          amount: 1,
        },
      ],
    };
  }

  /**
   * Init progress bar
   * @param row
   */
  const initProgressBar = (row: any) => {
    const value = (row.features_done / row.features_count) * 100;
    const theme = value > 74 ? "info" : value > 40 ? "warning" : "danger";
    return { value, theme };
  };

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    let progressBarObj = {
      value: 0,
      theme: "danger",
    };

    if (row.features_count > 0) {
      progressBarObj = initProgressBar(row);
    }

    let featuresList: any[] = [];
    if (open && row) {
      try {
        httpService
          .fetchData(
            `/feature/?release_features__release_uuid=${row.release_uuid}`,
            "release"
          )
          .then((response: any) => {
            featuresList = response.data;
            console.log("response : ", response);
          });
      } catch (httpError) {
        console.log("httpError : ", httpError);
      }
    }

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={() => (
                <Tooltip>{`${progressBarObj.value}% achieved`}</Tooltip>
              )}
              placement="right"
            >
              <ProgressBar
                now={progressBarObj.value}
                label={`${progressBarObj.value}%`}
                variant={progressBarObj.theme}
              />
            </OverlayTrigger>
          </TableCell>
          {/*<TableCell align="right">{row.status}</TableCell>*/}
          <TableCell align="center">{row.features_count}</TableCell>
          <TableCell align="center">{row.issues_count}</TableCell>
          <TableCell align="center">{row.release_date}</TableCell>
          <TableCell align="right">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <IconButton aria-label="expand row" size="small">
                  <MoreVertIcon />
                </IconButton>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => deleteRelease(row)}>
                  Delete release
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              paddingLeft: 8,
              backgroundColor: "#f5f5f5",
            }}
            colSpan={12}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/*<Typography variant="h6" gutterBottom component="div">*/}
                {/*  Features*/}
                {/*</Typography>*/}
                <Table size="small" aria-label="features">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Progress</TableCell>
                      {/*<TableCell>Status</TableCell>*/}
                      <TableCell>Issues</TableCell>
                      <TableCell align="right">Assignees</TableCell>
                      <TableCell align="right">Date Due</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {featuresList.length ? (
                      featuresList.map((feature) => (
                        <TableRow key={feature.feature_uuid}>
                          <TableCell component="th" scope="row">
                            {feature.name}
                          </TableCell>
                          <TableCell>{feature.progress}</TableCell>
                          <TableCell>{feature.status}</TableCell>
                          <TableCell>{feature.issues}</TableCell>
                          <TableCell align="right">
                            {feature.assignees}
                          </TableCell>
                          <TableCell align="right">
                            {feature.date_due}
                          </TableCell>
                          {/*<TableCell align="right">*/}
                          {/*  {Math.round(*/}
                          {/*      feature.amount * row.features_count * 100*/}
                          {/*  ) / 100}*/}
                          {/*</TableCell>*/}
                        </TableRow>
                      ))
                    ) : (
                      <div className="p-2">No features to display</div>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      {releasesState.context.releases.length ? (
        <>
          <div className="d-flex justify-content-between">
            <Typography variant="h6">Releases summary</Typography>

            <Button variant="outline-secondary" size="sm" onClick={handleShow}>
              New release
            </Button>
          </div>

          {releasesSummary ? (
            <div className="container-fluid my-2">
              <div className="row">
                <div className="col chart-container">
                  <DoughnutChart
                    id="releases"
                    labels={pieChartLabels}
                    label="Releases summary"
                    data={releasesSummary?.releases}
                  />
                </div>
                <div className="col chart-container">
                  <BarChart
                    id="features"
                    label="Features summary"
                    labels={featuresReleaseNames}
                    data={releasesSummary?.features}
                    backgroundColor={backgroundColor}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                  />
                </div>
                <div className="col chart-container">
                  <BarChart
                    id="issues"
                    label="Issues summary"
                    labels={issuesReleaseNames}
                    data={releasesSummary?.issues}
                    backgroundColor={backgroundColor}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="d-flex justify-content-between">
            <Typography variant="h6">Releases </Typography>
          </div>
          <TableContainer component={Paper} className="mt-4">
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Progress</TableCell>
                  {/*<TableCell align="right">Status</TableCell>*/}
                  <TableCell align="center">Features</TableCell>
                  <TableCell align="center">Issues</TableCell>
                  <TableCell align="center">Release date</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {releasesState.context.releases.length
                  ? releasesState.context.releases.map((row: any) => (
                      <Row key={row.release_uuid} row={row} />
                    ))
                  : []}
              </TableBody>
            </Table>
          </TableContainer>

          {/*Add/Edit release modal*/}
          <Modal
            show={showReleaseModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>New release</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <Form noValidate>
                {/*name*/}
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    onChange={(event) => updateFormData(event)}
                  />
                </Form.Group>
                {/*description*/}
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    onChange={(event) => updateFormData(event)}
                  />
                </Form.Group>
                {/*release date*/}
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Release date</Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    placeholder="Release date"
                    name="release_date"
                    required
                    onChange={(event) => updateFormData(event)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleClose()}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={!(formData.name && formData.release_date)}
                onClick={(event) => submitRelease(event)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          {/*{showReleaseModal ? (*/}
          {/*  <div*/}
          {/*    className="modal show"*/}
          {/*    style={{ display: "block", position: "initial" }}*/}
          {/*  ></div>*/}
          {/*) : null}*/}
        </>
      ) : (
        <>
          {" "}
          <div className="d-flex flex-column align-items-center justify-content-center h-50">
            <Typography variant="h6" className="text-center pb-2">
              No releases to display for the current product. <br />
              To get you started, create a release!
            </Typography>

            <Button variant="outline-secondary" size="sm" onClick={handleShow}>
              New release
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default ReleaseList;
