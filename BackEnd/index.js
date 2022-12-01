const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");
const db = require("./queries");
const cors = require("cors");
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

app.post("/getTestCaseExecution", db.getTestCaseExecution);
app.post("/getDefectList", db.getDefectList);
app.post("/getMaintenanceTracker", db.getMaintenanceTracker);
app.delete("/deleteMaintenance", db.deleteMaintenance);
app.delete("/deleteDefect", db.deleteDefect);
app.post(
  "/updateTestCaseFailureReason:testcasename",
  db.updateTestCaseFailureReason
);
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

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
