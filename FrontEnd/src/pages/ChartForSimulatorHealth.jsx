import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import "../App.css";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const ChartForSimulatorHealth = () => {
  const { getDeviceHealthCount, pageSettings } = useStateContext();
  return (
    <div>
      <div className="singleRow">
        <Header title="Simulator Health" />
      </div>
      <div className="chartRow">
        <ReactSpeedometer
          maxValue={20}
          value={getDeviceHealthCount("ONLINE", "QE", "SIMULATOR")}
          needleColor="steelblue"
          segmentColors={["#8fbc8f"]}
          valueFormat={"d"}
          currentValueText="QE : ${value}"
        />
        <ReactSpeedometer
          maxValue={20}
          value={getDeviceHealthCount("ONLINE", "PREPROD", "SIMULATOR")}
          needleColor="steelblue"
          segmentColors={["#1e90ff"]}
          valueFormat={"d"}
          currentValueText="PreProd : ${value}"
        />
        <ReactSpeedometer
          maxValue={20}
          value={getDeviceHealthCount("ONLINE", "PROD", "SIMULATOR")}
          needleColor="steelblue"
          segmentColors={["#e6e6fa"]}
          valueFormat={"d"}
          currentValueText="Prod : ${value}"
        />
      </div>
    </div>
  );
};

export default ChartForSimulatorHealth;
