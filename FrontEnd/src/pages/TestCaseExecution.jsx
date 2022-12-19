import React from "react";
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
import { Input } from "@syncfusion/ej2-inputs";
import { getValue } from "@syncfusion/ej2-base";
import { contextMenuItems, testcasedetailGrid } from "../data/dummy";
import { Header } from "../components";
import { PDFExport } from "@syncfusion/ej2/pivotview";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Button from "@material-ui/core/Button";
import { TextField, Tooltip } from "@material-ui/core";

import DateRangeFilter from "../components/DateRangeFilter";
import "../App.css";

const TestCaseExecution = () => {
  const {
    testCaseData,
    setTestCaseData,
    pass,
    setPass,
    total,
    setTotal,
    fail,
    setFail,
    skip,
    setSkip,
    maintainance,
    setMaintainance,
    defect,
    setDefect,
    defectlist,
    setDefectList,
    scriptmaintainlist,
    setScriptMaintainList,
    openDateRageFilter,
    setOpenDateRageFilter,
    onDateFilterChange,
    handleRunIdChange,
    getTestCaseData,
    failureAnalysis,
  } = useStateContext();
  const pageSettings = { pageSize: 50 };

  function toolbarClick(ClickEventArgs) {
    let grid = document.getElementById("gridcomp");
    grid.excelExport();
  }
  return (
    <>
      <Header title="Test Execution Details" />
      <div className="singleRow">
        <TextField
          id="runid"
          label="Run ID"
          variant="outlined"
          size="small"
          style={{ maxWidth: "250px", maxHeight: "35px" }}
          onChange={handleRunIdChange}
        />
        <DateRangeFilter
          onChange={onDateFilterChange}
          open={openDateRageFilter}
          setOpen={setOpenDateRageFilter}
          className="size"
        />
        <TooltipComponent content="Clear current filter and fetch results test case executed in last 48 hour">
          <Button
            id="clearfilter"
            variant="contained"
            color="primary"
            onClick={getTestCaseData}
            // size="small"
            style={{ maxWidth: "130px", maxHeight: "43px" }}
          >
            Clear Filter
          </Button>
        </TooltipComponent>
        <TooltipComponent content="Change status of scripts like following, known product defect as defect and known script issue as SCRIPT">
          <Button
            id="autoanlysis"
            variant="contained"
            color="secondary"
            // size="small"
            onClick={failureAnalysis}
            style={{ maxWidth: "150px", maxHeight: "43px" }}
          >
            Auto Analyze
          </Button>
        </TooltipComponent>
        <h5
          style={{
            color: "gray",
          }}
        >
          Run: {total}
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
      </div>

      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <GridComponent
          id="gridcomp"
          dataSource={testCaseData}
          allowPaging
          allowSorting={true}
          allowTextWrap
          toolbar={["Search", "ExcelExport", "PdfExport"]}
          width="auto"
          pageSettings={pageSettings}
          allowExcelExport={true}
          toolbarClick={toolbarClick}
        >
          <ColumnsDirective>
            {testcasedetailGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, ExcelExport, PdfExport]} />
        </GridComponent>
      </div>
    </>
  );
};

export default TestCaseExecution;
