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
import { Tooltip } from "@material-ui/core";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "@material-ui/core/Button";

import moment from "moment";

import { BASE_API_URL } from "../Utils/Config.js";
import SimpleModal from "../components/SimpleModal";
import DateRangeFilter from "../components/DateRangeFilter";
import "../App.css";
import { Stack } from "@mui/material";

const TestExecutions = () => {
  const [data, setData] = useState(productRows);
  const [open, setOpen] = useState(false);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );
  let startDate, endDate;

  const onChange = (ranges) => {
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
    getTestResultsForGivenDateRange(startDate, endDate);
  };

  const testcasedata = async () => {
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
    console.log(startDate, endDate);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
          subscriptionkey: subscriptionkey,
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
            {moment(finalTimeStamp).format("MM-DD-YYYY  hh:mm")}
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
            <DateRangeFilter
              onChange={onChange}
              open={open}
              setOpen={setOpen}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => testcasedata()}
            >
              Clear Filter
            </Button>
          </Stack>
        </div>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={50}
          checkboxSelection
        />
      </TheList>
    </>
  );
};

export default TestExecutions;
