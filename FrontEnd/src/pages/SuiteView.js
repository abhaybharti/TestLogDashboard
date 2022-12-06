import React, { useState, useEffect } from "react";
import { suiteViewData } from "../dummyData";
import { BASE_API_URL } from "../Utils/Config";
import {
  TheList,
  ListItem,
  EditButton,
  MyDeleteOutline,
} from "../styles/styled-element";
import { DataGrid } from "@material-ui/data-grid";
import { Stack } from "@mui/material";
import Button from "@material-ui/core/Button";
import { TextField, Tooltip } from "@material-ui/core";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import DateRangeFilter from "../components/DateRangeFilter";
import {
  getStringCountInArrayOfObjects,
  getSumByKey,
} from "../Utils/GeneralFunctions";

const SuiteView = () => {
  const [data, setData] = useState(suiteViewData);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );

  const [open, setOpen] = useState(false);

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

  let startDate, endDate;

  function getTestTotalPassFailCount() {
    setPass(getSumByKey(data, "pass"));
    setFail(getSumByKey(data, "fail"));
    setSkip(getSumByKey(data, "skip"));
    setDefect(getSumByKey(data, "defect"));
    setMaintainance(getSumByKey(data, "maintainance"));
    setTotal(data.length);
  }

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
      "startDate",
      startDate,
      "endDate",
      endDate
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
    getTestSuiteDataForGivenDateRange(startDate, endDate);
  };

  const getTestSuiteData = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getSuiteSummary",
        requestOptions
      );
      const json = await response.json();
      setData(json);
      getTestTotalPassFailCount();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTestSuiteDataForGivenDateRange = async (startDate, endDate) => {
    console.log(
      "SuiteView->getTestSuiteDataForGivenDateRange() start",
      startDate,
      endDate,
      suitename,
      env,
      testcasestatus
    );

    let query = `select row_number() OVER () as id, suite, count(testcasename) as Executed, count(CASE WHEN status = 'PASS' THEN status end) as PASS, count(CASE WHEN status = 'FAIL' THEN status end) as FAIL, count(CASE WHEN status = 'SKIP' THEN status end) as SKIP, count(CASE WHEN status = 'DEFECT' THEN status end) as DEFECT, count(CASE WHEN status = 'MAINTAINANCE' THEN status end) as MAINTAINANCE from testcase where timestamp between '${startDate}' and '${endDate}' and subscriptionkey=${subscriptionkey}`;
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
    query = query + " group by suite";
    console.log("final query", query);
    try {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
          }),
        };
        const response = await fetch(
          BASE_API_URL + "/getTestSuiteDataForGivenDateRange",
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

    console.log("SuiteView->getTestSuiteDataForGivenDateRange() stop");
  };

  useEffect(() => {
    getTestSuiteData();
    getTestTotalPassFailCount();
  }, []);

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

  const columns = [
    {
      field: "suite",
      headerName: "Suite",
      width: 400,
      renderCell: (params) => {
        return (
          <>
            <ListItem>{params.row.suite}</ListItem>
          </>
        );
      },
    },
    {
      field: "executed",
      headerName: "Executed",
      width: 155,

      renderCell: (params) => {
        return (
          <>
            <ListItem>{params.row.executed}</ListItem>
          </>
        );
      },
    },
    {
      field: "pass",
      headerName: "PASS",
      width: 110,

      renderCell: (params) => {
        return (
          <>
            <ListItem>{params.row.pass}</ListItem>
          </>
        );
      },
    },
    {
      field: "fail",
      headerName: "FAIL",
      width: 105,

      renderCell: (params) => {
        return (
          <>
            <ListItem>{params.row.fail}</ListItem>
          </>
        );
      },
    },
    {
      field: "skip",
      headerName: "SKIP",
      width: 105,

      renderCell: (params) => {
        return (
          <>
            <ListItem>{params.row.skip}</ListItem>
          </>
        );
      },
    },
    {
      field: "defect",
      headerName: "Known Defect",
      width: 180,

      renderCell: (params) => {
        return (
          <>
            <ListItem>{params.row.defect}</ListItem>
          </>
        );
      },
    },

    {
      field: "maintainance",
      headerName: "Known Maintenance",
      width: 250,

      renderCell: (params) => {
        return (
          <>
            <ListItem>{params.row.maintainance}</ListItem>
          </>
        );
      },
    },
  ];
  return (
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

          <DateRangeFilter
            onChange={onChange}
            open={open}
            setOpen={setOpen}
            className="size"
          />

          <Tooltip title="Fetch suite view data for last 48 hours duration">
            <Button
              id="clearfilter"
              variant="contained"
              color="primary"
              onClick={() => getTestSuiteData()}
              style={{ maxWidth: "140px", maxHeight: "38px" }}
            >
              <strong> Clear Filter</strong>
            </Button>
          </Tooltip>
          <h5
            style={{
              color: "gray",
            }}
          >
            Suite Count : {total}
          </h5>
          <h5
            style={{
              color: "green",
            }}
          >
            Pass : {pass}
          </h5>
          <h5
            style={{
              color: "red",
            }}
          >
            Fail : {fail}
          </h5>
          <h5
            style={{
              color: "Violet",
            }}
          >
            Skipped : {skip}
          </h5>
          <h5
            style={{
              color: "IndianRed",
            }}
          >
            Defect : {defect}
          </h5>
          <h5
            style={{
              color: "LightSalmon",
            }}
          >
            Script Issue : {maintainance}
          </h5>
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
  );
};

export default SuiteView;
