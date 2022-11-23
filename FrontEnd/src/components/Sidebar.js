import React from "react";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  LocalAtm,
  Assessment,
  Drafts,
  Feedback,
  Forum,
  Work,
  Receipt,
  PieChart,
} from "@material-ui/icons";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;

const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;
const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;
const SidebarTitle = styled.h3`
  font-size: 13px;
  color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
`;

const SidebarListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: rgb(240, 240, 255);
  }
`;
const sharedStyle = css`
  margin-right: 5px;
  font-size: 20px !important;
`;

const MyLineStyle = styled(LineStyle)`
  ${sharedStyle}
`;

const MyTimeline = styled(Timeline)`
  ${sharedStyle}
`;

const MyTrendingUp = styled(TrendingUp)`
  ${sharedStyle}
`;

const MyPermIdentity = styled(PermIdentity)`
  ${sharedStyle}
`;

const MyStorefront = styled(Storefront)`
  ${sharedStyle}
`;
const MyAssessment = styled(Assessment)`
  ${sharedStyle}
`;

const MyLocalAtm = styled(LocalAtm)`
  ${sharedStyle}
`;

const MyDrafts = styled(Drafts)`
  ${sharedStyle}
`;

const MyFeedback = styled(Feedback)`
  ${sharedStyle}
`;

const MyForum = styled(Forum)`
  ${sharedStyle}
`;

const MyWork = styled(Work)`
  ${sharedStyle}
`;

const MyPieChart = styled(PieChart)`
  ${sharedStyle}
`;

const MyReceipt = styled(Receipt)`
  ${sharedStyle}
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
            <Link to="/" className="link">
              <SidebarListItem>
                <MyLineStyle />
                Home
              </SidebarListItem>
            </Link>
            <SidebarListItem>
              <Link to="/defects" className="Link">
                <MyTimeline />
                Defect
              </Link>
            </SidebarListItem>
            <SidebarListItem>
              <Link to="/maintenanceTasks" className="Link">
                <MyTrendingUp />
                Maintenance Tracker
              </Link>
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>QE</SidebarTitle>
          <SidebarList>
            <Link to="/analytics" className="link">
              <SidebarListItem>
                <MyPermIdentity />
                Analytics
              </SidebarListItem>
            </Link>
            <Link to="/testExecution" className="link">
              <SidebarListItem>
                <MyStorefront />
                Test Execution
              </SidebarListItem>
            </Link>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
