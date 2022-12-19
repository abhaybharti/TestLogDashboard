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
} from "@syncfusion/ej2-react-grids";

import { contextMenuItems, suiteGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Button from "@material-ui/core/Button";
import { TextField, Tooltip } from "@material-ui/core";
import DateRangeFilter from "../components/DateRangeFilter";
import "../App.css";

const Suite = () => {
  const {
    suiteData,
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
    suiteCount,
  } = useStateContext();

  return (
    <>
      <div className="singleRow">
        <TextField
          id="runid"
          label="Run ID"
          variant="outlined"
          size="small"
          style={{ maxWidth: "250px", maxHeight: "35px" }}
          onChange={handleRunIdChange}
        />
        <TooltipComponent content="Select Date range & get results">
          <DateRangeFilter
            onChange={onDateFilterChange}
            open={openDateRageFilter}
            setOpen={setOpenDateRageFilter}
            className="size"
          />
        </TooltipComponent>
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

        <h5
          style={{
            color: "gray",
          }}
        >
          Suite : {suiteCount}
        </h5>
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
        <Header title="Suite Execution Details" />
        <GridComponent
          id="gridcomp"
          dataSource={suiteData}
          allowPaging
          allowSorting
          allowTextWrap
          toolbar={["Search", "ExcelExport", "PdfExport"]}
        >
          <ColumnsDirective>
            {suiteGrid.map((item, index) => (
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
              Search,
            ]}
          />
        </GridComponent>
      </div>
    </>
  );
};

export default Suite;
