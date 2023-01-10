const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");
const db = require("./queries");
const cors = require("cors");
const { deviceDetails } = require("./DeviceList");

const router = express.Router();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "node.JS, Express and PostGres API" });
});

setInterval(db.pingDevice, 3600000);
//setInterval(db.getDeviceHealth, 1000);

app.post("/getTestCaseExecution", db.getTestCaseExecution);
app.post("/getDefectList", db.getDefectList);
app.post("/getMaintenanceTracker", db.getMaintenanceTracker);
app.delete("/deleteMaintenance", db.deleteMaintenance);
app.delete("/deleteDefect", db.deleteDefect);
app.post("/updateTestCaseFailureReason", db.updateTestCaseFailureReason);
app.post("/getTestHistory", db.getTestHistory);
app.post("/createMaintenance", db.createMaintenance);
app.post("/createDefect", db.createDefect);
app.post("/updateTestCaseExecution", db.updateTestCaseExecution);
app.post(
  "/getTestResultsForGivenDateRange",
  db.getTestResultsForGivenDateRange
);
app.post("/getDailyTestExecutionCount", db.getDailyTestExecutionCount);
app.post("/getSuiteSummary", db.getSuiteSummary);
app.post(
  "/getTestSuiteDataForGivenDateRangeOrRunId",
  db.getTestSuiteDataForGivenDateRangeOrRunId
);
app.post("/getTopFailureReason", db.getTopFailureReason);
app.post(
  "/getTestResultsForGivenDateRangeOrRunId",
  db.getTestResultsForGivenDateRangeOrRunId
);
app.post("/getSuiteRunningStatus", db.getSuiteRunningStatus);
app.post("/updateSuiteRunningStatus", db.updateSuiteRunningStatus);
app.post("/getDeviceHealth", (req, res) => {
  console.log("getDeviceHealth start");
  const arr = Array.from(deviceDetails, ([key, value]) => ({
    ip: key,
    status: value.split("|")[0],
    env: value.split("|")[1],
    devicetype: value.split("|")[2],
    timestamp: value.split("|")[3],
    devicename: value.split("|")[4],
    suitename: value.split("|")[5],
  }));
  res.send(arr);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
