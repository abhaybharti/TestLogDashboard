import React, { useEffect, useState } from "react";

import {
  TheList,
  ListItem,
  MyBugOutline,
  MyFixOutline,
  MyIntermittentOutline,
  MyDeleteOutline,
} from "../styles/styled-element";
import { DataGrid } from "@material-ui/data-grid";
import { productRows } from "../dummyData";
import { Tooltip } from "@material-ui/core";

import { BASE_API_URL } from "../Utils/Config.js";
import ModalDialog from "../components/ModalDialog";

const TestExecutions = () => {
  const [data, setData] = useState(productRows);

  useEffect(() => {
    const testcasedata = async () => {
      try {
        const response = await fetch(BASE_API_URL + "/getTestCaseExecution");
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    testcasedata();
  }, []);

  const addToMaintenanceTracker = (suite, testCaseName, env, failureReason) => {
    console.log(suite, testCaseName, env, failureReason);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suite: suite,
        testcase: testCaseName,
        env: env,
        failurereason: failureReason,
      }),
    };
    fetch(BASE_API_URL + "/createMaintenance", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("successfully added in maintenanceTracker "));
  };

  const addToProductDefectTracker = (
    suite,
    testCaseName,
    env,
    failureReason
  ) => {
    const jirakey = "XIOCloud-123";
    console.log(
      "suite : ",
      suite,
      "testcasname : ",
      testCaseName,
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
        testcase: testCaseName,
        jirakey: jirakey,
        env: env,
        failurereason: failureReason,
      }),
    };
    fetch(BASE_API_URL + "/createDefect", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("successfully added in defectList "));
  };

  const intermittentFailure = (suite, testCaseName, env, failureReason) => {
    console.log(suite, testCaseName, env, failureReason);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suite: suite,
        testcase: testCaseName,
        env: env,
        failurereason: "Intermittent Failure",
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
        return <ListItem>{params.row.suite}</ListItem>;
      },
    },
    {
      field: "testCaseName",
      headerName: "Test Case Name",
      width: 500,
      renderCell: (params) => {
        return (
          <>
            <ListItem cellClick={() => <ModalDialog />}>
              {params.row.testcasename}
            </ListItem>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return <ListItem>{params.row.status}</ListItem>;
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
      width: 145,
      renderCell: (params) => {
        let timestampVal = params.row.timestamp;
        const finalTimeStamp =
          typeof str === "string" ? timestampVal.slice(0, 10) : "";
        return <ListItem>{params.row.timestamp}</ListItem>;
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
        return <ListItem>{params.row.failurereason}</ListItem>;
      },
    },
    {
      field: "executionTime",
      headerName: "Duration",
      width: 140,
      renderCell: (params) => {
        return <ListItem>{params.row.duration}</ListItem>;
      },
    },
  ];

  return (
    <TheList>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={50}
        checkboxSelection
      />
    </TheList>
  );
};

export default TestExecutions;
