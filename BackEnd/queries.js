const { response, request } = require("express");

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
  console.log("Inside updateTestCaseExecution start", request.body);
  const {
    suite,
    testcase,
    status,
    env,
    failureCause,
    duration,
    reportpath,
    subscriptionkey,
  } = request.body;
  console.log(
    "suite",
    suite,
    "testcase",
    testcase,
    "status",
    status,
    "env",
    env,
    "failurereason",
    failureCause,
    "duration",
    duration,
    "reportpath",
    reportpath,
    "subscriptionkey",
    subscriptionkey
  );

  pool.query(
    "INSERT INTO testcase(suite, testcasename, status, env, failurereason, duration,reportpath,subscriptionkey) VALUES ($1,$2, $3, $4,$5,$6, $7, $8) Returning *",
    [
      suite,
      testcase,
      status,
      env,
      failureCause,
      duration,
      reportpath,
      subscriptionkey,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
  console.log("Inside updateTestCaseExecution stop");
};

const getTestHistory = (request, response) => {
  console.log("getTestHistory");
  const testcasename = request.params.testcasename.slice(1);
  console.log("testcasename", testcasename);
  let query =
    "select * from testcase where testcasename = '" + testcasename + "'";
  console.log(query);
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createDefect = (request, response) => {
  console.log("createDefect start");
  const { suite, testcase, jirakey, env, failurereason } = request.body;

  pool.query(
    "INSERT INTO defects(suite, testcase, jirakey, env, failurereason) VALUES ($1,$2, $3, $4,$5) Returning *",
    [suite, testcase, jirakey, env, failurereason],
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
  const { suite, testcase, env, failurereason } = request.body;

  pool.query(
    "INSERT INTO maintenance(suite, testcase,  env, failurereason) VALUES ($1,$2, $3, $4) Returning *",
    [suite, testcase, env, failurereason],
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
    [testcasename, failurereason],
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
  const testcasename = request.params.testcasename;

  pool.query(
    "DELETE FROM defects WHERE id = $1",
    [testcasename],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${testcasename}`);
    }
  );
};

const deleteMaintenance = (request, response) => {
  const testcasename = request.params.testcasename;

  pool.query(
    "DELETE FROM maintenance WHERE id = $1",
    [testcasename],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${testcasename}`);
    }
  );
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
};
