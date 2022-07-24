import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  hamburger: {
    color: "white",
    marginLeft: "auto",
  },
  sidedrawer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    rowGap: "3rem",
    padding: "2rem",
    width: "70vw",
    height: "100vh",
    // background: "#F23A5E",
    position: "relative",
    // padding: "10px 0 0 3rem",
  },
  closeIcon: {
    width: "3rem",
    height: "3rem",
    marginLeft: "auto",
    position: "absolute",
    right: "1rem",
    top: "1rem",
    cursor: "pointer",
    color: "#F23A5E",
  },
  navLinks: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "15px",
    lineHeight: "18px",
    letterSpacing: "0.05em",
    color: "#0B0E11",
    cursor: "pointer",
    "&:hover": {
      color: "#F23A5E",
      borderBottom: "5px solid #F23A5E",
    },
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const theme = useTheme();
  // const history = useHistory();
  const { isAuth, user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery(theme.breakpoints.down(1075));

  const [open, setOpen] = useState(false);
  const handleDrawer = (bool) => () => {
    setOpen(bool);
  };

  return (
    <>
      <AppBar
        position="static"
        component="header"
        style={{ background: "#fff", boxShadow: "none", padding: "20px" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <img src={require("../assets/logo.png").default} alt="" />
            </NavLink>
          </Box>
          {!isMobile && (
            <Toolbar>
              <NavLink to="/about" style={{ textDecoration: "none" }}>
                <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                  <b>About Dworld</b>
                </Typography>
              </NavLink>
              {/* <NavLink to="/" style={{ textDecoration: "none" }}>
                <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                  <b>Resources</b>
                </Typography>
              </NavLink> */}
              <NavLink to="/contact" style={{ textDecoration: "none" }}>
                <Typography className={classes.navLinks} sx={{ mr: 25 }}>
                  <b>Contact Us</b>
                </Typography>
              </NavLink>
              {isAuth ? (
                <NavLink
                  to="/user/dashboard"
                  style={{ textDecoration: "none" }}
                >
                  <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                    <b>Dashboard</b>
                  </Typography>
                </NavLink>
              ) : (
                <>
                  <NavLink to="/login" style={{ textDecoration: "none" }}>
                    <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                      <b>Log In</b>
                    </Typography>
                  </NavLink>
                  <NavLink to="/signup" style={{ textDecoration: "none" }}>
                    <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                      <b>Sign Up</b>
                    </Typography>
                  </NavLink>
                </>
              )}
            </Toolbar>
          )}

          {isMobile && (
            <IconButton
              className={classes.hamburger}
              onClick={handleDrawer(true)}
            >
              <MenuIcon style={{ color: "#F23A5E" }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        onClose={handleDrawer(false)}
        open={isMobile && open}
      >
        <Box className={classes.sidedrawer}>
          <CloseIcon
            className={classes.closeIcon}
            onClick={handleDrawer(false)}
          />
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleDrawer(false)}
          >
            <img src={require("../assets/logo.png").default} alt="" />
          </NavLink>
          <NavLink
            to="/about"
            style={{ textDecoration: "none" }}
            onClick={handleDrawer(false)}
          >
            <Typography className={classes.navLinks} sx={{ mr: 5 }}>
              <b>About Dworld</b>
            </Typography>
          </NavLink>
          {/* <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleDrawer(false)}
          >
            <Typography className={classes.navLinks} sx={{ mr: 5 }}>
              <b>Resources</b>
            </Typography>
          </NavLink> */}
          <NavLink
            to="/contact"
            style={{ textDecoration: "none" }}
            onClick={handleDrawer(false)}
          >
            <Typography className={classes.navLinks} sx={{ mr: 25 }}>
              <b>Contact Us</b>
            </Typography>
          </NavLink>
          {isAuth ? (
            <NavLink
              to="/user/dashboard"
              style={{ textDecoration: "none" }}
              onClick={handleDrawer(false)}
            >
              <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                <b>Dashboard</b>
              </Typography>
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                style={{ textDecoration: "none" }}
                onClick={handleDrawer(false)}
              >
                <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                  <b>Log In</b>
                </Typography>
              </NavLink>
              <NavLink
                to="/signup"
                style={{ textDecoration: "none" }}
                onClick={handleDrawer(false)}
              >
                <Typography className={classes.navLinks} sx={{ mr: 5 }}>
                  <b>Sign Up</b>
                </Typography>
              </NavLink>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
