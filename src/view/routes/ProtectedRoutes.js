import React from "react";
import { useLocation } from "react-router-dom";
import { getAuth, getAuthUI } from "../../application/reducers/authSlice";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {
  actions as uiActions,
  ALERT_TYPES,
} from "../../application/reducers/uiSlice";

const ProtectedRoute = ({ guard, component: Component, ...props }) => {
  const auth = useSelector(getAuth);
  // const refreshTokenUi = useSelector(getAuthUI.refreshToken);
  const dispatch = useDispatch();

  // if (refreshTokenUi.loading)
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         width: "100%",
  //         height: "calc(100vh - 80px - 2rem)",
  //       }}
  //     >
  //       <CircularProgress
  //         style={{ margin: "auto" }}
  //         size="2.3rem"
  //         thickness={5}
  //       />
  //     </div>
  //   );

  if (guard && !auth.isAuth) {
    dispatch(
      uiActions.showAlert({
        type: ALERT_TYPES.INFO,
        message: "Please login first to access it.",
      })
    );
    return <Redirect to="/login" />;
  }

  // if (role && role !== auth.role) {
  //   dispatch(
  //     uiActions.showAlert({
  //       type: ALERT_TYPES.INFO,
  //       message: "You cannot access this route.",
  //     })
  //   );
  //   return <Redirect to={"/login"} />;
  // }
  else {
    return (
      <Route exact {...props}>
        <Component />
      </Route>
    );
  }
};

export default ProtectedRoute;
