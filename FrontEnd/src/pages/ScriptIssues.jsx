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
} from "@syncfusion/ej2-react-grids";

import { contextMenuItems, maintenanceGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";

const ScriptIssues = () => {
  const { scriptIssueData } = useStateContext();
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Script In Maintenance" />
      <GridComponent
        id="gridcomp"
        dataSource={scriptIssueData}
        allowPaging
        allowSorting
        allowTextWrap
      >
        <ColumnsDirective>
          {maintenanceGrid.map((item, index) => (
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
  );
};

export default ScriptIssues;
