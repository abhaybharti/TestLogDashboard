import React from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import Featured from "../components/Featured";
import LgWidget from "../components/LgWidget";
import SmWidget from "../components/SmWidget";
import { userData } from "../dummyData";
import LoginPage from "./LoginPage";

const HomeContainer = styled.div`
  flex: 4;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;
const Home = () => {
  return (
    <HomeContainer>
      <Featured />
      <Chart
        data={userData}
        title="Test Execution Trends"
        grid
        dataKey="Active User"
      />
      <HomeWidgets>
        <SmWidget></SmWidget>
        <LgWidget></LgWidget>
      </HomeWidgets>
    </HomeContainer>
  );
};

export default Home;
