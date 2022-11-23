const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");
const db = require("./queries");
const cors = require("cors");
const router = express.Router();

const app = express();
const port = 3000;

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

app.get("/getTestCaseExecution", db.getTestCaseExecution);
app.get("/getDefectList", db.getDefectList);
app.get("/getMaintenanceTracker", db.getMaintenanceTracker);
app.post("/deleteMaintenance:testcasename", db.deleteMaintenance);
app.post("/deleteDefect:testcasename", db.deleteDefect);
app.post(
  "/updateTestCaseFailureReason:testcasename",
  db.updateTestCaseFailureReason
);
app.get("/getTestHistory/:testcasename", db.getTestHistory);
app.post("/createMaintenance:testcasename", db.createMaintenance);
app.post("/createDefect:testcasename", db.createDefect);
app.post("/updateTestCaseExecution", db.updateTestCaseExecution);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
