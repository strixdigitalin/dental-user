import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Footer: {
    background: "#0B0E11",
    width: "100%",
    height: "auto",
    padding: "30px 0",
    // "&:hover": {
    // },
    [theme.breakpoints.down(500)]: {},
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <section id="Footer" className={classes.Footer}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "space-around", padding: "20px" }}
        >
          <Grid item lg={2} md={6} xs={12}>
            <img src={require("../assets/darklogo.png").default} alt="" />
            <br />
            <br />
            {/* <Typography
              variant="h6"
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "normal" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
              facilisi quis risus egestas ipsum.
            </Typography> */}
          </Grid>
          <Grid item lg={2} md={6} xs={12}>
            <Typography variant="h3" sx={{ fontSize: "22px", color: "#fff" }}>
              Company
            </Typography>
            <br />
            <br />
            <NavLink style={{ textDecoration: "none" }} to="/about">
              <Typography
                variant="h3"
                sx={{ fontSize: "16px", color: "#fff", paddingTop: "10px" }}
              >
                About us
              </Typography>
            </NavLink>
            {/* <Typography
              variant="h3"
              sx={{ fontSize: "16px", color: "#fff", paddingTop: "10px" }}
            >
              Resources
            </Typography> */}
            <NavLink style={{ textDecoration: "none" }} to="/contact">
              <Typography
                variant="h3"
                sx={{ fontSize: "16px", color: "#fff", paddingTop: "10px" }}
              >
                Contact Us
              </Typography>
            </NavLink>
          </Grid>
          <Grid item lg={2} md={6} xs={12}>
            <Typography variant="h3" sx={{ fontSize: "22px", color: "#fff" }}>
              Support
            </Typography>
            <br />
            <br />
            <NavLink to="/privacy-policy" style={{ textDecoration: "none" }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "16px",
                  color: "#fff",
                  paddingTop: "10px",
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </Typography>
            </NavLink>
            <NavLink to="/t&c" style={{ textDecoration: "none" }}>
              <Typography
                variant="h3"
                sx={{ fontSize: "16px", color: "#fff", paddingTop: "10px" }}
              >
                Terms & Condition
              </Typography>
            </NavLink>
          </Grid>
          <Grid item lg={2} md={6} xs={12}>
            <Typography variant="h3" sx={{ fontSize: "22px", color: "#fff" }}>
              Follow Us
            </Typography>
            <br />
            <div>
              <a href="#">
                <img src={require("../assets/Insta.png").default} alt="" />
              </a>
              <a href="#">
                <img
                  src={require("../assets/Facebook.png").default}
                  alt=""
                  style={{ marginLeft: "10px" }}
                />
              </a>
              <a href="#">
                <img
                  src={require("../assets/Twitter.png").default}
                  alt=""
                  style={{ marginLeft: "10px" }}
                />
              </a>
              <a href="#">
                <img
                  src={require("../assets/Skype.png").default}
                  alt=""
                  style={{ marginLeft: "10px" }}
                />
              </a>
            </div>
          </Grid>
        </Grid>
        <Container maxWidth="xl">
          <br />
          <br />
          <hr />
          <br />
          <Typography variant="h6" sx={{ color: "#FFFFFF", fontSize: "16px" }}>
            &#169; Copyright 2021. All Right Reserved By Dental World
          </Typography>
        </Container>
      </section>
    </>
  );
};

export default Footer;
