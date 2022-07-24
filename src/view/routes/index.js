import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import { Box } from "@mui/material";
import Home from "../pages/Home";
import Dashboard from "../pages/User/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/Privacy-policy";
import TandC from "../pages/TandC";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Practice from "../pages/User/Practice";
import Test from "../pages/User/Test";
import PreviousTest from "../pages/User/PreviousTest";
import TestPerfomance from "../pages/User/TestPerfomance";
import Result from "../pages/User/Result";
import TopicPerformance from "../pages/User/FknTopics";
import Explanation from "../pages/User/Explanation";
import Time from "../pages/Time";
import UiAlert from "../component/UI/UiAlert";
import Subscriptions from "../pages/subscriptions/Subscriptions";

const routes = [
  { path: "/", component: Home, guard: false },
  { path: "/about", component: About, guard: false },
  { path: "/privacy-policy", component: PrivacyPolicy, guard: false },
  { path: "/t&c", component: TandC, guard: false },
  { path: "/contact", component: Contact, guard: false },
  { path: "/login", component: Login, guard: false },
  { path: "/signup", component: SignUp, guard: false },
  { path: "/user/dashboard", component: Dashboard, guard: true },
  { path: "/user/subscriptions", component: Subscriptions, guard: false },
  { path: "/user/practice", component: Practice, guard: true },
  { path: "/user/test", component: Test, guard: true },
  { path: "/user/previous-tests", component: PreviousTest, guard: true },
  { path: "/user/test-performance", component: TestPerfomance, guard: true },
  { path: "/user/result/:id", component: Result, guard: true },
  { path: "/user/topic-performance", component: TopicPerformance, guard: true },
  { path: "/user/explanation", component: Explanation, guard: true },
  { path: "/time", component: Time, guard: false },
];

class Routes extends Component {
  state = { hasError: false, error: "" };

  componentDidCatch(error, info) {
    console.log(info.componentStack);
    this.setState({
      hasError: true,
      error: `TypeError: ${error.message}`,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box width="100vw" height="100vh" display="flex">
          <strong style={{ margin: "auto" }}>"Error!"</strong>
        </Box>
      );
    }

    return (
      <>
        <UiAlert />
        <Switch>
          {routes.map((route) => (
            <ProtectedRoute exact key={route.path} {...route} />
          ))}
          <Route>
            <Box
              width="100vw"
              height="calc(100vh - 6rem)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <strong style={{ fontSize: "1.1rem" }}>404&nbsp;</strong> Page Not
              Found.
            </Box>
          </Route>
        </Switch>
      </>
    );
  }
}

export default Routes;
