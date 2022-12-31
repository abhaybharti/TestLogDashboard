import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

const DailyTestExecutionCount = () => {
  const primaryxAxis = { valueType: "Category" };
  const primaryyAxis = { valueType: "Value" };
  const legendSettings = { visible: true };
  const marker = { dataLabel: { visible: true } };
  const { dailyTestRunCount } = useStateContext();

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <ChartComponent
        id="charts"
        primaryXAxis={primaryxAxis}
        legendSettings={legendSettings}
        title="Test Execution Trend"
        height="350"
      >
        <Inject
          services={[ColumnSeries, DataLabel, Tooltip, LineSeries, Category]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={dailyTestRunCount}
            xName="executiondate"
            yName="testcaseexecuted"
            name="Sales"
            marker={marker}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default DailyTestExecutionCount;
