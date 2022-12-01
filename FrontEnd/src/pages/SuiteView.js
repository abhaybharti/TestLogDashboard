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

const SuiteView = () => {
  const [data, setData] = useState(suiteViewData);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );

  const testSuiteData = async () => {
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
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    testSuiteData();
  }, []);

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
