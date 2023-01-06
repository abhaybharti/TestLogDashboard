import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

import _ from "lodash";
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
import { Header } from "../components";

const DailyTestExecutionCount = () => {
  const primaryxAxis = { valueType: "Category" };
  const primaryyAxis = { valueType: "Value" };
  const legendSettings = { visible: true };
  const marker = { dataLabel: { visible: true } };
  const { dailyTestRunCount } = useStateContext();

  return (
    <div>
      <div className="singleRow">
        <Header title="Test Execution Trend" />
      </div>

      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <ChartComponent
          id="charts"
          primaryXAxis={primaryxAxis}
          legendSettings={legendSettings}
          height="350"
        >
          <Inject
            services={[ColumnSeries, DataLabel, Tooltip, LineSeries, Category]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={_.sortBy(dailyTestRunCount, "executiondate")}
              xName="executiondate"
              yName="testcaseexecuted"
              name="Sales"
              marker={marker}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default DailyTestExecutionCount;
