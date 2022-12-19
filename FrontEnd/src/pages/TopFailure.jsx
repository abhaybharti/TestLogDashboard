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

import { topFailureReasonGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";

const TopFailure = () => {
  const { topFailureReason } = useStateContext();
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Top 10 Failures Reason" />
      <GridComponent id="gridcomp" dataSource={topFailureReason} allowTextWrap>
        <ColumnsDirective>
          {topFailureReasonGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort]} />
      </GridComponent>
    </div>
  );
};

export default TopFailure;
