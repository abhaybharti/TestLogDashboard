import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_API_URL } from "../Utils/Config";
import { getStringCountInArrayOfObjects } from "../Utils/GeneralFunctions";
import moment from "moment";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  subscriptionkey: 132456,
  productRows: [
    // {
    //   id: 1,
    //   testcasename: "validate_UX_Device_level",
    //   img: "https://picsum.photos/200/300/?random=1",
    //   stock: 143,
    //   status: "PASS",
    //   price: "$999.00",
    //   failureReason: "login",
    //   env: "QE",
    // },
  ],
  suiteRows: [{}],
  defectRows: [{}],
  scriptIssueRows: [{}],
  failureReasonRows: [{}],
  testHistoryDummy: [{}],
  dailyTestRunCount: [{}],
  suiteRunningStatus: [{}],
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [testCaseData, setTestCaseData] = useState(initialState.productRows);
  const [openDateRageFilter, setOpenDateRageFilter] = useState(false);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );
  const [loginStatus, setLoginStatus] = useState(false);
  const [suiteData, setSuiteData] = useState(initialState.suiteRows);
  const [suiteCount, setSuiteCount] = useState(0);
  const [defectData, setDefectData] = useState(initialState.defectRows);
  const [scriptIssueData, setScriptIssueData] = useState(
    initialState.scriptIssueRows
  );

  const [checked, setChecked] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [pass, setPass] = useState(0);
  const [total, setTotal] = useState(0);
  const [dailyTestRunCount, setDailyTestRunCount] = useState(
    initialState.dailyTestRunCount
  );
  const [fail, setFail] = useState(0);
  const [skip, setSkip] = useState(0);
  const [maintainance, setMaintainance] = useState(0);
  const [defect, setDefect] = useState(0);
  const [defectlist, setDefectList] = useState(initialState.productRows);
  const [scriptmaintainlist, setScriptMaintainList] = useState(
    initialState.productRows
  );
  const [topFailureReason, setTopFailureReason] = useState(
    initialState.topFailureReason
  );
  const [runid, setRunIdName] = useState("");
  const [testHistory, setTestHistory] = useState(initialState.testHistoryDummy);
  const [suiteRunningStatus, setSuiteRunningStatus] = useState(
    initialState.suiteRunningStatus
  );

  const verifyLoginStatus = () => {
    if (localStorage.getItem("loginStatus") == "true") {
      setLoginStatus(true);
    }
    if (typeof localStorage.getItem("username") !== "undefined") {
      setUserName(localStorage.getItem("username"));
    }
    if (typeof localStorage.getItem("subscriptionkey") !== "undefined") {
      setSubscriptionKey(localStorage.getItem("subscriptionkey"));
    }
  };

  const getDailyTestExecutionCount = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getDailyTestExecutionCount",
        requestOptions
      );
      const json = await response.json();
      setDailyTestRunCount(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSuiteRunningStatus = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getSuiteRunningStatus",
        requestOptions
      );
      const json = await response.json();
      setSuiteRunningStatus(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  function getTestTotalPassFailCount() {
    setPass(getStringCountInArrayOfObjects(testCaseData, "status", "PASS"));
    setFail(getStringCountInArrayOfObjects(testCaseData, "status", "FAIL"));
    setSkip(getStringCountInArrayOfObjects(testCaseData, "status", "SKIPPED"));
    setDefect(getStringCountInArrayOfObjects(testCaseData, "status", "defect"));
    setMaintainance(
      getStringCountInArrayOfObjects(testCaseData, "status", "script")
    );
    setTotal(testCaseData.length);
    setSuiteCount(suiteData.length);
  }

  const LogOut = () => {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("subscriptionkey");
    localStorage.removeItem("username");
    setLoginStatus(false);
    window.location.reload();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const userNameChange = (event) => {
    setUserName(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginClicked = () => {
    console.log("username", username, "password", password);
    if (username === "omni@crestron.com" && password === "omni123") {
      console.log("Login Success, loginStatus " + loginStatus);
      setLoginStatus(true);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("username", username);
      localStorage.setItem("subscriptionkey", "123456");
    } else if (username === "xio@crestron.com" && password === "xio123") {
      console.log("Login Success, loginStatus " + loginStatus);
      setLoginStatus(true);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("username", username);
      localStorage.setItem("subscriptionkey", "132456");
    } else if (username === "raptor@crestron.com" && password === "raptor123") {
      console.log("Login Success, loginStatus " + loginStatus);
      setLoginStatus(true);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("username", username);
      localStorage.setItem("subscriptionkey", "132456");
    } else {
      setLoginStatus(false);
      console.log("login Failed loginStatus " + loginStatus);
    }
  };

  const getTopFailureReason = async () => {
    console.log("getTopFailureReason() start");
    let query = `select failurereason, count(CASE WHEN failurereason <> '' THEN failurereason end) testcasecount from testcase where timestamp > now() - interval '48 hours' and subscriptionkey=${subscriptionkey} group by failurereason having  COUNT(failurereason) >= 1 order by testcasecount desc Limit 5`;
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getTopFailureReason",
        requestOptions
      );
      const json = await response.json();
      setTopFailureReason(json);
    } catch (error) {
      console.log("error", error);
    }
    console.log("getTopFailureReason() end");
  };

  const getTestCaseData = async () => {
    console.log("--- ContextProvider->getTestCaseData() start ---");
    //setTestCaseData(initialState.productRows);
    setRunIdName("");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getTestCaseExecution",
        requestOptions
      );
      const json = await response.json();
      setTestCaseData(json);
    } catch (error) {
      console.log("error", error);
    }
    console.log("--- ContextProvider->getTestCaseData() end---");
  };

  const getMaintenanceList = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getMaintenanceTracker",
        requestOptions
      );
      const json = await response.json();

      setScriptIssueData(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  /**
   * UpdateTestCaseStatus is a function that takes a query as a parameter and then makes a POST request
   * to the API endpoint updateTestCaseFailureReason with the query as the body of the request.
   * @param query -
   */
  const updateTestCaseStatus = async (query) => {
    console.log("updateTestCaseStatus() start query : ", query);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/updateTestCaseFailureReason",
        requestOptions
      );
    } catch (error) {
      console.log("error", error);
    }
    console.log("updateTestCaseStatus() end");
  };

  const failureAnalysis = async () => {
    console.log("autoAnalysis start() --");

    /* Updating the status of the test case to defect. */
    defectlist.forEach((defectelement) => {
      for (let key in defectelement) {
        let suite = defectelement["suite"];
        let testcasename = defectelement["testcasename"];
        let env = defectelement["env"];
        let timestamp = defectelement["timestamp"];
        console.log(`${suite} : ${testcasename} : ${env} : ${timestamp}`);
        let query = `update testcase set status='defect' where subscriptionkey=${subscriptionkey} and suite='${suite}' and status='FAIL' and env ='${env}' and testcasename='${testcasename}' and timestamp >='${timestamp}';`;
        updateTestCaseStatus(query);
        query = "";
      }
    });

    /* Updating the status of the test case to 'script' if the test case is failed and the timestamp is
    greater than the timestamp in the scriptmaintainlist. */
    scriptmaintainlist.forEach((scriptelement) => {
      for (let key in scriptelement) {
        let suite = scriptelement["suite"];
        let testcasename = scriptelement["testcasename"];
        let env = scriptelement["env"];
        let timestamp = scriptelement["timestamp"];
        console.log(`${suite} : ${testcasename} : ${env} : ${timestamp}`);
        let query = `update testcase set status='script' where subscriptionkey=${subscriptionkey} and suite='${suite}' and status='FAIL' and env ='${env}' and testcasename='${testcasename}' and timestamp >='${timestamp}';`;
        updateTestCaseStatus(query);
        query = "";
      }
    });
    console.log("autoAnalysis stop() --");
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  const getDefectList = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getDefectList",
        requestOptions
      );
      const json = await response.json();
      setDefectData(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  const scriptMaintainList = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getMaintenanceTracker",
        requestOptions
      );
      const json = await response.json();
      setScriptMaintainList(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTestSuiteData = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionkey: subscriptionkey,
        }),
      };
      const response = await fetch(
        BASE_API_URL + "/getSuiteSummary",
        requestOptions
      );
      const json = await response.json();
      setSuiteData(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDateFilterChange = (ranges) => {
    let startDate;
    let endDate;
    if (
      moment(ranges.startDate).format("MM-DD-YYYY") !==
      moment(ranges.endDate).format("MM-DD-YYYY")
    ) {
      setOpenDateRageFilter(false);
    } else if (ranges.startDate === "" && ranges.endDate === "") {
      setOpenDateRageFilter(false);
    }
    startDate = moment(ranges.startDate).format("MM-DD-YYYY");
    endDate = moment(ranges.endDate).format("MM-DD-YYYY");
    console.log(startDate, endDate);
    if (endDate === "Invalid date") {
      endDate = startDate;
    }
    getTestResultsForGivenDateRangeOrRunId(startDate, endDate);
    getTestSuiteForGivenDateRangeOrRunId(startDate, endDate);
  };

  const onDateFilterChangeForSuite = (ranges) => {
    let startDate;
    let endDate;
    if (
      moment(ranges.startDate).format("MM-DD-YYYY") !==
      moment(ranges.endDate).format("MM-DD-YYYY")
    ) {
      setOpenDateRageFilter(false);
    } else if (ranges.startDate === "" && ranges.endDate === "") {
      setOpenDateRageFilter(false);
    }
    startDate = moment(ranges.startDate).format("MM-DD-YYYY");
    endDate = moment(ranges.endDate).format("MM-DD-YYYY");
    console.log(startDate, endDate);
    if (endDate === "Invalid date") {
      endDate = startDate;
    }
    getTestSuiteForGivenDateRangeOrRunId(startDate, endDate);
  };

  const handleRunIdChange = (event) => {
    console.log(event.target.value);
    setRunIdName(event.target.value);
  };

  const getTestSuiteForGivenDateRangeOrRunId = async (startDate, endDate) => {
    console.log("TestExections->getTestSuiteForGivenDateRangeOrRunId() start");
    console.log(startDate, endDate);
    let queryPartOne = `select row_number() OVER () as id,runid, suite, count(CASE WHEN status = 'PASS' THEN status end) as PASS, count(CASE WHEN status = 'FAIL' THEN status end) as FAIL, count(CASE WHEN status = 'SKIPPED' THEN status end) as SKIP, count(CASE WHEN status = 'defect' THEN status end) as DEFECT, count(CASE WHEN status = 'script' THEN status end) as MAINTAINANCE from testcase where subscriptionkey=${subscriptionkey}`;
    let queryPartTwo = ` and timestamp > now() - interval '48 hours' group by suite,runid;`;

    if (typeof runid !== "undefined" && runid.length !== 0) {
      queryPartOne = queryPartOne + " and runid ='" + runid + "'";
    }

    let query = queryPartOne + queryPartTwo;

    console.log("final query", query);
    try {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
            subscriptionkey: subscriptionkey,
          }),
        };
        const response = await fetch(
          BASE_API_URL + "/getTestSuiteDataForGivenDateRangeOrRunId",
          requestOptions
        );
        const json = await response.json();
        setSuiteData(json);
        setSuiteCount(suiteData.length);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("TestExections->getTestSuiteForGivenDateRangeOrRunId() stop");
  };

  const getTestResultsForGivenDateRangeOrRunId = async (startDate, endDate) => {
    console.log(startDate, endDate);
    let queryPartOne =
      "select * from testcase A INNER JOIN (select testid, max(timestamp) as timestamp from testcase group by testid) B ON  A.timestamp=B.timestamp AND A.testid=B.testid where A.timestamp between '" +
      startDate +
      "' and '" +
      endDate +
      "' and subscriptionkey=" +
      subscriptionkey;
    let queryPartTwo = " order by A.timestamp desc;";

    if (typeof runid !== "undefined" && runid.length !== 0) {
      queryPartOne = queryPartOne + " and runid ='" + runid + "'";
    }
    let query = queryPartOne + queryPartTwo;
    console.log("final query", query);
    try {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
            subscriptionkey: subscriptionkey,
          }),
        };
        const response = await fetch(
          BASE_API_URL + "/getTestResultsForGivenDateRangeOrRunId",
          requestOptions
        );
        const json = await response.json();
        console.log("ApiCall->getApiResponse() end :", json);
        setTestCaseData(json);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("TestExections->getTestResultsForGivenDateRange() stop");
  };

  useEffect(() => {
    verifyLoginStatus();
    if (loginStatus) {
      getTestCaseData();
      getTestSuiteData();
      getTestTotalPassFailCount();
      getDailyTestExecutionCount();
      getSuiteRunningStatus();
    }
  }, [loginStatus, subscriptionkey]);

  useEffect(() => {
    getMaintenanceList();
    getDefectList();
    scriptMaintainList();
    getTopFailureReason();
    getTestTotalPassFailCount();
  }, [testCaseData]);

  // useEffect(() => {
  //   getMaintenanceList();
  //   getDefectList();
  // }, [defectData, scriptIssueData]);

  return (
    <StateContext.Provider
      value={{
        activeMenu: activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        testCaseData,
        setTestCaseData,
        pass,
        setPass,
        total,
        setTotal,
        skip,
        setSkip,
        fail,
        setFail,
        defect,
        setDefect,
        defectlist,
        setDefectList,
        scriptmaintainlist,
        setScriptMaintainList,
        loginStatus,
        setLoginStatus,
        loginClicked,
        handleChange,
        username,
        userNameChange,
        passwordChange,
        subscriptionkey,
        setSubscriptionKey,
        LogOut,
        checked,
        setChecked,
        maintainance,
        setMaintainance,
        openDateRageFilter,
        setOpenDateRageFilter,
        onDateFilterChange,
        suiteData,
        setSuiteData,
        scriptIssueData,
        setScriptIssueData,
        defectData,
        setDefectData,
        topFailureReason,
        setTopFailureReason,
        handleRunIdChange,
        failureAnalysis,
        suiteCount,
        getTestCaseData,
        testHistory,
        setTestHistory,
        onDateFilterChangeForSuite,
        dailyTestRunCount,
        suiteRunningStatus,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
