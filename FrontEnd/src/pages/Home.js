import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import Featured from "../components/Featured";
import LgWidget from "../components/LgWidget";
import SmWidget from "../components/SmWidget";
import { dailyTestExecutionData } from "../dummyData";
import { BASE_API_URL } from "../Utils/Config";

const HomeContainer = styled.div`
  flex: 4;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;
const Home = () => {
  const [data, setData] = useState(dailyTestExecutionData);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );

  useEffect(() => {
    getDailyTestExecutionCount();
  }, []);

  const getDailyTestExecutionCount = async () => {
    console.log("from constant : ", data);
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
      console.log("json", json);

      setData(json);
      console.log("after setData", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <HomeContainer>
      {/* <Featured /> */}
      <Chart
        data={data}
        title="Test Execution Trends"
        grid
        dataKey="TestCaseExecuted"
      />
      <HomeWidgets>
        {/* <SmWidget></SmWidget> */}
        <LgWidget></LgWidget>
      </HomeWidgets>
    </HomeContainer>
    // <HomeContainer>
    //   <Featured />
    //   <Chart
    //     data={data}
    //     title="Test Execution Trends"
    //     grid
    //     dataKey="Test Case Executed"
    //   />
    //   <HomeWidgets>
    //     <SmWidget></SmWidget>
    //     <LgWidget></LgWidget>
    //   </HomeWidgets>
    // </HomeContainer>
  );
};

export default Home;
