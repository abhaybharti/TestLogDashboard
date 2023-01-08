import React, { useEffect } from "react";
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
  Group,
} from "@syncfusion/ej2-react-grids";

import { deviceHealthGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";
import ReactSpeedometer from "react-d3-speedometer";
import "../App.css";
import ChartForSuite from "./ChartForSuite";
import ChartForDeviceHealth from "./ChartForDeviceHealth";
import ChartForSimulatorHealth from "./ChartForSimulator";

const SimulatorHealth = () => {
  const { deviceHealth } = useStateContext();
  const pageSettings = { pageSize: 50 };
  console.log("aaaaaaaaaaaaaaa", typeof deviceHealth);

  const tempDeviceHealth = deviceHealth.filter(
    (deviceHealt) => deviceHealt.devicetype === "SIMULATOR"
  );
  return (
    <>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <ChartForSimulatorHealth />
        <GridComponent
          id="gridcomp"
          dataSource={tempDeviceHealth}
          allowPaging
          allowSorting
          allowTextWrap
          pageSettings={pageSettings}
          allowGrouping={true}
          toolbar={["Search", "ExcelExport", "PdfExport"]}
        >
          <ColumnsDirective>
            {deviceHealthGrid.map((item, index) => (
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
              Group,
            ]}
          />
        </GridComponent>
      </div>
    </>
  );
};

export default SimulatorHealth;
