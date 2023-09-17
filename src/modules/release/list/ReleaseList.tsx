import { useMachine } from "@xstate/react";
import { releaseMachine } from "../../../state/release/release";
import { ReleaseService } from "../../../services/release.service";
import Table from "react-bootstrap/Table";
import { Release } from "../../../interfaces/release";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, ProgressBar, Stack } from "react-bootstrap";
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
import {interpret} from 'xstate';

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

  // let barChartLabels = [
  //   "Release 1",
  //   "Release 2",
  //   "Release 3",
  //   "Release 4",
  //   "Release 5",
  //   "Release 6",
  // ];

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

  const service = interpret(productMachine).start();
  const serviceSub = service.subscribe((state) => console.log(state));

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

  // Sample data
  const pieChartLabels = ["Completed", "Overdue", "In progress"];
  const backgroundColor = "#02b844";
  const borderWidth = 1;
  const borderColor = "#000000";

  // Table
  function createData(
    name: string,
    // progress: number,
    // progress_bar_variant: string,
    // status: number,
    features_count: number,
    issues_count: number,
    release_date: string
  ) {
    return {
      name,
      // progress,
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

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          {/*<TableCell>*/}
          {/*  <IconButton*/}
          {/*    aria-label="expand row"*/}
          {/*    size="small"*/}
          {/*    onClick={() => setOpen(!open)}*/}
          {/*  >*/}
          {/*    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}*/}
          {/*  </IconButton>*/}
          {/*</TableCell>*/}
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          {/*<TableCell>*/}
          {/*  <ProgressBar*/}
          {/*    now={row.progress}*/}
          {/*    label={`${row.progress}%`}*/}
          {/*    variant={row.progress_bar_variant}*/}
          {/*  />*/}
          {/*</TableCell>*/}
          {/*<TableCell align="right">{row.status}</TableCell>*/}
          <TableCell align="center">{row.features_count}</TableCell>
          <TableCell align="center">{row.issues_count}</TableCell>
          <TableCell align="center">{row.release_date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/*{row.history.map((historyRow) => (*/}
                    {/*  <TableRow key={historyRow.date}>*/}
                    {/*    <TableCell component="th" scope="row">*/}
                    {/*      {historyRow.date}*/}
                    {/*    </TableCell>*/}
                    {/*    <TableCell>{historyRow.customerId}</TableCell>*/}
                    {/*    <TableCell align="right">{historyRow.amount}</TableCell>*/}
                    {/*    <TableCell align="right">*/}
                    {/*      {Math.round(*/}
                    {/*        historyRow.amount * row.features_count * 100*/}
                    {/*      ) / 100}*/}
                    {/*    </TableCell>*/}
                    {/*  </TableRow>*/}
                    {/*))}*/}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  // const rows = [
  //   createData("Release 1", 59, "info", 6.0, 24, 4.0, "2020-01-05"),
  //   createData("Release 2", 37, "warning", 9.0, 37, 4.3, "2020-01-05"),
  //   createData("Release 3", 62, "info", 16.0, 24, 6.0, "2020-01-05"),
  //   createData("Release 4", 15, "danger", 3.7, 67, 4.3, "2020-01-05"),
  //   createData("Release 5", 56, "info", 16.0, 49, 3.9, "2020-01-05"),
  // ];

  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography variant="h5">Releases</Typography>

        <Button variant="outline-secondary" size="sm" onClick={handleShow}>
          New release
        </Button>
      </div>

      {releasesSummary && (
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
      )}

      <TableContainer component={Paper} className="mt-4">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/*<TableCell />*/}
              <TableCell>Name</TableCell>
              {/*<TableCell>Progress</TableCell>*/}
              {/*<TableCell align="right">Status</TableCell>*/}
              <TableCell align="center">Features</TableCell>
              <TableCell align="center">Issues</TableCell>
              <TableCell align="center">Release date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {releasesState.context.releases.length &&
              releasesState.context.releases.map((row: any) => (
                <Row key={row.name} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*Add/Edit release modal*/}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
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
            {/* todo - form validation formData.product_uuid*/}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ReleaseList;
