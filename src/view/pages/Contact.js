import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Button, TextField, Box, Typography, Alert } from "@mui/material";
import Navigation from "../component/Navigations";
import Footer from "../component/Footer";

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
      width: "70%",
    },
  },
}));
const Contact = () => {
  const classes = useStyles();
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const alertHandler = () => {
    setShowAlert(true);
    setDetails({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      message: "",
    });
    setTimeout(() => setShowAlert(false), 5000);
  };
  const textChangeHandler = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "fname":
        setDetails({ ...details, fname: value });
        break;
      case "lname":
        setDetails({ ...details, lname: value });
        break;
      case "email":
        setDetails({ ...details, email: value });
        break;
      case "phone":
        setDetails({ ...details, phone: value });
        break;
      default:
        setDetails({ ...details, message: value });
    }
  };
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("service_id", "service_1wq5ycq");
    formData.append("template_id", "template_cxvjoce");
    formData.append("user_id", "user_ONQvO1bJoZ5AyLfRNkLys");
    formData.append("site", "Dental");

    Object.keys(details).forEach((item) =>
      formData.append(item, details[item])
    );

    fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
      method: "POST",
      body: formData,
    })
      .then((res) => alertHandler())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navigation />
      <Grid container maxWidth="lg" margin="50px auto" flexWrap="wrap-reverse">
        <Grid item lg={6} md={6} xs={12}>
          {/* <Typography variant="h2" gutterBottom> Contact Us</Typography> */}
          <br />
          <img
            src={require("../assets/contactImg.png").default}
            alt=""
            className={classes.img}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Box className={classes.FormContainer}>
            <Typography variant="h5" gutterBottom>
              {" "}
              <b>Get in Touch</b>
            </Typography>
            <br />
            <br />
            <form>
              <TextField
                id="fname"
                label="First Name"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={textChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="lname"
                label="Last Name"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={textChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={textChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={textChangeHandler}
              />
              <br />
              <br />
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={textChangeHandler}
              />
              <br />
              <br />
              {!showAlert ? (
                <Button
                  variant="contained"
                  sx={{ width: "100%", padding: "15px" }}
                  onClick={submitHandler}
                >
                  {" "}
                  submit
                </Button>
              ) : (
                <Alert variant="filled" severity="success">
                  Submitted !
                </Alert>
              )}
            </form>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Contact;
