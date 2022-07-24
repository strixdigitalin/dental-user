import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import Navigation from "../component/Navigations";
import Footer from "../component/Footer";
import { NavLink } from "react-router-dom";
import api from "../../infrastructure/utils/axios";
import { useDispatch } from "react-redux";
import {
  actions as uiActions,
  ALERT_TYPES,
} from "../../application/reducers/uiSlice";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

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
const Signup = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    firstName: yup.string().required("Firstname is required"),
    lastName: yup.string().required("Lastname is required"),
    area_of_practise: yup.string().required("Area of practice is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      area_of_practise: "",
      email: "",
      password: "",
      //confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      api
        .post("/auth/register", { ...values })
        .then((res) => {
          if (res.status === 201)
            dispatch(
              uiActions.showAlert({
                type: ALERT_TYPES.INFO,
                message: "Account created successfully. Login Now.",
              })
            );
          setTimeout(() => history.push("/user/subscriptions"), 2000);
        })
        .catch((err) => {
          dispatch(
            uiActions.showAlert({
              type: ALERT_TYPES.INFO,
              message: "Account already exists.",
            })
          );
          console.log(err.response.data);
        });
    },
  });
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
            Create Account in
            <br />
            <span style={{ color: "#E23012" }}>Dental World </span>{" "}
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <img
            src={require("../assets/signupimg.png").default}
            alt=""
            className={classes.img}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Box className={classes.FormContainer}>
            <Typography variant="h5" gutterBottom>
              Welcome to Dental World
            </Typography>
            <Typography variant="h6" gutterBottom>
              Existing User?{" "}
              <NavLink
                to="/login"
                style={{ color: "#E23012", textDecoration: "none" }}
              >
                Log In
              </NavLink>
            </Typography>
            <br />
            <br />
            <form onSubmit={formik.handleSubmit}>
              <Box display="flex" justifyContent="space-between">
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  sx={{ width: "48%" }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  required
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  sx={{ width: "48%" }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  required
                />
              </Box>
              <br />
              <TextField
                id="outlined-basic"
                label="Area of Practice"
                variant="outlined"
                name="area_of_practise"
                onChange={formik.handleChange}
                value={formik.values.area_of_practise}
                sx={{ width: "100%" }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.area_of_practise &&
                  Boolean(formik.errors.area_of_practise)
                }
                helperText={
                  formik.touched.area_of_practise &&
                  formik.errors.area_of_practise
                }
                required
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                sx={{ width: "100%" }}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
              />
              <br />
              <br />
              <Box display="flex" justifyContent="space-between">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  sx={{ width: "100%" }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  required
                />
                {/* <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  name="confirmPassword"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  sx={{ width: "48%" }}
                /> */}
              </Box>
              <br />
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "100%", padding: "15px" }}
              >
                {" "}
                Sign up
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
            </Typography>
            <Container
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

export default Signup;
