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
        <Header title="Running Suite Info" />
      </div>
      <div className="chartRow">
        <ReactSpeedometer
          maxValue={84}
          value={getSuiteRunningCount("Running", "QE")}
          needleColor="steelblue"
          segmentColors={["#8fbc8f"]}
          valueFormat={"d"}
          currentValueText="QE : ${value}"
        />
        <ReactSpeedometer
          maxValue={231}
          value={getSuiteRunningCount("Running", "PRE")}
          needleColor="steelblue"
          segmentColors={["#1e90ff"]}
          valueFormat={"d"}
          currentValueText="PreProd : ${value}"
        />
        <ReactSpeedometer
          maxValue={231}
          value={getSuiteRunningCount("Running", "PRE")}
          needleColor="steelblue"
          segmentColors={["#e6e6fa"]}
          valueFormat={"d"}
          currentValueText="PreProd CheckList : ${value}"
        />
        <ReactSpeedometer
          maxValue={231}
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
