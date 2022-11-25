import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TheList, ListItem } from "../styles/styled-element";
import { DataGrid } from "@material-ui/data-grid";

import Modal from "@material-ui/core/Modal";
import { BASE_API_URL } from "../Utils/Config";
import { testHistoryDummy } from "../dummyData";
import { Tooltip } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "left",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 800,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [testhistory, setTestHistory] = useState(testHistoryDummy);

  const handleOpen = () => {
    setOpen(true);
    getTestCaseExecutionHistory(props);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getTestCaseExecutionHistory = async (props) => {
    //console.log("suite : ", suite, testcasename, env);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suite: props.suite,
        testcasename: props.testcasename,
        env: props.env,
      }),
    };

    const response = await fetch(
      BASE_API_URL + "/getTestHistory",
      requestOptions
    );
    const json = await response.json();
    console.log("json", json);
    setTestHistory(json);
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "suite",
      headerName: "Suite",
      width: 100,
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
      width: 280,
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
      field: "status",
      headerName: "Status",
      width: 125,
      renderCell: (params) => {
        return <ListItem>{params.row.status}</ListItem>;
      },
    },
    {
      field: "env",
      headerName: "Env",
      width: 115,
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
        return <ListItem>{finalTimeStamp}</ListItem>;
      },
    },
  ];

  return (
    <div>
      <div variant="contained" color="primary" onClick={handleOpen}>
        {props.testcasename}
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Test Case Execution History</h2>

          <DataGrid
            rows={testhistory}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
          />
        </div>
      </Modal>
    </div>
  );
}
