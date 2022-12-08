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

import { getStringCountInArrayOfObjects } from "../Utils/GeneralFunctions";

const TestExecutions = () => {
  const [data, setData] = useState(productRows);
  const [open, setOpen] = useState(false);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );
  const [env, setEnv] = React.useState("");
  const [searchType, setSearchCriteria] = React.useState("");

  const [testcasestatus, setTestStatus] = React.useState("");
  const [suitename, setSuiteName] = React.useState("");

  const [pass, setPass] = useState(0);
  const [total, setTotal] = useState(0);
  const [fail, setFail] = useState(0);
  const [skip, setSkip] = useState(0);
  const [maintainance, setMaintainance] = useState(0);
  const [defect, setDefect] = useState(0);
  const [defectlist, setDefectList] = useState(productRows);
  const [scriptmaintainlist, setScriptMaintainList] = useState(productRows);

  let startDate, endDate;

  const searchCriteria = [
    {
      value: "Equal",
      label: "Equal",
    },
    {
      value: "Contains",
      label: "Contains",
    },
  ];

  const envs = [
    {
      value: "ne1",
      label: "NE1",
    },
    {
      value: "prod",
      label: "PROD",
    },
    {
      value: "preprod",
      label: "PreProd",
    },
    {
      value: "qe",
      label: "QE",
    },
    {
      value: "Mac",
      label: "Mac",
    },
    {
      value: "Windows",
      label: "Windows",
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

  const handleSearchCriteriaChange = (event) => {
    console.log(event.target.value);
    setSearchCriteria(event.target.value);
  };

  const handleEnvChange = (event) => {
    setEnv(event.target.value);
  };

  const handleSuiteNameChange = (event) => {
    console.log(event.target.value);
    setSuiteName(event.target.value);
  };

  const handleTestStatusChange = (event) => {
    setTestStatus(event.target.value);
  };

  const onChange = (ranges) => {
    console.log(
      "selectType",
      searchType,
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
    getTestResultsForGivenDateRange(startDate, endDate);
    getTestTotalPassFailCount();
  };

  function getTestTotalPassFailCount() {
    setPass(getStringCountInArrayOfObjects(data, "status", "PASS"));
    setFail(getStringCountInArrayOfObjects(data, "status", "FAIL"));
    setSkip(getStringCountInArrayOfObjects(data, "status", "SKIPPED"));
    setDefect(getStringCountInArrayOfObjects(data, "status", "defect"));
    setMaintainance(getStringCountInArrayOfObjects(data, "status", "script"));
    setTotal(data.length);
  }

  const testcasedata = async () => {
    setTestStatus("");
    setEnv("");
    setSuiteName("");
    setPass(0);
    setFail(0);
    setSkip(0);
    setTotal(0);
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
      getTestTotalPassFailCount();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    testcasedata();
    getTestTotalPassFailCount();
    defectList();
    scriptMaintainList();
  }, []);

  const getTestResultsForGivenDateRange = async (startDate, endDate) => {
    console.log(startDate, endDate, suitename, env, testcasestatus);
    let query =
      "select * from testcase where timestamp between '" +
      startDate +
      "' and '" +
      endDate +
      "' and subscriptionkey=" +
      subscriptionkey;
    console.log("Initial query", query);

    if (
      typeof suitename !== "undefined" &&
      suitename.length !== 0 &&
      typeof searchType !== "undefined" &&
      searchType.length !== 0 &&
      searchType === "Contains"
    ) {
      query = query + " and suite like '%" + suitename + "%'";
    }

    if (
      typeof suitename !== "undefined" &&
      suitename.length !== 0 &&
      typeof searchType !== "undefined" &&
      searchType.length !== 0 &&
      searchType === "Equal"
    ) {
      query = query + " and suite ='" + suitename + "'";
    }

    if (typeof env !== "undefined" && !env.length == 0) {
      query = query + " and env like '%" + env + "%'";
    }

    if (typeof testcasestatus !== "undefined" && testcasestatus.length !== 0) {
      query = query + " and status ='" + testcasestatus + "'";
    }
    console.log("final query", query);
    try {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
            subscriptionkey: subscriptionkey,
          }),
        };
        const response = await fetch(
          BASE_API_URL + "/getTestResultsForGivenDateRange",
          requestOptions
        );
        const json = await response.json();
        console.log("ApiCall->getApiResponse() end :", json);
        setData(json);
        getTestTotalPassFailCount();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("TestExections->getTestResultsForGivenDateRange() stop");
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

  const defectList = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getDefectList",
        requestOptions
      );
      const json = await response.json();
      setDefectList(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  const scriptMaintainList = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getMaintenanceTracker",
        requestOptions
      );
      const json = await response.json();
      setScriptMaintainList(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  /**
   * UpdateTestCaseStatus is a function that takes a query as a parameter and then makes a POST request
   * to the API endpoint updateTestCaseFailureReason with the query as the body of the request.
   * @param query -
   */
  const updateTestCaseStatus = async (query) => {
    console.log("updateTestCaseStatus() start query : ", query);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/updateTestCaseFailureReason",
        requestOptions
      );
    } catch (error) {
      console.log("error", error);
    }
    console.log("updateTestCaseStatus() end");
  };

  const autoAnalysis = async () => {
    console.log("autoAnalysis start() --");

    /* Updating the status of the test case to defect. */
    defectlist.forEach((defectelement) => {
      for (let key in defectelement) {
        let suite = defectelement["suite"];
        let testcasename = defectelement["testcasename"];
        let env = defectelement["env"];
        let timestamp = defectelement["timestamp"];
        console.log(`${suite} : ${testcasename} : ${env} : ${timestamp}`);
        let query = `update testcase set status='defect' where subscriptionkey=${subscriptionkey} and suite='${suite}' and status='FAIL' and env ='${env}' and testcasename='${testcasename}' and timestamp >='${timestamp}';`;
        updateTestCaseStatus(query);
        query = "";
      }
    });

    /* Updating the status of the test case to 'script' if the test case is failed and the timestamp is
    greater than the timestamp in the scriptmaintainlist. */
    scriptmaintainlist.forEach((scriptelement) => {
      for (let key in scriptelement) {
        let suite = scriptelement["suite"];
        let testcasename = scriptelement["testcasename"];
        let env = scriptelement["env"];
        let timestamp = scriptelement["timestamp"];
        console.log(`${suite} : ${testcasename} : ${env} : ${timestamp}`);
        let query = `update testcase set status='script' where subscriptionkey=${subscriptionkey} and suite='${suite}' and status='FAIL' and env ='${env}' and testcasename='${testcasename}' and timestamp >='${timestamp}';`;
        updateTestCaseStatus(query);
        query = "";
      }
    });
    console.log("autoAnalysis stop() --");
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
        // let istDate = moment(params.row.timestamp).tz("Asia/Kolkata");
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
          <TextField
            id="search"
            select
            label="Select"
            value={searchType}
            onChange={handleSearchCriteriaChange}
            helperText="Contains or Equal"
            size="small"
          >
            {searchCriteria.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

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
            <Tooltip title="Fetch data for last 48 hours duration">
              <Button
                id="clearfilter"
                variant="contained"
                color="primary"
                onClick={() => testcasedata()}
                style={{ maxWidth: "100px", maxHeight: "42px" }}
              >
                <strong> Clear Filter</strong>
              </Button>
            </Tooltip>
            <Button
              id="autoanlysis"
              variant="contained"
              color="primary"
              onClick={() => autoAnalysis()}
              style={{ maxWidth: "120px", maxHeight: "42px" }}
            >
              <strong>Auto Analyze</strong>
            </Button>
            <h5
              style={{
                color: "gray",
              }}
            >
              Total: {total}
            </h5>
            <h5
              style={{
                color: "green",
              }}
            >
              Pass: {pass}
            </h5>
            <h5
              style={{
                color: "red",
              }}
            >
              Fail: {fail}
            </h5>
            <h5
              style={{
                color: "Violet",
              }}
            >
              Skipped: {skip}
            </h5>
            <h5
              style={{
                color: "IndianRed",
              }}
            >
              Defect: {defect}
            </h5>
            <h5
              style={{
                color: "LightSalmon",
              }}
            >
              Script Issue: {maintainance}
            </h5>
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
