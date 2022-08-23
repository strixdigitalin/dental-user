import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CheckCircle,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import UserNavigation from "../../component/UserNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: "50px",
    height: "auto",
  },
  QuestionBox: {
    width: "100%",
    height: "auto",
    background: "#EFF5F8",
  },
  ExplanationBox: {
    width: "100%",
    height: "auto",
    background: "#EFF5F8",
    padding: "20px 0",
  },
  option: {
    "&.MuiButton-root": {
      width: "40%",
      border: "1px solid #F23A5E",
      margin: "20px 0",
    },
  },
}));
const optionItem = [
  {
    title: "Test Created ",
    correct: "correct",
  },
  {
    title: " Test Completed",
  },
  {
    title: "Suspended Test ",
  },
  {
    title: "Suspended Test ",
  },
];

const correctOption = optionItem
  .filter(function (option) {
    return option.correct === "correct";
  })
  .map(function (option) {
    return option.title;
  });
console.log("correct option is:");
// Printing out the  correct option
correctOption.forEach(function (options) {
  console.log(options);
});
const Explanation = () => {
  const _histoty = useHistory();
  const dispatch = useDispatch();
  const [currQuestion, setCurrQuestion] = useState({ index: 0, data: {} });
  const questionDetail = useSelector(
    (state) => state.explanation.questionDetail
  );

  const classes = useStyles();
  useEffect(() => {
    console.log(questionDetail, "<<<");
    setCurrQuestion({
      index: questionDetail?.currQuestion,
      data: questionDetail?.allData[questionDetail.currQuestion],
    });
    // console.log(currQuestion);
  }, []);
  console.log(currQuestion, "<<<curr");
  const hanldeQuestion = (value) => {
    if (value == "for") {
      const newIndex = +currQuestion.index + 1;
      setCurrQuestion({
        index: newIndex,
        data: questionDetail.allData[newIndex],
      });
    }
    if (value == "back") {
      const newIndex = +currQuestion.index - 1;

      setCurrQuestion({
        index: newIndex,
        data: questionDetail.allData[newIndex],
      });
    }
  };
  return (
    <>
      <UserNavigation />
      <Container
        maxWidth="xl"
        style={{ margin: "10px auto" }}
        className={classes.Container}
      >
        <Button
          onClick={() => _histoty.goBack()}
          variant="contained"
          sx={{ position: "fixed", left: 10, top: 75 }}
        >
          Back
        </Button>
        {0 != currQuestion.index && (
          <Button
            onClick={() => hanldeQuestion("back")}
            variant="contained"
            sx={{ position: "fixed", left: 120, top: 75 }}
          >
            Previous
          </Button>
        )}
        {questionDetail.allData.length - 1 != currQuestion.index && (
          <Button
            onClick={() => hanldeQuestion("for")}
            variant="contained"
            sx={{ position: "fixed", right: 10, top: 75 }}
          >
            Forward
          </Button>
        )}
        <Box className={classes.QuestionBox}>
          <Typography
            variant="h5"
            style={{ fontSize: "20px", color: "#535353", padding: "20px" }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: currQuestion?.data?.question?.questionTitle,
              }}
            />
          </Typography>
        </Box>
        <br />
        <br />
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-around" flexWrap="wrap">
            {currQuestion?.data?.question?.options?.map((option, i) => (
              <Button
                style={{ margin: "20px" }}
                className={classes.option}
                variant="contained"
              >
                {option.isCorrect ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#53ff38",
                    }}
                  />
                ) : null}
                <div dangerouslySetInnerHTML={{ __html: option.option }} />
              </Button>
            ))}
          </Box>
        </Container>
        <br />
        <br />
        <Box className={classes.ExplanationBox}>
          {/* <Button
            style={{ background: "#F23A5E", color: "#fff", margin: "10px" }}
            className={classes.option}
            variant="outlined"
          >
            Correct Option Is
          </Button> */}
          <div>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#000000",
                padding: "20px",
              }}
            >
              {currQuestion.data.markedOption != null &&
              currQuestion.data.markedOption != "null"
                ? `You Selected: Option ${+currQuestion.data.markedOption + 1}`
                : "You didn't attempt the question"}
            </Typography>
          </div>
          <div>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#000000",
                padding: "20px",
              }}
            >
              Explanation
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: currQuestion?.data?.question?.explaination,
              }}
            />
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Explanation;
