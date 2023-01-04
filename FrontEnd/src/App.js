import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  Editor,
  ColorPicker,
  Line,
  Suite,
} from "./pages";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
} from "@material-ui/core";

import { useStateContext } from "./contexts/ContextProvider";

import "./App.css";
import TestCaseExecution from "./pages/TestCaseExecution";
import Home from "./pages/Home";
import Defects from "./pages/Defects";
import ScriptIssues from "./pages/ScriptIssues";
import SuiteRunningStatus from "./pages/SuiteRunningStatus";

const App = () => {
  // const activeMenu = true;
  const {
    activeMenu,
    setActiveMenu,
    loginStatus,
    setLoginStatus,
    userNameChange,
    passwordChange,
    handleChange,
    checked,
    setChecked,
    loginClicked,
  } = useStateContext();

  if (!loginStatus) {
    console.log("login loginStatus " + loginStatus);
    return (
      <div style={{ padding: 30 }}>
        <Paper>
          <Grid
            container
            spacing={3}
            direction={"column"}
            justify-content={"center"}
            alignItems={"center"}
          >
            <Grid item xs={12}>
              <TextField label="Username" onChange={userNameChange}></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={"password"}
                onChange={passwordChange}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    label={"Keep me logged in"}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Keep me logged in"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth onClick={loginClicked}>
                {" "}
                Login{" "}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  } else {
    console.log("login loginStatus " + loginStatus);
    return (
      <div>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                  style={{ background: "blue", borderRadius: "50%" }}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full"
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2"
              }`}
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>

              <div>
                <Routes>
                  /* Dashboard */
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  {/* Pages */}
                  <Route
                    path="/suiterunsummary"
                    element={<SuiteRunningStatus />}
                  />
                  <Route path="/testsuite" element={<Suite />} />
                  <Route path="/testcases" element={<TestCaseExecution />} />
                  <Route path="/defects" element={<Defects />} />
                  <Route path="/scriptissue" element={<ScriptIssues />} />
                  {/* Apps */}
                  <Route path="/Tasks" element={<Kanban />} />
                  <Route path="/schedule" element={<Calendar />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
