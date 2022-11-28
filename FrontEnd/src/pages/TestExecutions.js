import React, { useEffect, useState } from "react";
import {
  TheList,
  ListItem,
  MyBugOutline,
  MyFixOutline,
  MyIntermittentOutline,
} from "../styles/styled-element";
import { DataGrid } from "@material-ui/data-grid";
import { productRows } from "../dummyData";
import { TextField, Tooltip } from "@material-ui/core";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "@material-ui/core/Button";

import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import { BASE_API_URL } from "../Utils/Config.js";
import SimpleModal from "../components/SimpleModal";
import DateRangeFilter from "../components/DateRangeFilter";
import "../App.css";
import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

const TestExecutions = () => {
  const [data, setData] = useState(productRows);
  const [open, setOpen] = useState(false);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );
  const [env, setEnv] = React.useState("");
  const [testcasestatus, setTestStatus] = React.useState("");
  const [suitename, setSuiteName] = React.useState("");

  let startDate, endDate;

  const envs = [
    {
      value: "NE1",
      label: "NE1",
    },
    {
      value: "PROD",
      label: "PROD",
    },
    {
      value: "PreProd",
      label: "PreProd",
    },
    {
      value: "QE",
      label: "QE",
    },
  ];

  const testStatus = [
    {
      value: "FAIL",
      label: "FAIL",
    },
    {
      value: "PASS",
      label: "PASS",
    },
    {
      value: "SKIPPED",
      label: "SKIPPED",
    },
  ];

  const handleEnvChange = (event) => {
    setEnv(event.target.value);
  };

  const handleSuiteNameChange = (event) => {
    setSuiteName(event.target.value);
  };

  const handleTestStatusChange = (event) => {
    setTestStatus(event.target.value);
  };

  const onChange = (ranges) => {
    console.log(
      "suitename",
      suitename,
      "env",
      env,
      "testcasestatus",
      testcasestatus
    );

    if (
      moment(ranges.startDate).format("MM-DD-YYYY") !==
      moment(ranges.endDate).format("MM-DD-YYYY")
    ) {
      setOpen(false);
    } else if (ranges.startDate === "" && ranges.endDate === "") {
      setOpen(false);
    }
    startDate = moment(ranges.startDate).format("MM-DD-YYYY");
    endDate = moment(ranges.endDate).format("MM-DD-YYYY");
    console.log(startDate, endDate);
    if (endDate === "Invalid date") {
      endDate = startDate;
    }
    getTestResultsForGivenDateRange(
      startDate,
      endDate,
      suitename,
      env,
      testcasestatus
    );
  };

  const testcasedata = async () => {
    setTestStatus("");
    setEnv("");
    setSuiteName("");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getTestCaseExecution",
        requestOptions
      );
      const json = await response.json();

      setData(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    testcasedata();
  }, []);

  const getTestResultsForGivenDateRange = async (startDate, endDate) => {
    console.log(startDate, endDate, suitename, env, testcasestatus);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
          subscriptionkey: subscriptionkey,
          suite: suitename,
          env: env,
          status: testcasestatus,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getTestResultsForGivenDateRange",
        requestOptions
      );
      const json = await response.json();

      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  const addToMaintenanceTracker = (suite, testcasename, env, failureReason) => {
    console.log(suite, testcasename, env, failureReason);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suite: suite,
        testcasename: testcasename,
        env: env,
        failurereason: failureReason,
        subscriptionkey: subscriptionkey,
      }),
    };
    fetch(BASE_API_URL + "/createMaintenance", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("successfully added in maintenanceTracker "));
  };

  const addToProductDefectTracker = (
    suite,
    testcasename,
    env,
    failureReason
  ) => {
    const jirakey = "XIOCloud-123";
    console.log(
      "suite : ",
      suite,
      "testcasname : ",
      testcasename,
      "jirakey",
      jirakey,
      "env",
      env,
      "failureason",
      failureReason
    );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suite: suite,
        testcasename: testcasename,
        jirakey: jirakey,
        env: env,
        failurereason: failureReason,
        subscriptionkey: subscriptionkey,
      }),
    };
    fetch(BASE_API_URL + "/createDefect", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("successfully added in defectList "));
  };

  const intermittentFailure = (suite, testcasename, env, failureReason) => {
    console.log(suite, testcasename, env, failureReason);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suite: suite,
        testcasename: testcasename,
        env: env,
        failurereason: "Intermittent Failure",
        subscriptionkey: subscriptionkey,
      }),
    };
    fetch(BASE_API_URL + "/createMaintenance", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("successfully added in maintenanceTracker "));
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "suite",
      headerName: "Suite",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title={params.row.suite}>
              <ListItem>{params.row.suite}</ListItem>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "testcasename",
      headerName: "Test Case Name",
      width: 500,

      renderCell: (params) => {
        return (
          <>
            <Tooltip title={params.row.testcasename}>
              <ListItem>
                <SimpleModal
                  testcasename={params.row.testcasename}
                  suite={params.row.suite}
                  env={params.row.env}
                ></SimpleModal>
              </ListItem>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <ListItem>
              <a href={params.row.reportpath} target="_blank" rel="noreferrer">
                {params.row.status}
              </a>
            </ListItem>
          </>
        );
      },
    },
    {
      field: "env",
      headerName: "Env",
      width: 120,
      renderCell: (params) => {
        return <ListItem>{params.row.env}</ListItem>;
      },
    },

    {
      field: "Date",
      headerName: "Date",
      width: 148,
      renderCell: (params) => {
        let timestampVal = params.row.timestamp;
        const finalTimeStamp =
          typeof timestampVal === "string" ? timestampVal.slice(0, 16) : "";

        return (
          <ListItem>
            {moment(finalTimeStamp).format("MM-DD-YYYY hh:mm")}
          </ListItem>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Add to Maintenance">
              <MyFixOutline
                onClick={() =>
                  addToMaintenanceTracker(
                    params.row.suite,
                    params.row.testcasename,
                    params.row.env,
                    params.row.failurereason
                  )
                }
              />
            </Tooltip>
            <Tooltip title="Add to Product defect">
              <MyBugOutline
                onClick={() =>
                  addToProductDefectTracker(
                    params.row.suite,
                    params.row.testcasename,
                    params.row.env,
                    params.row.failurereason
                  )
                }
              />
            </Tooltip>
            <Tooltip title="Mark as Intermittent Failure">
              <MyIntermittentOutline
                onClick={() =>
                  intermittentFailure(
                    params.row.suite,
                    params.row.testcasename,
                    params.row.env,
                    "Intermittent Failure"
                  )
                }
              />
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "failureReason",
      headerName: "Failure Reason",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title={params.row.failurereason}>
              <ListItem>{params.row.failurereason}</ListItem>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "executionTime",
      headerName: "Duration",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="in minutes">
              <ListItem>{params.row.duration}</ListItem>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <TheList>
        <div className="daterange">
          <Stack spacing={2} direction="row">
            <TextField
              id="suitename"
              label="Suite Name"
              variant="outlined"
              size="small"
              helperText="Enter Partial suite name"
              onChange={handleSuiteNameChange}
            />
            <TextField
              id="env"
              select
              label="Env"
              value={env}
              onChange={handleEnvChange}
              helperText="Please select env"
              size="small"
            >
              {" "}
              {envs.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="status"
              select
              label="Status"
              value={testcasestatus}
              onChange={handleTestStatusChange}
              helperText="PASS/FAIL/SKIPPED"
              size="small"
            >
              {testStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DateRangeFilter
              onChange={onChange}
              open={open}
              setOpen={setOpen}
              className="size"
            />
            <Button
              id="clearfilter"
              variant="contained"
              color="primary"
              onClick={() => testcasedata()}
              style={{ maxWidth: "140px", maxHeight: "38px" }}
            >
              <strong> Clear Filter</strong>
            </Button>
          </Stack>
        </div>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={50}
          checkboxSelection
          autoHeight={true}
        />
      </TheList>
    </>
  );
};

export default TestExecutions;
