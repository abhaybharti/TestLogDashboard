import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import Home from "./Home";
import DefectList from "./DefectList";
import MaintenanceTasks from "./MaintenanceTasks";
import TestExecutions from "./TestExecutions";
import Analytics from "./Analytics";

const LoginPage = () => {
  const [checked, setChecked] = React.useState(true);
  const [loginStatus, setloginStatus] = useState(
    localStorage.getItem("loginStatus")
  );
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
      setloginStatus(true);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("subscriptionkey", "123456");
    } else if (username === "xio@crestron.com" && password === "xio123") {
      console.log("Login Success, loginStatus " + loginStatus);
      setloginStatus(true);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("subscriptionkey", "132456");
    } else {
      setloginStatus(false);
      console.log("login Failed loginStatus " + loginStatus);
    }
  };

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
      <Router>
        <Navbar />
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/defects">
              <DefectList />
            </Route>
            <Route path="/maintenanceTasks">
              <MaintenanceTasks />
            </Route>
            <Route path="/testExecution">
              <TestExecutions />
            </Route>
            <Route path="/analytics">
              <Analytics />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default LoginPage;
