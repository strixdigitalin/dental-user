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
import {
  BACKEND_URL,
  CURRENT_QUESTION,
  CURRENT_SELECTED_PACKAGE,
  TOTAL_SELECTED_QUESTION,
} from "../../Constant";
import axios from "axios";
import { headers } from "../../../infrastructure/utils/axios";

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

  // ------------------------------------------------------------------------------------------------------------PACKAGE VARIABLES-------------

  const currQuestion = localStorage.getItem(CURRENT_QUESTION);
  const totalSelecteQuestion = localStorage.getItem(TOTAL_SELECTED_QUESTION);
  const selectedPackage = localStorage.getItem(CURRENT_SELECTED_PACKAGE);

  const [runTime, setRunTime] = useState(0);
  const [formData, setFormData] = useState({
    timeSpent: 0,
    package: selectedPackage,
    mode: "TEST",
    questions_details: [],
    totalQuestion: 0,
    totalIncorrect: 0,
    totalCorrect: 0,
    totalUnanswered: 0,
    totalMarked: 0,
  });

  const [marked, setMarked] = useState(false);
  const [countQuestion, setcountQuestion] = useState(+currQuestion);
  const [onScreenQuestion, setonScreenQuestion] = useState({});
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

  useEffect(async () => {
    if (totalSelecteQuestion >= countQuestion) {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/package-question/user`,
        {},
        {
          params: {
            limit: totalSelecteQuestion,
            page: countQuestion,
            package: selectedPackage,
          },
        }
      );
      setonScreenQuestion(data.data[0]);
      setSelectedOption(null);
      setSelected(null);
    } else {
      alert("submit");
    }
  }, [countQuestion]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setFormData({...formData,})
  //     alert(runTime);

  //     setRunTime(+runTime + 1);
  //   }, 1000);

  //   clearInterval(interval);
  // }, []);
  useEffect(() => {
    console.log(formData, "<<<this is formData");
  }, [formData]);

  const handleNextQuestion = () => {
    console.log(selectedOption, "<<<<");
    const pushTheAns = {
      question: onScreenQuestion.id,
      isUnused: selectedOption != null ? false : true,
      isMarked: selectedOption != null ? true : false,
      isCorrect: selectedOption != null ? selectedOption.isCorrect : null,
      isIncorrect: selectedOption != null ? !selectedOption.isCorrect : null,
      timeSpend: time,
    };

    // ----------
    const totalQuestion = +formData.totalQuestion + 1;
    const timeSpent = +formData.timeSpent + +time;
    const totalIncorrect =
      selectedOption != null
        ? selectedOption.isCorrect
          ? +formData.totalIncorrect
          : formData.totalIncorrect + 1
        : formData.totalIncorrect;
    const totalCorrect =
      selectedOption != null
        ? selectedOption.isCorrect
          ? +formData.totalCorrect + 1
          : formData.totalCorrect
        : formData.totalCorrect;
    const totalUnanswered =
      selectedOption != null
        ? +formData.totalUnanswered
        : +formData.totalUnanswered + +1;
    const totalMarked =
      selectedOption != null
        ? +formData.totalMarked + 1
        : +formData.totalMarked;
    // ----------------------------------------

    setFormData({
      ...formData,
      questions_details: [...formData.questions_details, pushTheAns],
      totalQuestion,
      totalIncorrect,
      totalCorrect,
      totalUnanswered,
      totalMarked,
      timeSpent,
    });

    // setcountQuestion(countQuestion + 1);
  };
  const submitHandler = async () => {
    // dispatch(submitAnswers());
    handleNextQuestion();
    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/package-test-result/add`,
      formData,
      {
        headers: headers(),
      }
    );
    console.log(data, "<<<< after submit test");
  };
  // console.log(onScreenQuestion, "<<<<<get questions");

  // useEffect(() => {
  //   (async () => {
  //     // alert(`quest ${questionCount}`);
  //     let response = await dispatch(fetchQuestions({ page: questionCount }));
  //     console.log(response, "response");
  //     if (
  //       totalQuestion !== null &&
  //       totalQuestion === 0 &&
  //       response?.payload?.data?.count === 0
  //     ) {
  //       history.goBack();
  //       dispatch(
  //         actions.showAlert({
  //           type: ALERT_TYPES.ERROR,
  //           message: "No questions available",
  //         })
  //       );
  //     }
  //   })();
  // }, [questionCount, totalQuestion]);

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
          >{`Question ${countQuestion}.`}</Typography>
          <Typography sx={styles.question}>
            {true ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: onScreenQuestion?.questionTitle,
                }}
              />
            ) : null}
          </Typography>
        </Box>
        <Box sx={styles.subContainer2}>
          {onScreenQuestion != {}
            ? onScreenQuestion?.options?.map((option, index) => (
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

            {/* {isReadyForSubmit ? ( */}
            {totalSelecteQuestion == countQuestion ? (
              <ModifiedButton variant="contained" onClick={submitHandler}>
                Submit
              </ModifiedButton>
            ) : (
              <ModifiedButton
                variant="contained"
                //  onClick={nextHandler}
                onClick={() => {
                  handleNextQuestion();
                  setcountQuestion(countQuestion + 1);
                }}
              >
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
