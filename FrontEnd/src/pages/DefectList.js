import React, { useEffect, useState } from "react";
import { TheList, ListItem, MyDeleteOutline } from "../styles/styled-element";
import { DataGrid } from "@material-ui/data-grid";
import { defectList } from "../dummyData";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../Utils/Config.js";
import { Tooltip } from "@material-ui/core";

const DefectList = () => {
  const [data, setData] = useState(defectList);

  useEffect(() => {
    const defectList = async () => {
      try {
        const response = await fetch(BASE_API_URL + "/getDefectList");
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    defectList();
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
      BASE_API_URL + "/deleteDefect",
      requestOptions
    );
    const json = await response.json();
    console.log("json", json);
    setData(json);
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
      field: "testCaseName",
      headerName: "Test Case Name",
      width: 500,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title={params.row.testcasename}>
              <ListItem>{params.row.testcasename}</ListItem>
            </Tooltip>
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
      width: 120,
      renderCell: (params) => {
        return <ListItem>{params.row.timestamp.substring(0, 10)}</ListItem>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Delete defect">
              <MyDeleteOutline
                onClick={() =>
                  handleDelete(
                    params.row.suite,
                    params.row.testcasename,
                    params.row.env
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
      width: 400,
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

export default DefectList;
