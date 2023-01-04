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

import { suiteRunningStatusGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";

import "../App.css";

const SuiteRunningStatus = () => {
  const {
    suiteData,
    pass,

    total,

    fail,

    skip,

    maintainance,

    defect,

    suiteCount,
    suiteRunningStatus,
  } = useStateContext();

  return (
    <>
      <div className="singleRow">
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
          dataSource={suiteRunningStatus}
          allowPaging
          allowSorting
          allowTextWrap
          toolbar={["Search", "ExcelExport", "PdfExport"]}
        >
          <ColumnsDirective>
            {suiteRunningStatusGrid.map((item, index) => (
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

export default SuiteRunningStatus;
