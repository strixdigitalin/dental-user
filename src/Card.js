import React from "react";
import { makeStyles, Typography, Box, CardContent } from "@material-ui/core";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
const useStyles = makeStyles((theme) => ({
  card: {
    width: "247px",
    height: "134px",
    background: "linear-gradient(136.2deg, #E24558 3.5%, #FF2D47 81.19%)",
    border: "1px solid #CCCCCC",
    boxShadow: "0px 28px 53px -24px rgba(112, 112, 112, 0.23)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    // "&:hover": {
    //     color: "#D0021B"
    // },
    // [theme.breakpoints.down(500)]: {
    //     width: "100%",
    //     margin: "0 0 10px 0",
    // },
  },
  title: {
    // fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#FFFFFF",
  },
  count: {
    // fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "32px",
    lineHeight: "22px",
    color: "#FFFFFF",
    padding: "10px 30px",
    width: "auto",
    background:
      "linear-gradient(90deg, #FF2D47 28.92%, rgba(255, 45, 71, 0) 104.82%)",
    boxShadow: "inset 4px 0px 88px rgba(0, 0, 0, 0.25)",
    marginLeft: "-15px",
  },
  icon: {
    fontSize: "108px",
  },
}));

const Card = () => {
  const classes = useStyles();
  return (
    <>
      <CardContent className={classes.card}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Typography variant="h6" className={classes.title}>
            Number of users registered
          </Typography>
          <br />
          <Typography variant="h3" className={classes.count}>
            307
          </Typography>
        </Box>
        <Box>
          <SupervisedUserCircleIcon style={{ fontSize: "50px" }} />
        </Box>
      </CardContent>
    </>
  );
};

export default Card;
