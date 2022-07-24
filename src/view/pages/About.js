import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import Pricing from "../component/Pricing";
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
  },
  img: {
    [theme.breakpoints.down(800)]: {
      width: "90%",
    },
  },
}));
const About = () => {
  const classes = useStyles();
  return (
    <>
      <Navigation />
      <Grid container maxWidth="lg" margin="50px auto">
        <Grid item lg={4} md={6} xs={10}>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "56px",
              lineHeight: "66px",
              color: "#0B0E11",
            }}
          >
            About <br />
            <span style={{ color: "#E23012" }}>Dental World </span>{" "}
          </Typography>
        </Grid>
        <Grid item lg={8} md={6} xs={10}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: "#7B7B7B",
              marginBottom: "50px",
            }}
          >
            {/* <b>PATHWAY TO INBDE SUCCESS</b>
            <br />
            Welcome to D-world! A place where we take you to the best
            preparation time for your INBDE examination. D(dental) world is a
            professional and organized way of learning system. Designed to guide
            you through dental knowledge and skills to succeed you as a dental
            practitioner.
            <br />
            <br />
            CHALLENGING QUESTIONS, IN DEPTH EXPLANATIONS, QUIZZES, PERFORMANCE
            TRACKER are some of the exciting features that will take you through
            the learning process at D-World. */}
            Bobprep is a global tutoring business dedicated to help its students
            prepare for various exams abroad. We have various global programs
            that are offered in different countries around the world. We deliver
            our programs in person or on-line with flexible schedules and days.
          </Typography>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", margin: "50px 0" }}>
        <img
          src={require("../assets/aboutimg.png").default}
          alt=""
          className={classes.img}
        />
      </div>
      <Grid container maxWidth="lg" margin="100px auto" alignItems="center">
        <Grid item lg={6} md={6} xs={10}>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "56px",
              lineHeight: "66px",
              color: "#0B0E11",
            }}
          >
            Why Choose us?
          </Typography>
          <br />
          <br />
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: "#7B7B7B",
              marginBottom: "50px",
            }}
          >
            {/* <b>D-WORLD FEATURES</b>
            <br /> <br />
            <li> 2000+ Case Based Questions</li>
            <li> Detailed Rationales for all Questions</li>
            <li> Quizzes</li>
            <li> Performance Tracker</li>
            <br />
            <b>
              {" "}
              CHALLENGING QUESTIONS, IN DEPTH EXPLANATIONS, QUIZZES, PERFORMANCE
              TRACKER{" "}
            </b>
            are some of the exciting features that will take you through the
            learning process at D-World. */}
            Bobprep is a tutoring business committed to your success. Honesty,
            integrity and a customized approach are the foundation of our
            business. We have seen success in helping students obtain their
            goals and understand each student is unique in their own way. Our
            instructors come from a multitude of arenas: Ivy League Schools,
            Medical Professions, Graduate programs and University Faculty. Not
            only are they experienced tutors but many have achieved top scores
            themselves for entrance into their schools of choice. A plethora of
            resources exist for you to be successful – we will help you realize
            how to find them, incorporate them into your study plans and achieve
            your goals! Bobprep offers services in all U.S. states and
            metropolitan cities as well as in countries abroad (India, Dubai,
            Bahrain, Saudi Arabia, Turkey, China). All tutors are extensively
            trained to deliver superior test preparation service and support.
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={10}>
          <img
            src={require("../assets/aboutimg2.png").default}
            alt=""
            className={classes.img}
          />
        </Grid>
      </Grid>
      <Pricing />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default About;
