import { useEffect, useState } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuestionVisitCount,
  addToResult,
  submitAnswers,
  fetchQuestions,
  setTotalTime,
} from "../../../application/reducers/testSlice";
import QuestionProgress from "../../component/QuestionProgress";
import { Redirect, useHistory } from "react-router-dom";
import {
  actions,
  actions as uiActions,
  ALERT_TYPES,
} from "../../../application/reducers/uiSlice";

const styles = {
  container: {
    height: "82vh",
    width: "100vw",
    position: "fixed",
    top: "10vh",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  navbarContainer: {
    backgroundColor: "primary.main",
    width: "100vw",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
  },
  questionTitle: {
    color: "#000000",
    fontWeight: 600,
    textAlign: "left",
  },
  subContainer1: {
    backgroundColor: "#EFF5F8",
    width: "80%",
    marginTop: "3.5rem",
    padding: "2rem",
    marginBottom: "2.5rem",
  },
  question: {
    color: "#535353",
    fontWeight: 500,
    marginTop: "1rem",
    textAlign: "left",
  },
  subContainer2: {
    display: "grid",
    width: "80%",
    gridTemplate: `"1fr 1fr"
                   "1fr 1fr"
                   "1fr 1fr"`,
    rowGap: "2em",
    columnGap: "2em",
  },
  navlinksContainer: {
    marginRight: "1vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

const ModifiedButton = styled(Button)({
  marginRight: "1rem",
});

function NavBar({ time, mode }) {
  const totalTime = useSelector(
    (state) => state.test.testResult.totalTimeSpend
  );
  return (
    <Box sx={styles.navbarContainer}>
      <Box sx={styles.logoContainer}>
        {/* <img src={Logo} alt="" style={styles.logo} /> */}
      </Box>
      <Box sx={styles.navlinksContainer}>
        {mode === "TEST" ? (
          <>
            <Typography color="white" fontWeight="500">
              Time: {time} Seconds
            </Typography>
            <Typography color="white" fontWeight="500">
              Total Time: {totalTime} Seconds
            </Typography>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

const cancelExam = () => {
  window.location.pathname = "/user/dashboard";
};

export default function LearningMode() {
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const stateValue = useSelector((state) => state);
  console.log(stateValue, "<<<<state");
  const totalQuestion = useSelector((state) => state.test.totalQuestion);
  // console.log(state, "<<<<");
  const [time, setTime] = useState();
  const mode = useSelector((state) => state.test.testResult.mode);
  const displayResult = useSelector((state) => state.test.submittedTest);
  const questionCount = useSelector((state) => state.test.questionVisitCount);
  const question = useSelector((state) => state.test.testQuestion);
  const isReadyForSubmit = useSelector((state) => state.test.isReadyForSubmit);
  const [selectedOption, setSelectedOption] = useState(null);
  // const isMarked = useSelector((state) =>
  //   state.test.testResult.questions_details[questionCount - 1]
  //     ? state.test.testResult.questions_details[questionCount - 1]["isMarked"]
  //     : false
  // );

  const [marked, setMarked] = useState(false);

  const nextHandler = () => {
    setSelected(null);
    console.log(question, "<<<<question");
    const answerData = {
      question: question.id,
      isUnused: selectedOption ? false : true,
      isMarked: marked,
      isCorrect: selectedOption ? selectedOption["isCorrect"] : false,
      isIncorrect: selectedOption ? !selectedOption["isCorrect"] : false,
    };
    mode === "TEST"
      ? dispatch(addToResult({ ...answerData, timeSpend: time }))
      : dispatch(addToResult(answerData));

    console.log(totalQuestion, "<<<<total question");

    dispatch(incrementQuestionVisitCount());
    setSelectedOption(null);
  };

  const submitHandler = async () => {
    dispatch(submitAnswers());
  };

  useEffect(() => {
    (async () => {
      // alert(`quest ${questionCount}`);
      let response = await dispatch(fetchQuestions({ page: questionCount }));
      console.log(response, "response");
      if (
        totalQuestion !== null &&
        totalQuestion === 0 &&
        response?.payload?.data?.count === 0
      ) {
        history.goBack();
        dispatch(
          actions.showAlert({
            type: ALERT_TYPES.ERROR,
            message: "No questions available",
          })
        );
      }
    })();
  }, [questionCount, totalQuestion]);

  useEffect(() => {
    let _time = 0;
    const count = setInterval(() => {
      _time = _time + 1;
      setTime(_time);
      dispatch(setTotalTime());
    }, 1000);
    return () => clearInterval(count);
  }, [questionCount]);

  return (
    <>
      <NavBar time={time} mode={mode} />
      <div style={styles.container}>
        <QuestionProgress />
        <Box sx={styles.subContainer1}>
          <Typography
            sx={styles.questionTitle}
          >{`Question ${questionCount}.`}</Typography>
          <Typography sx={styles.question}>
            {question ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: question["questionTitle"],
                }}
              />
            ) : null}
          </Typography>
        </Box>
        <Box sx={styles.subContainer2}>
          {question
            ? question["options"].map((option, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setSelected(index);
                    setSelectedOption(option);
                  }}
                  variant={selected === index ? "contained" : "outlined"}
                >
                  <div dangerouslySetInnerHTML={{ __html: option["option"] }} />
                </Button>
              ))
            : null}
          <div>
            <ModifiedButton variant="outlined" onClick={cancelExam}>
              Cancel Test
            </ModifiedButton>
            {marked ? (
              <ModifiedButton
                variant="outlined"
                onClick={() => setMarked(false)}
              >
                Unmark
              </ModifiedButton>
            ) : (
              <ModifiedButton
                variant="outlined"
                onClick={() => setMarked(true)}
              >
                Mark
              </ModifiedButton>
            )}

            {isReadyForSubmit ? (
              <ModifiedButton variant="contained" onClick={submitHandler}>
                Submit
              </ModifiedButton>
            ) : (
              <ModifiedButton variant="contained" onClick={nextHandler}>
                Save &amp; Next
              </ModifiedButton>
            )}
          </div>
        </Box>
        {displayResult.show ? (
          <Redirect to={`/user/result/${displayResult.id}`} />
        ) : null}
      </div>
    </>
  );
}
