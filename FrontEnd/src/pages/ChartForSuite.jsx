import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import "../App.css";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const ChartForSuite = () => {
  const { getSuiteRunningCount, pageSettings } = useStateContext();
  return (
    <div>
      <div className="singleRow">
        <Header title="Suite Execution Live Stats" />
      </div>
      <div className="chartRow">
        <ReactSpeedometer
          maxValue={84}
          value={getSuiteRunningCount("Running", "QE")}
          needleColor="steelblue"
          segmentColors={["#F0F6F0", "#C5DDC5", "#A5C9A5"]}
          valueFormat={"d"}
          currentValueText="QE : ${value}"
        />
        <ReactSpeedometer
          maxValue={231}
          value={getSuiteRunningCount("Running", "PREPROD")}
          needleColor="steelblue"
          segmentColors={["#e6f5ff", "#80ccff", "#1e90ff", "#004d80"]}
          valueFormat={"d"}
          currentValueText="PreProd : ${value}"
        />
        <ReactSpeedometer
          maxValue={52}
          value={getSuiteRunningCount("Running", "PRE")}
          needleColor="steelblue"
          segmentColors={["#e6e6fa"]}
          valueFormat={"d"}
          currentValueText="PreProd CheckList : ${value}"
        />
        <ReactSpeedometer
          maxValue={48}
          value={getSuiteRunningCount("Running", "PRE")}
          needleColor="steelblue"
          segmentColors={["#ffb6c1"]}
          valueFormat={"d"}
          currentValueText="Prod CheckList : ${value}"
        />
      </div>
    </div>
  );
};

export default ChartForSuite;
