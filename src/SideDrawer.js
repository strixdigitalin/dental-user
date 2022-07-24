import React from "react";
import { makeStyles, Typography, Box, div } from "@material-ui/core";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
const useStyles = makeStyles((theme) => ({
  SideDrawer: {
    background: "linear-gradient(180deg, #F23861 0%, #F03E4D 100%)",
    width: "20%",
    height: "100vh",
    padding: "20px",
    // "&:hover": {
    //     color: "#D0021B"
    // },
    // [theme.breakpoints.down(500)]: {
    //     width: "100%",
    //     margin: "0 0 10px 0",
    // },
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "27px",
    color: "#FFFFFF",
    borderBottom: "1px solid #EB2751",
    textAlign: "center",
    paddingBottom: "20px",
  },
  button: {
    width: "248px",
    height: "56px",
    background: "#F2395E",
    borderRadius: "20px",
    fontWeight: 500,
    fontSize: "18px",
    color: "#FFFFFF",
    padding: "12px",
    "&:hover": {
      background: "#F2395E",
      boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.25)",
    },
  },
}));
const SideDrawer = () => {
  const classes = useStyles();
  return (
    <>
      <section className={classes.SideDrawer}>
        <Box>
          <Typography className={classes.title}>D - WORLD</Typography>
          <br />
          <br />
          <br />
          <div className={classes.button}>
            <DashboardCustomizeIcon style={{ paddingRight: "5px" }} /> Dashboard
          </div>
          <br />
          <br />
          <br />
          <div className={classes.button}>
            <PersonAddIcon style={{ paddingRight: "5px" }} /> User
          </div>
          <br />
          <br />
          <br />
          <div className={classes.button}>
            <QuestionAnswerIcon style={{ paddingRight: "5px" }} /> Question Bank
          </div>
        </Box>
      </section>
    </>
  );
};

export default SideDrawer;
