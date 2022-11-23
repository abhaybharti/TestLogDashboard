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
  console.log("Inside updateTestCaseExecution start");
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
  console.log(suite);
  // VALUES("Chrome", "UX_TestCase_Device", "PASS", "QE", "Login failure", "20");
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
  const { testcasename, jirakey } = request.body;
  pool.query(
    "INSERT INTO defects (testcasename, jirakey)  VALUES ($1, $2) RETURNING *",
    [testcasename, jirakey],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`defect added with testcasename : ${results.row[0].id}`);
    }
  );
};

const createMaintenance = (request, response) => {
  const { testcasename } = request.body;
  pool.query(
    "INSERT INTO maintenance (testcasename)  VALUES ($1) RETURNING *",
    [testcasename],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`defect added with testcasename : ${results.row[0].id}`);
    }
  );
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
