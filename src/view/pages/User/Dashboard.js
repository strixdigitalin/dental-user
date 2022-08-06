import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
//import PieChart from "../../component/PieChart";
import DoughnutChart from "../../component/DoughnutChart";
import UserNavigation from "../../component/UserNavigation";
import UserFooter from "../../component/UserFooter";
import { useState, useEffect } from "react";
import api from "../../../infrastructure/utils/axios";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "50px auto",
    background: "#EFF5F8",
    height: "auto",
    borderRadius: "16px",
    padding: "50px 50px 0 50px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    [theme.breakpoints.down(500)]: {
      width: "80%",
      padding: "10px",
    },
  },
  Textcontainer: {
    maxWidth: "50%",
    [theme.breakpoints.down(500)]: {
      maxWidth: "100%",
      padding: "30px 10px ",
    },
  },
  QuestionCard: {
    border: "1px solid #BABABA",
    boxSizing: "border-box",
    borderRadius: "16px",
    width: "300px",
    height: "auto",
    padding: "30px",
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "&:hover": {
      boxShadow: "0px 14px 16px -8px rgba(208, 2, 27, 0.25)",
    },
  },
  QbankUsage: {
    background: "#FFFFFF",
    border: "1px solid #BABABA",
    boxSizing: "border-box",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px",
    padding: "20px",
    height: "auto",
    width: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down(500)]: {
      width: "100%",
      flexWrap: "wrap",
      margin: "30px auto",
    },
  },
  span: {
    color: "#F23A5E",
    fontSize: "16px",
    background: "#FCC9C9",
    borderRadius: "5px",
    padding: "5px 10px",
    marginLeft: "5px",
  },
  TestCount: {
    width: "400px",
    [theme.breakpoints.down(500)]: {
      width: "100%",
      flexWrap: "wrap",
      margin: "auto",
    },
  },
  piechart: {
    width: "50%",
    [theme.breakpoints.down(500)]: {
      width: "100%",
    },
  },
  scoreContainer: {
    width: "80%",
    margin: "0 auto",
  },
}));

const QuestionCard = (props) => {
  const classes = useStyles();
  const [userData, setUserData] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { userId } = user;

  console.log("userData ", userData);

  useEffect(() => {
    if (userId) {
      api
        .get(`/dashboard/getusedinfo/${userId}`)
        .then((res) => setUserData(res.data.data));
    }
  }, [userId, userData]);

  const QuestionCardItem = [
    {
      heading: "Count Questions ",
      count: userData && userData.question_detail.count,
      // reports: "2.6% then last week ",
    },
    {
      heading: " used Questions",
      count: userData && userData.question_detail.used,
      // reports: "2.6% then last week ",
    },
    // {
    //   // heading: " Unused Questions ",
    //   // count: userData && userData.question_detail.unused,
    //   // count: 1,
    //   // reports: "2.6% then last week ",
    // },
  ];

  console.log("QuestionCardItem :: ", QuestionCardItem);

  return (
    <>
      <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
        {/* {QuestionCardItem.map((item, i) => (
          <div key={i}>
            <Box className={classes.QuestionCard}>
              <div>
                <Typography style={{ color: "#000000", fontSize: "18px" }}>
                  {item.heading}
                </Typography>
                <Typography style={{ color: "#F23A5E", fontSize: "38px" }}>
                  <b>{item.count}</b>
                </Typography>
          
              </div>
              <div>
             
              </div>
            </Box>
          </div>
        ))} */}
      </Box>
    </>
  );
};

const QbankUsageItem = [
  {
    title: "Used Questions",
    object: "used",
  },
  // {
  //   title: "Unused Questions",
  //   object: "unused",
  // },
  {
    title: "Total Questions",
    object: "count",
  },
];
const QbankUsage = ({ questionData }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.QbankUsage} style={{ visibility: "hidden" }}>
        {/* <img src={require("../../assets/percent.png").default} alt="" /> */}
        <div>
          {/* <Typography style={{ color: "#000", fontSize: "26px" }}>
            Q Bank Usage
          </Typography> */}
          <br />
          {questionData &&
            QbankUsageItem.map((item, i) => (
              <div key={i}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Typography
                    style={{
                      color: "#000000",
                      fontSize: "18px",
                      marginRight: "10px",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography className={classes.span}>
                    <b>{questionData[item.object]}</b>
                  </Typography>
                </Box>
                <hr />
              </div>
            ))}
        </div>
      </Box>
    </>
  );
};

const TestCountItem = [
  {
    title: "Test Created ",
    object: "test_created",
  },
  {
    title: " Test Completed",
    object: "test_completed",
  },
  // {
  //   title: "Suspended Test ",
  //   score: "86",
  // },
];
const TestCount = ({ testData }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.QbankUsage} style={{ visibility: "hidden" }}>
        <div>
          <Typography style={{ color: "#000", fontSize: "26px" }}>
            Test Count
          </Typography>
          <br />
          {testData &&
            TestCountItem.map((item, i) => (
              <div key={i} className={classes.TestCount}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{}}
                >
                  <Typography className={classes.span}>
                    <b>{testData[item.object]}</b>
                  </Typography>
                  <Typography style={{ color: "#000000", fontSize: "18px" }}>
                    {item.title}
                  </Typography>
                  <Typography className={classes.span}>
                    <b>{testData[item.object]}</b>
                  </Typography>
                </Box>
                <hr />
              </div>
            ))}
        </div>
      </Box>
    </>
  );
};

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const classes = useStyles();
  const {
    user: { name },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    api
      .get("/dashboard/getusedinfo")
      .then((res) => setDashboardData(res.data.data));
  }, []);

  return (
    <>
      <UserNavigation />
      <section
        className={classes.container}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <Box>
          <img src={require("../../assets/mblgraph.png").default} alt="" />
        </Box>
        <Box className={classes.Textcontainer}>
          <Typography
            variant="h3"
            gutterBottom
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              color: "#000000",
            }}
          >
            Congratulation
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            style={{
              fontWeight: "bold",
              fontSize: "37px",
              color: "#000000",
            }}
          >
            {name}
          </Typography>
          <br />
          <Typography
            variant="h5"
            gutterBottom
            style={{
              fontWeight: 500,
              fontSize: "26px",
              lineHeight: "34px",
              color: "#505050",
            }}
          >
            Your Courses Reached Our Target Milestone
          </Typography>
          <br />
          <Typography
            variant="h6"
            gutterBottom
            style={{
              fontSize: "16px",
              color: "#505050",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aut
            labore sequi vitae dolorem. Maiores expedita fugiat omnis suscipit
            architecto.
          </Typography>
        </Box>
      </section>
      <section style={{ background: "#F7F7F7", padding: "50px 0" }}>
        <QuestionCard />
      </section>

      {/* Score Pannel */}
      {/* <section className={classes.scoreContainer}>
        <br />
        <br />
        <Typography variant="h4" style={{}}>
          Your Score
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "50px 0",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <QbankUsage questionData={dashboardData?.question_detail} />
            <TestCount testData={dashboardData?.test_detail} />
          </Box>
          <Box className={classes.piechart}>
            <PieChart /> 
            <DoughnutChart />
          </Box>
        </Box>
      </section> */}
      <UserFooter />
    </>
  );
};

export default UserDashboard;
