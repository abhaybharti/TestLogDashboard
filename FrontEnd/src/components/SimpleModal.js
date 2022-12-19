import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import { useStateContext } from "../contexts/ContextProvider";
import Header from "./Header";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  Edit,
  PdfExport,
  Inject,
  Search,
  Toolbar,
  toolbarClick,
} from "@syncfusion/ej2-react-grids";

import { testcaseHistoryGrid } from "../data/dummy";
import { BASE_API_URL } from "../Utils/Config";

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

const initialState = {
  testHistoryDummy: [{}],
};

export default function SimpleModal(props) {
  console.log("inside SimpleModal");
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [testHistory, setTestHistory] = useState(initialState.testHistoryDummy);

  const { subscriptionkey } = useStateContext();

  const [openSimpleModal, setOpenSimpleModal] = React.useState(false);
  const pageSettings = { pageSize: 10 };
  const handleSimpleModalOpen = () => {
    setOpenSimpleModal(true);
    getTestCaseExecutionHistory(props);
  };
  const handleSimpleModalClose = () => {
    setOpenSimpleModal(false);
  };

  const getTestCaseExecutionHistory = async (props) => {
    //console.log("suite : ", suite, testcasename, env);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suite: props.suite,
          testcasename: props.testcasename,
          env: props.env,
          subscriptionkey: subscriptionkey,
        }),
      };

      const response = await fetch(
        BASE_API_URL + "/getTestHistory",
        requestOptions
      );
      const json = await response.json();
      console.log("json", json);
      setTestHistory(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        variant="contained"
        color="primary"
        onClick={() => handleSimpleModalOpen()}
      >
        {props.testcasename}
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openSimpleModal}
        onClose={handleSimpleModalClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Test Case Execution History</h2>

          <Header title="Test Case Execution History" />
          <GridComponent
            id="gridcomp"
            dataSource={testHistory}
            allowPaging
            allowSorting
            allowTextWrap
            toolbar={["Search", "ExcelExport", "PdfExport"]}
            width="auto"
            pageSettings={pageSettings}
          >
            <ColumnsDirective>
              {testcaseHistoryGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                Edit,
                PdfExport,
              ]}
            />
          </GridComponent>
        </div>
      </Modal>
    </div>
  );
}
