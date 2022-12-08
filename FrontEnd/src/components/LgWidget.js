import React, { useState, useEffect } from "react";
import { lastTransactionRows } from "../dummyData";
import styled from "styled-components";
import { BASE_API_URL } from "../Utils/Config";

const LgWidgetContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const LgWidgetTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const LgWidgetButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor || "#ebf1fe"};
  color: ${(props) => props.fdColor || "#2a7ade"};
`;

const LgWidgetTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const LgWidgetTh = styled.th`
  text-align: left;
`;

const LgWidgetUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const LgWidgetImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const LightTd = styled.td`
  font-weight: 300;
`;

const LgWidget = () => {
  const [data, setFailureReason] = useState(lastTransactionRows);
  const [subscriptionkey, setSubscriptionKey] = useState(
    localStorage.getItem("subscriptionkey")
  );

  useEffect(() => {
    getTopFailureReason();
  }, []);

  const getTopFailureReason = async () => {
    console.log("getTopFailureReason() start");
    let query = `select failurereason, count(CASE WHEN failurereason <> '' THEN failurereason end) testcasecount from testcase where timestamp > now() - interval '48 hours' and subscriptionkey=${subscriptionkey} group by failurereason having  COUNT(failurereason) >= 1 order by testcasecount desc `;
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
      setFailureReason(json);
    } catch (error) {
      console.log("error", error);
    }
    console.log("getTopFailureReason() end");
  };

  return (
    <LgWidgetContainer>
      <LgWidgetTitle>Top Failures Reason</LgWidgetTitle>
      <LgWidgetTable>
        <tr>
          <LgWidgetTh>Reason</LgWidgetTh>
          <LgWidgetTh>Test Case Count</LgWidgetTh>
        </tr>
        {data &&
          data.map((item) => (
            <tr key={item.id}>
              <LightTd>{item.failurereason}</LightTd>
              <LightTd>{item.testcasecount}</LightTd>
            </tr>
          ))}
      </LgWidgetTable>
    </LgWidgetContainer>
  );
};

export default LgWidget;
