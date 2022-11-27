const { response, request } = require("express");
require("log-timestamp");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "testloguser",
  host: "localhost",
  database: "testlog",
  password: "testloguser",
  port: 5432,
});

const getTestCaseExecution = (request, response) => {
  console.log("getTestCaseExecution");
  //where order_date > now() - interval '24 hours';
  pool.query(
    `select * from testcase where timestamp > now() - interval '48 hours'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getDefectList = (request, response) => {
  pool.query(`select * from defects`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getMaintenanceTracker = (request, response) => {
  pool.query(`select * from maintenance`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const updateTestCaseExecution = (request, response) => {
  console.log("updateTestCaseExecution start --- ", request.body);
  const {
    suite,
    testcasename,
    status,
    env,
    failurereason,
    duration,
    reportpath,
    subscriptionkey,
  } = request.body;
  console.log(
    "suite",
    suite,
    "testcasename",
    testcasename,
    "status",
    status,
    "env",
    env,
    "failurereason",
    failurereason,
    "duration",
    duration,
    "reportpath",
    reportpath,
    "subscriptionkey",
    subscriptionkey
  );
  try {
    pool.query(
      "INSERT INTO testcase(suite, testcasename, status, env, failurereason, duration,reportpath,subscriptionkey) VALUES ($1,$2, $3, $4,$5,$6, $7, $8) Returning *",
      [
        suite,
        testcasename,
        status,
        env,
        failurereason,
        duration,
        reportpath,
        subscriptionkey,
      ],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          response.status(200).json(results.rows);
        }
      }
    );
  } catch (err) {
    console.log("updateTestCaseExecution error =>", err);
  }
  console.log("Inside updateTestCaseExecution stop");
};

const getTestHistory = (request, response) => {
  console.log("getTestHistory", request.body);
  const { suite, testcasename } = request.body;
  console.log("suite", suite, ", testcasename", testcasename);
  let query =
    "select * from testcase where testcasename = '" +
    testcasename +
    "' and suite='" +
    suite +
    "'";
  console.log(query);
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTestResultsForGivenDateRange = (request, response) => {
  console.log("getTestResultsForGivenDateRange() start ---", request.body);
  const { startDate, endDate } = request.body;
  console.log("startDate", startDate, ", endDate", endDate);
  let query =
    "select * from testcase where timestamp between '" +
    startDate +
    "' and '" +
    endDate +
    "'";
  console.log(query);
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
  console.log("getTestResultsForGivenDateRange() end ---", request.body);
};

const createDefect = (request, response) => {
  console.log("createDefect start");
  const { suite, testcasename, jirakey, env, failurereason } = request.body;

  pool.query(
    "INSERT INTO defects(suite, testcasename, jirakey, env, failurereason) VALUES ($1,$2, $3, $4,$5) Returning *",
    [suite, testcasename, jirakey, env, failurereason],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
  console.log("Inside createDefect stop");
};

const createMaintenance = (request, response) => {
  console.log("createMaintenance start", request.body);
  const { suite, testcasename, env, failurereason } = request.body;

  pool.query(
    "INSERT INTO maintenance(suite, testcasename,  env, failurereason) VALUES ($1,$2, $3, $4) Returning *",
    [suite, testcasename, env, failurereason],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
  console.log("createMaintenance stop");
};

const updateTestCaseFailureReason = (request, response) => {
  const testcasename = request.params.testcasename;
  pool.query(
    "Update testcase set failurereason = $2 where testcasename = $1",
    [testcase, failurereason],
    (error, results) => {
      if (error) {
        throw error;
      }

      response
        .status(200)
        .send(`Test Case failure reason update ${testcasename}`);
    }
  );
};

const deleteDefect = (request, response) => {
  console.log("deleteDefect", request.body);
  const { suite, testcasename, env } = request.body;
  console.log("suite", suite, ", testcase", testcasename, " , env", env);
  let query =
    "DELETE from defects where testcasename = '" +
    testcasename +
    "' and suite='" +
    suite +
    "' and env='" +
    env +
    "'";
  console.log(query);
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const deleteMaintenance = (request, response) => {
  console.log("deleteMaintenance start", request.body);
  const { suite, testcasename, env } = request.body;
  console.log("suite", suite, ", testcase", testcasename, " , env", env);
  let query =
    "DELETE from maintenance where testcasename = '" +
    testcasename +
    "' and suite='" +
    suite +
    "' and env='" +
    env +
    "'";
  console.log(query);
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
  console.log("deleteMaintenance stop");
};

module.exports = {
  getTestCaseExecution,
  getDefectList,
  getMaintenanceTracker,
  deleteMaintenance,
  deleteDefect,
  updateTestCaseFailureReason,
  getTestCaseExecution,
  getTestHistory,
  createMaintenance,
  createDefect,
  updateTestCaseExecution,
  getTestResultsForGivenDateRange,
};
