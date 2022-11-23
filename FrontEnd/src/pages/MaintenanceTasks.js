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

  const handleDelete = (id) => {
    //deleteDefect(data.filter((item) => item.id !== id));
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
        return <ListItem>{params.row.testcase}</ListItem>;
      },
    },
    {
      field: "env",
      headerName: "env Case",
      width: 160,
      renderCell: (params) => {
        return <ListItem>{params.row.env}</ListItem>;
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
      field: "Date",
      headerName: "Date",
      width: 110,
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
            <MyDeleteOutline onClick={() => handleDelete(params.row.id)} />
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

export default MaintenanceTasks;
