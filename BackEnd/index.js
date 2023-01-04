const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");
const db = require("./queries");
const cors = require("cors");
const router = express.Router();
const ping = require("ping");

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

function pingDevice() {
  var hosts = [
    "10.253.32.192",
    "10.253.32.180",
    "10.253.32.212",
    "10.253.61.29",
  ];
  hosts.forEach(function (host) {
    ping.sys.probe(host, function (isAlive) {
      var msg = isAlive
        ? "host " + host + " is alive"
        : "host " + host + " is dead";
      console.log(msg);
    });
  });
}

// setInterval(pingDevice, 10800000);
// setInterval(pingDevice, 1000);

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

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
