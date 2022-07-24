import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import { Formik } from "formik";
import * as yup from "yup";
import Navigation from "../component/Navigations";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { login } from "../../application/reducers/authSlice";
import {
  actions as uiActions,
  ALERT_TYPES,
} from "../../application/reducers/uiSlice";

const useStyles = makeStyles((theme) => ({
  FormContainer: {
    width: "525px",
    height: "auto",
    background: "#FFFFFF",
    boxShadow:
      "0px 50px 100px rgba(0, 0, 0, 0.06), 0px 10px 30px rgba(0, 0, 0, 0.06)",
    borderRadius: "20px",
    padding: "20px",
    [theme.breakpoints.down(800)]: {
      width: "80%",
    },
  },
  img: {
    [theme.breakpoints.down(800)]: {
      width: "80%",
    },
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));
      const { type } = await dispatch(login(values));
      if (type === "auth/login/fulfilled") {
        history.push("/user/dashboard");
      } else if (type === "auth/login/rejected") {
        dispatch(
          uiActions.showAlert({
            type: ALERT_TYPES.INFO,
            message: "Please enter correct credentials.",
          })
        );
      }
    },
  });

  const isAuth = useSelector((state) => state.auth.isAuth);
  useEffect(() => {
    if (isAuth) history.push("/user/dashboard");
  }, [isAuth]);

  return (
    <>
      <Navigation />
      <Grid container maxWidth="lg" margin="50px auto" spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "56px",
              lineHeight: "66px",
              color: "#0B0E11",
            }}
          >
            Log in to <br />
            <span style={{ color: "#E23012" }}>Dental World </span>{" "}
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <img
            src={require("../assets/loginimg.png").default}
            alt=""
            className={classes.img}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Box className={classes.FormContainer}>
            <Typography variant="h5" gutterBottom>
              Welcome back to Dental World
            </Typography>
            <Typography variant="h6" gutterBottom>
              New User?{" "}
              <NavLink
                to="/signup"
                style={{ color: "#E23012", textDecoration: "none" }}
              >
                Create Account
              </NavLink>
            </Typography>
            <br />
            <br />
            {/* formik form */}
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ width: "100%" }}
              />
              <br />
              <br />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ width: "100%" }}
              />
              <br />
              <br />
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "100%", padding: "15px" }}
              >
                Log In
              </Button>
            </form>
            <br />
            {/* <br />
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#7B7B7B",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              or sign up with other accounts
            </Typography> */}
            {/* <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <a href="">
                <img src={require("../assets/google.png").default} alt="" />
              </a>
              <a href="">
                <img
                  src={require("../assets/twitter1 (2).png").default}
                  alt=""
                />
              </a>
              <a href="">
                <img
                  src={require("../assets/twitter1 (1).png").default}
                  alt=""
                />
              </a>
            </Container> */}
            <br />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Login;
