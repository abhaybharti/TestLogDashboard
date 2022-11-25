import React, { useState, useEffect } from "react";
import {
  TheList,
  ListItem,
  EditButton,
  MyDeleteOutline,
} from "../styles/styled-element";
import { DataGrid } from "@material-ui/data-grid";
import { productRows } from "../dummyData";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../Utils/Config.js";
import { CenterFocusStrong } from "@material-ui/icons";

const MaintenanceTasks = () => {
  const [data, setData] = useState(productRows);

  useEffect(() => {
    const maintenanceList = async () => {
      try {
        const response = await fetch(BASE_API_URL + "/getMaintenanceTracker");
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    maintenanceList();
  }, []);

  const handleDelete = async (suite, testCaseName, env) => {
    console.log(suite, testCaseName, env);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suite: suite,
        testcasename: testCaseName,
        env: env,
      }),
    };

    const response = await fetch(
      BASE_API_URL + "/deleteMaintenance",
      requestOptions
    );
    const json = await response.json();
    console.log("json", json);
    setData(json);
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "suite",
      headerName: "Suite",
      width: 120,
      renderCell: (params) => {
        return <ListItem>{params.row.suite}</ListItem>;
      },
    },

    {
      field: "testcase",
      headerName: "Test Case",
      width: 200,
      renderCell: (params) => {
        return <ListItem>{params.row.testcasename}</ListItem>;
      },
    },
    {
      field: "env",
      headerName: "env",
      width: 160,
      renderCell: (params) => {
        return <ListItem>{params.row.env}</ListItem>;
      },
    },
    {
      field: "Date",
      headerName: "Date",
      width: 120,
      renderCell: (params) => {
        let timestampVal = params.row.timestamp;
        const finalTimeStamp =
          typeof str === "string" ? timestampVal.substring(10) : "";
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
            <MyDeleteOutline
              onClick={() =>
                handleDelete(
                  params.row.suite,
                  params.row.testcasename,
                  params.row.env
                )
              }
            />
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

export default MaintenanceTasks;
