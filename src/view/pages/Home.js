import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid, Container, Typography, Button, Box } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Pricing from "../component/Pricing";
import Navigation from "../component/Navigations";
import Footer from "../component/Footer";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Playfair Display",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "56px",
    lineHeight: "75px",
    textTransform: "capitalize",
    color: "#0B0E11",
    // "&:hover": {
    // },
    // [theme.breakpoints.down(500)]: {
    // },
  },
  Qgrid: {
    textAlign: "center",
    height: "auto",
    [theme.breakpoints.down(800)]: {
      height: "auto",
      padding: "50px 10px",
    },
  },
  img: {
    [theme.breakpoints.down(800)]: {
      width: "80%",
    },
  },
  blobImg: {
    width: "100%",
    marginTop: "-100px",
  },
  button: {
    background: "red",
  },
  flag_container: {
    width: "545px",
    height: "216px",
    background: "#FFF8F9",
    borderRadius: "10px",
    margin: "30px 0",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  Biostatistics: {
    display: "flex",
    margin: "100px 0",
    [theme.breakpoints.down(800)]: {
      flexWrap: "wrap",
    },
  },
  BioImg: {
    [theme.breakpoints.down(800)]: {
      display: "none",
    },
  },
}));
const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Navigation />
      <section
        className="test"
        style={{ width: "80%", margin: "50px auto 100px auto" }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={6} md={6} xs={12}>
            <Typography
              className={classes.title}
              sx={{
                fontFamily: "Playfair Display",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "56px",
                lineHeight: "75px",
                textTransform: "capitalize",
                color: "#0B0E11",
              }}
            >
              Welcome to <span style={{ color: "#E23012" }}>Dental World </span>{" "}
              Preparation with Confidence.
            </Typography>
            <br />
            <br />
            <Box display="flex" alignItems="center">
              <Button
                variant="contained"
                style={{ padding: "10px 30px", background: "#E23012" }}
                onClick={() => history.push("/about")}
              >
                Learn More
              </Button>
              {/* <div style={{ display: "flex", marginLeft: "30px" }}>
                <PlayCircleIcon />
                <Typography>View Demo</Typography>
              </div> */}
            </Box>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <img
              src={require("../assets/home.png").default}
              alt=""
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </section>
      {/* <img src={require("../Assets/Blob.png").default} alt="" className={classes.blobImg} /> */}
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          sx={{ background: "#FCD7C8" }}
          className={classes.Qgrid}
        >
          <img
            src={require("../assets/hardworker.png").default}
            alt=""
            className={classes.img}
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          sx={{ background: "#000" }}
          className={classes.Qgrid}
        >
          <Container>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "38px",
                lineHeight: "137%",
                letterSpacing: "0.05em",
                color: "#FFFFFF",
                margin: "50px 0",
              }}
            >
              PATHWAY TO INBDE SUCCESS
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "154%",
                letterSpacing: "0.05em",
                color: "#F9F9F9",
                margin: "60px 0",
              }}
            >
              Welcome to D-world! A place where we take you to the best
              preparation time for your INBDE examination. D(dental) world is a
              professional and organized way of learning system. Designed to
              guide you through dental knowledge and skills to succeed you as a
              dental practitioner.
              <br />
              CHALLENGING QUESTIONS, IN DEPTH EXPLANATIONS, QUIZZES, PERFORMANCE
              TRACKER are some of the exciting features that will take you
              through the learning process at D-World.
            </Typography>
          </Container>
        </Grid>
      </Grid>
      {/* Key Features  */}
      <Container maxWidth="xl" sx={{ margin: "100px 0" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#000",
          }}
        >
          WHAT IS INBDE?
        </Typography>
        <br />
        <Typography
          variant="body1"
          maxWidth="md"
          textAlign="center"
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            color: "#7B7B7B",
            margin: "0 auto 100px auto",
          }}
        >
          INBDE stands for Integrated National Board Dental Examination. It is
          an integrated exam that merges content from clinical, biomedical, and
          behavioral sciences in its evaluation of candidate dental cognitive
          skills. This exam is to assist state boards of dentistry in evaluating
          candidates for dental licensure. INBDE clinical content areas are
          grouped into three components i.e, Diagnosis and Treatment Planning,
          Oral Health Management and Practice & Profession. The total
          administrative exam time of INBDE exam is 12 hours 30 minutes over a
          period of one and a half day.
        </Typography>
        <div
          className="key-feature"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {/* {new Array(3).fill("").map((_, i) => (
            <Box
              style={{
                textAlign: "center",
                maxWidth: "300px",
                margin: "20px 0",
              }}
            >
              <img
                src={require("../assets/keyfeature (2).png").default}
                alt=""
              />
              <br />
              <br />
              <div>
                <br />
                <Typography
                  variant="body2"
                  sx={{ color: "#7B7B7B", fontSize: "16px" }}
                >
                  Lorem ipsum dolor sit amet, elit. Faucibus neque suscipit
                  pretium lacus aliquam in aenean mauris non.
                </Typography>
              </div>
            </Box>
          ))} */}
        </div>
      </Container>
      {/* Quality Is Our Obsession */}
      <Container maxWidth="xl">
        <Typography
          variant="h1"
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#000",
          }}
        >
          D-WORLD FEATURES
        </Typography>
        <br />
        <Typography
          maxWidth="md"
          variant="body1"
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            color: "#7B7B7B",
            margin: "0 auto 70px auto",
          }}
        >
          CHALLENGING QUESTIONS, IN DEPTH EXPLANATIONS, QUIZZES, PERFORMANCE
          TRACKER are some of the exciting features that will take you through
          the learning process at D-World.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {Features.map((item) => (
            <Box className={classes.flag_container}>
              <div>
                <img
                  src={require("../assets/questionmark (2).png").default}
                  alt=""
                />
              </div>
              <div style={{ maxWidth: "50%" }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#E23012",
                    fontSize: "26px",
                    fontWeight: "bold",
                  }}
                >
                  {item.heading}
                </Typography>
                <br />
              </div>
            </Box>
          ))}
        </div>
      </Container>
      {/* pricing card */}
      <Box style={{ margin: "100px 0" }}>
        <Pricing />
      </Box>
      {/* Why Choose Us? */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "space-around", alignItems: "center" }}
        >
          <Grid item lg={6} md={6} xs={12}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Why Choose Us?
            </Typography>
            <br />
            {/* <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#7B7B7B",
                marginBottom: "70px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography> */}
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {whyChoose.map((h, i) => (
                <Box style={{ maxWidth: "40%" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#E23012",
                      fontSize: "26px",
                      fontWeight: "bold",
                    }}
                  >
                    {h.heading}
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    sx={{ color: "#7B7B7B", fontSize: "16px" }}
                  >
                    {h.text}
                  </Typography>
                  <br />
                  <br />
                </Box>
              ))}
            </div>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            {/* <a
              href=""
              style={{
                textDecoration: "none",
                background: "#E23012",
                padding: "15px",
                color: "#fff",
                position: "absolute",
                right: "130px",
              }}
            >
              Learn More
            </a> */}
            <br />
            <br />
            <br />
            <img
              src={require("../assets/laptop.png").default}
              alt=""
              style={{ width: "100%", marginTop: "50px" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Innovative-Explanations */}
      {/* <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "70px auto",
        }}
      >
        <Box>
          <Typography
            className={classes.title}
            sx={{
              fontFamily: "Playfair Display",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "56px",
              lineHeight: "75px",
              textTransform: "capitalize",
              color: "#0B0E11",
            }}
          >
            Inovative - <span style={{ color: "#E23012" }}>Expansion</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: "#7B7B7B",
              margin: "50px 0",
              maxWidth: "300px",
            }}
          >
            A clear understanding of biostatistics and epidemiology is required
            to critically review research and the medical literature. These
            subjects are tested on the USMLE as well as on in-service and board
            certification exams.
          </Typography>
        </Box>
        <Box>
          <iframe
            style={{ borderRadius: "20px", width: "100%", height: "50vh" }}
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </Box>
      </Container> */}
      <Footer />
    </>
  );
};

export default Home;

const Features = [
  { heading: "2000+ Case Based Questions" },
  { heading: "Detailed Rationales for all Questions" },
  { heading: "Quizzes with content similar to the actual exam" },
  { heading: "Performance Tracker  " },
];

const whyChoose = [
  {
    heading: "TAKE THE EXAM with confidence",
    text: "With questions at or above actual exam standard, be assured you’ll be ready on exam day.",
  },
  {
    heading: "Expert SUBJECT MATTER",
    text: "Our content is developed by passionate and experienced dental educators who are the leaders in training for competitive exams.",
  },
  {
    heading: "CONCEPT building EXPLANATIONS for the quizzes",
    text: "Rationale based explanations for both correct and incorrect answer choices provide an in depth understanding of all tested concepts.",
  },
  {
    heading: "BUILD YOUR OWN",
    text: "Customize and create tests according to your specific needs.",
  },
];
