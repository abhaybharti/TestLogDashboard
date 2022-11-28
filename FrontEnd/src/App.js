import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SimpleModal from "./components/SimpleModal";
import Analytics from "./pages/Analytics";
import DefectList from "./pages/DefectList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MaintenanceTasks from "./pages/MaintenanceTasks";
import NewDefect from "./pages/NewDefect";
import NewProduct from "./pages/NewProduct";
import NewUser from "./pages/NewUser";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import TestExecutions from "./pages/TestExecutions";
import User from "./pages/User";
import UserList from "./pages/UserList";
import { theme } from "./pages/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>

    // <Router>
    //
    //   <Navbar />
    //   <div className="container">
    //     <Sidebar />
    //     <Switch>
    //       <Route exact path="/">
    //         <Home />
    //       </Route>
    //       <Route path="/defects">
    //         <DefectList />
    //       </Route>
    //       <Route path="/maintenanceTasks">
    //         <MaintenanceTasks />
    //       </Route>
    //       <Route path="/testExecution">
    //         <TestExecutions />
    //       </Route>
    //       <Route path="/analytics">
    //         <Analytics />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;
