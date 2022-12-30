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
  console.log("getTestCaseExecution start");
  const { subscriptionkey } = request.body;
  //where order_date > now() - interval '24 hours';
  // let queryString =
  //   "select * from testcase where timestamp > now() - interval '48 hours' and subscriptionkey=" +
  //   subscriptionkey +
  //   " order by timestamp desc limit 1";

  let queryString =
    "select * from testcase A INNER JOIN (select testid, max(timestamp) as timestamp from testcase group by testid) B ON  A.timestamp=B.timestamp AND A.testid=B.testid where A.timestamp > now() - interval '48 hours' and subscriptionkey=" +
    subscriptionkey +
    " order by A.timestamp desc;";
  console.log("queryString : ", queryString);
  try {
    pool.query(queryString, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      //console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

const getDefectList = (request, response) => {
  const { subscriptionkey } = request.body;
  try {
    let queryString =
      "select * from defects where subscriptionkey=" + subscriptionkey;
    console.log("queryString", queryString);
    pool.query(queryString, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

const getMaintenanceTracker = (request, response) => {
  const { subscriptionkey } = request.body;
  let queryString =
    "select * from maintenance where subscriptionkey=" + subscriptionkey;
  console.log("queryString : ", queryString);
  try {
    pool.query(queryString, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      //console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTestCaseExecution = (request, response) => {
  console.log("updateTestCaseExecution start --- ", request.body);
  const {
    runid,
    suite,
    testcasename,
    status,
    env,
    failurereason,
    duration,
    reportpath,
    subscriptionkey,
    testid,
  } = request.body;
  console.log(
    "runid",
    runid,
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
    subscriptionkey,
    "testid",
    testid
  );
  try {
    pool.query(
      "INSERT INTO testcase(runid,suite, testcasename, status, env, failurereason, duration,reportpath,subscriptionkey,testid) VALUES ($1,$2, $3, $4,$5,$6, $7, $8,$9,$10) Returning *",
      [
        runid,
        suite,
        testcasename,
        status,
        env,
        failurereason,
        duration,
        reportpath,
        subscriptionkey,
        testid,
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
  const { suite, testcasename, subscriptionkey } = request.body;
  console.log("suite", suite, ", testcasename", testcasename);
  let query = `select * from testcase where testcasename = '${testcasename}' and suite='${suite}' and subscriptionkey=${subscriptionkey} Limit 10`;
  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

const getTestResultsForGivenDateRangeOrRunId = (request, response) => {
  console.log(
    "getTestResultsForGivenDateRangeOrRunId() start ---",
    request.body
  );
  const { query } = request.body;

  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
      //console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("getTestResultsForGivenDateRangeOrRunId() end ---", request.body);
};

const getTestResultsForGivenDateRange = (request, response) => {
  console.log("getTestResultsForGivenDateRange() start ---", request.body);
  const { query, endpoint, subscriptionkey } = request.body;
  console.log(
    "query",
    query,
    ", endpoint",
    endpoint,
    "subscriptionkey",
    subscriptionkey
  );
  // let query =
  //   "select * from testcase where timestamp between '" +
  //   startDate +
  //   "' and '" +
  //   endDate +
  //   "' and subscriptionkey=" +
  //   subscriptionkey;

  // if (typeof suitename !== "undefined" && suitename.length !== 0) {
  //   query = query + " and suite like '%" + suitename + "%'";
  // }
  // if (typeof env !== "undefined" && !env.length == 0) {
  //   query = query + " and env like '%" + env + "%'";
  // }

  // if (typeof status !== "undefined" && status.length !== 0) {
  //   query = query + " and status like '%" + status + "%'";
  // }

  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
      //console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("getTestResultsForGivenDateRange() end ---", request.body);
};

const createDefect = (request, response) => {
  console.log("createDefect start");
  const {
    runid,
    suite,
    testcasename,
    jirakey,
    env,
    failurereason,
    subscriptionkey,
  } = request.body;

  try {
    pool.query(
      "INSERT INTO defects(runid,suite, testcasename, jirakey, env, failurereason,subscriptionkey) VALUES ($1,$2, $3, $4,$5,$6,$7) Returning *",
      [
        runid,
        suite,
        testcasename,
        jirakey,
        env,
        failurereason,
        subscriptionkey,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
  console.log("Inside createDefect stop");
};

const createMaintenance = (request, response) => {
  console.log("createMaintenance start", request.body);
  const { runid, suite, testcasename, env, failurereason, subscriptionkey } =
    request.body;
  let queryString =
    "INSERT INTO maintenance(runid,suite, testcasename,  env, failurereason,subscriptionkey) VALUES ($1,$2, $3, $4,$5,$6) Returning *";
  console.log(queryString);
  try {
    pool.query(
      queryString,
      [runid, suite, testcasename, env, failurereason, subscriptionkey],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
  console.log("createMaintenance stop");
};

/**
 * It updates the failurereason column in the testcase table with the value of the failurereason
 * variable.
 * @param request - The request object represents the HTTP request and has properties for the request
 * query string, parameters, body, HTTP headers, and so on.
 * @param response - The response object represents the HTTP response that an Express app sends when it
 * gets an HTTP request.
 */
const updateTestCaseFailureReason = (request, response) => {
  console.log("updateTestCaseFailureReason() start");
  const { query } = request.body;
  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("updateTestCaseFailureReason() stop");
};

const deleteDefect = (request, response) => {
  console.log("deleteDefect", request.body);
  const { suite, testcasename, env, subscriptionkey } = request.body;
  console.log(
    "suite",
    suite,
    ", testcase",
    testcasename,
    " , env",
    env,
    "subscriptionkey",
    subscriptionkey
  );
  let query =
    "DELETE from defects where testcasename = '" +
    testcasename +
    "' and suite='" +
    suite +
    "' and env='" +
    env +
    "' and subscriptionkey=" +
    subscriptionkey;
  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMaintenance = (request, response) => {
  console.log("deleteMaintenance start", request.body);
  const { suite, testcasename, env, subscriptionkey } = request.body;
  console.log(
    "suite",
    suite,
    ", testcase",
    testcasename,
    " , env",
    env,
    "subscriptionkey",
    subscriptionkey
  );
  let query =
    "DELETE from maintenance where testcasename = '" +
    testcasename +
    "' and suite='" +
    suite +
    "' and env='" +
    env +
    "' and subscriptionkey=" +
    subscriptionkey;
  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
      //console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("deleteMaintenance stop");
};

const getDailyTestExecutionCount = (request, response) => {
  console.log("getDailyTestExecutionCount start", request.body);
  const { subscriptionkey } = request.body;
  console.log("subscriptionkey", subscriptionkey);
  let query = `SELECT executiondate,COUNT(id) AS "testcaseexecuted" FROM testcase where subscriptionkey==${subscriptionkey} GROUP BY executiondate order by executiondate limit 10;`;
  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
      console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("getDailyTestExecutionCount stop");
};

const getSuiteSummary = (request, response) => {
  console.log("getSuiteSummary start", request.body);
  const { subscriptionkey } = request.body;
  console.log("subscriptionkey", subscriptionkey);
  let query = `select row_number() OVER () as id,runid, suite, count(CASE WHEN status = 'PASS' THEN status end) as PASS, count(CASE WHEN status = 'FAIL' THEN status end) as FAIL, count(CASE WHEN status = 'SKIPPED' THEN status end) as SKIP, count(CASE WHEN status = 'defect' THEN status end) as DEFECT, count(CASE WHEN status = 'script' THEN status end) as MAINTAINANCE from testcase where subscriptionkey=${subscriptionkey} and timestamp > now() - interval '48 hours' group by suite,runid;`;
  console.log(query);
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
      //console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("getSuiteSummary stop");
};

const getTestSuiteDataForGivenDateRangeOrRunId = (request, response) => {
  console.log("getTestSuiteDataForGivenDateRangeOrRunId start", request.body);
  const { query, subscriptionkey } = request.body;
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("getTestSuiteDataForGivenDateRangeOrRunId stop");
};

const getTopFailureReason = (request, response) => {
  console.log("getTopFailureReason start", request.body);
  const { query } = request.body;
  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(results.rows);
      //console.log(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
  console.log("getTopFailureReason stop");
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
  getDailyTestExecutionCount,
  getSuiteSummary,
  getTestSuiteDataForGivenDateRangeOrRunId,
  getTopFailureReason,
  getTestResultsForGivenDateRangeOrRunId,
};
