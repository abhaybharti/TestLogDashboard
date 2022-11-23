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
import { API_URL } from "../Utils/Config.js";

const TestExecutions = () => {
  const [data, setData] = useState(productRows);

  useEffect(() => {
    const testcasedata = async () => {
      try {
        const response = await fetch(API_URL + "/getTestCaseExecution");
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    testcasedata();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const addToMaintenanceTracker = (id) => {};

  const addToProductDefectTracker = (id) => {
    //Add code to add test case in defect list
  };

  const intermittentFailure = (id) => {
    //TBD
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "suite",
      headerName: "Suite",
      width: 500,
      renderCell: (params) => {
        return <ListItem>{params.row.suite}</ListItem>;
      },
    },
    {
      field: "testCaseName",
      headerName: "Test Case Name",
      width: 500,
      renderCell: (params) => {
        return <ListItem>{params.row.testcasename}</ListItem>;
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
      field: "failureReason",
      headerName: "Failure Reason",
      width: 160,
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
    {
      field: "Date",
      headerName: "Date",
      width: 120,
      renderCell: (params) => {
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
                onClick={() => addToMaintenanceTracker(params.row.id)}
              />
            </Tooltip>
            <Tooltip title="Add to Product defect">
              <MyBugOutline
                onClick={() => addToProductDefectTracker(params.row.id)}
              />
            </Tooltip>
            <Tooltip title="Mark as Intermittent Failure">
              <MyIntermittentOutline
                onClick={() => intermittentFailure(params.row.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <TheList>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </TheList>
  );
};

export default TestExecutions;
