// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { makeStyles } from '@mui/styles';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// const useStyles = makeStyles((theme) => ({

// navLinks: {
//     fontFamily: "Montserrat",
//     fontStyle: "normal",
//     fontWeight: "bolder",
//     fontSize: "20px",
//     lineHeight: "24px",
//     color: "#FFFFFF",
//     cursor: 'pointer',
//     "&:hover": {
//         color: "#FFFFFF",
//         borderBottom: '5px solid #ffff',
//     },

// }
// }));

// const Navigation = () => {
//     const classes = useStyles();

//     return (
// <Box sx={{ flexGrow: 1 }}>
//     <AppBar position="static" style={{
//         background: "#F23A5E"
//     }}>
//         <Toolbar>
//             <Box sx={{ flexGrow: 1 }}>
//                 <img src={require("../Assets/dlogo.png").default} alt="" />
//             </Box>
//             <Typography className={classes.navLinks} sx={{ mr: 5 }}><b>Practice</b></Typography>
//             <Typography className={classes.navLinks} sx={{ mr: 5 }}><b>Previous Tests</b></Typography>
//             <Typography className={classes.navLinks} sx={{ mr: 5 }}><b>Test Performance</b></Typography>
//             <Typography className={classes.navLinks} sx={{ mr: 5 }}><b>Topic Performance</b></Typography>
//             <Typography className={classes.navLinks} sx={{ mr: 5 }}><b>Notes</b></Typography>
//         </Toolbar>
//     </AppBar>
// </Box>

//     )
// }

// export default Navigation

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
  Typography,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import logo from "../../assets/logo.png";
// import { Menu as MenuIcon } from "@material-ui/icons";
//   import closeIcon from "../../assets/closeIcon.png";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../application/reducers/authSlice";

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
    width: "90vw",
    height: "100vh",
    background: "#F23A5E",
    position: "relative",
    padding: "10px 0 0 3rem",
  },
  closeIcon: {
    width: "3rem",
    height: "3rem",
    marginLeft: "auto",
    position: "absolute",
    right: "1rem",
    top: "1rem",
    cursor: "pointer",
    color: "#fff",
  },
  navLinks: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bolder",
    fontSize: "20px",
    lineHeight: "24px",
    color: "#FFFFFF",
    cursor: "pointer",
    "&:hover": {
      color: "#FFFFFF",
      borderBottom: "5px solid #ffff",
    },
  },
}));

const CustomNavLink = styled(NavLink)({
  textDecoration: "none",
});

export default function Navigation() {
  const [loginAnchorEl, setLoginAnchorEl] = React.useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const { name } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down(1075));

  const [open, setOpen] = useState(false);
  const handleDrawer = (bool) => () => {
    setOpen(bool);
  };

  const handleMenuLogin = (event) => {
    setLoginAnchorEl(event.currentTarget);
  };

  const handleCloseLogin = () => {
    setLoginAnchorEl(null);
  };

  const styles = {
    navLinks: {
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: "regular",
      fontSize: "15.5px",
      lineHeight: "24px",
      color: "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        color: "#FFFFFF",
        borderBottom: "5px solid #ffff",
      },
    },
  };

  return (
    <>
      <AppBar
        position="static"
        component="header"
        style={{ background: "#F23A5E" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <NavLink to="/">
              <img src={require("../assets/dlogo.png").default} alt="" />
            </NavLink>
          </Box>
          {!isMobile && (
            <Toolbar>
              <CustomNavLink to="/user/dashboard">
                <Typography sx={{ mr: 5, ...styles.navLinks }}>
                  <b>Dashboard</b>
                </Typography>
              </CustomNavLink>
              <CustomNavLink to="/user/practice">
                <Typography sx={{ mr: 5, ...styles.navLinks }}>
                  <b>Practice</b>
                </Typography>
              </CustomNavLink>
              <CustomNavLink to="/user/previous-tests">
                <Typography sx={{ mr: 5, ...styles.navLinks }}>
                  <b>Previous Tests</b>
                </Typography>
              </CustomNavLink>
              {/* <CustomNavLink to="/user/test-performance">
                <Typography sx={{ mr: 5, ...styles.navLinks }}>
                  <b>Test Performance</b>
                </Typography>
              </CustomNavLink> */}
              {/* <CustomNavLink to="/user/topic-performance">
                <Typography sx={{ mr: 5, ...styles.navLinks }}>
                  <b>Topic Performance</b>
                </Typography>
              </CustomNavLink> */}
              {/* <CustomNavLink to="/user/notes">
                <Typography sx={{ mr: 5, ...styles.navLinks }}>
                  <b>Notes</b>
                </Typography>
              </CustomNavLink> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography fontWeight="500">{name}</Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuLogin}
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={loginAnchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(loginAnchorEl)}
                  onClose={handleCloseLogin}
                >
                  {/* <MenuItem onClick={handleCloseLogin}>Profile</MenuItem> */}
                  {/* <MenuItem onClick={() => history.push("/user/subscriptions")}>
                    Subscription
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      handleCloseLogin();
                      dispatch(logout());
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          )}

          {isMobile && (
            <IconButton
              className={classes.hamburger}
              onClick={handleDrawer(true)}
            >
              <MenuIcon style={{ color: "#fff" }} />
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
          <Box>
            <img src={require("../assets/dlogo.png").default} alt="" />
          </Box>
          <Typography className={classes.navLinks} sx={{ mr: 5 }}>
            <b>Practice</b>
          </Typography>
          <Typography className={classes.navLinks} sx={{ mr: 5 }}>
            <b>Previous Tests</b>
          </Typography>
          {/* <Typography className={classes.navLinks} sx={{ mr: 5 }}>
            <b>Test Performance</b>
          </Typography>
          <Typography className={classes.navLinks} sx={{ mr: 5 }}>
            <b>Topic Performance</b>
          </Typography> */}
          {/* <Typography className={classes.navLinks} sx={{ mr: 5 }}>
            <b>Notes</b>
          </Typography> */}
        </Box>
      </Drawer>
    </>
  );
}
