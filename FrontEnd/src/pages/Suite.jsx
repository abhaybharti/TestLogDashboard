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
  Group
} from "@syncfusion/ej2-react-grids";

import { suiteGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import DateRangeFilter from "../components/DateRangeFilter";
import "../App.css";

const Suite = () => {
  const {
    suiteData,
    pass,

    total,

    fail,

    skip,

    maintainance,

    defect,

    openDateRageFilter,
    setOpenDateRageFilter,

    handleRunIdChange,
    getTestCaseData,
    onDateFilterChangeForSuite,
    suiteCount,
  } = useStateContext();

  return (
    <>
      <div className="centerRow">
        {/* <TextField
          id="runid"
          label="Run ID"
          variant="outlined"
          size="small"
          style={{ maxWidth: "250px", maxHeight: "35px" }}
          onChange={handleRunIdChange}
        />
        <TooltipComponent content="Select Date range & get results">
          <DateRangeFilter
            onChange={onDateFilterChangeForSuite}
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
        </TooltipComponent> */}

        <h4
          style={{
            color: "gray",
          }}
        >
          Suite : {suiteCount}
        </h4>
        <h4
          style={{
            color: "gray",
          }}
        >
          Run: {total}
        </h4>
        <h4
          style={{
            color: "green",
          }}
        >
          Pass: {pass}
        </h4>
        <h4
          style={{
            color: "red",
          }}
        >
          Fail: {fail}
        </h4>
        <h4
          style={{
            color: "Violet",
          }}
        >
          Skipped: {skip}
        </h4>
        <h4
          style={{
            color: "IndianRed",
          }}
        >
          Defect: {defect}
        </h4>
        <h4
          style={{
            color: "LightSalmon",
          }}
        >
          Script Issue: {maintainance}
        </h4>
      </div>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Suite Execution Details" />
        <GridComponent
          id="gridcomp"
          dataSource={suiteData}
          allowPaging
          allowSorting
          allowTextWrap
          allowGrouping={true}
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
              Group
            ]}
          />
        </GridComponent>
      </div>
    </>
  );
};

export default Suite;
