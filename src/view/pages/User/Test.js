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
  GENERATED_TEST_ID,
  TOTAL_SELECTED_QUESTION,
} from "../../Constant";
import axios from "axios";
import { headers } from "../../../infrastructure/utils/axios";
import PracticeTime from "../../component/PracticeTime";

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
    overflowY: "scroll",
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
  const [AnsweredQuestion, setAnsweredQuestion] = useState([]);
  // console.log(state, "<<<<");
  const [time, setTime] = useState();
  const [testTime, setTestTime] = useState(0);
  const [endTestTime, setEndTestTime] = useState(0);
  const [startTimer, setstartTimer] = useState(false);
  const mode = useSelector((state) => state.test.testResult.mode);
  const displayResult = useSelector((state) => state.test.submittedTest);
  const [saveQuestionDetails, setsaveQuestionDetails] = useState([]);
  const questionCount = useSelector((state) => state.test.questionVisitCount);
  const question = useSelector((state) => state.test.testQuestion);
  const isReadyForSubmit = useSelector((state) => state.test.isReadyForSubmit);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastQues, setLastQues] = useState(false);
  const [previousSavedAnswer, setPreviousSavedAnswer] = useState({});
  // const isMarked = useSelector((state) =>
  //   state.test.testResult.questions_details[questionCount - 1]
  //     ? state.test.testResult.questions_details[questionCount - 1]["isMarked"]
  //     : false
  // );

  // ------------------------------------------------------------------------------------------------------------PACKAGE VARIABLES-------------

  const currQuestion = localStorage.getItem(CURRENT_QUESTION);
  const totalSelecteQuestion = localStorage.getItem(TOTAL_SELECTED_QUESTION);
  const selectedPackage = localStorage.getItem(CURRENT_SELECTED_PACKAGE);

  const [practiceTime, setPracticeTime] = useState("0:0:0");

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
  const [testMode, setTestMode] = useState(null);
  function disableBackButton() {
    window.history.forward();
  }

  useEffect(async () => {
    disableBackButton();
    setTimeout("disableBackButton()", 0);
    if (totalSelecteQuestion >= countQuestion) {
      localStorage.setItem(CURRENT_QUESTION, countQuestion);
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

      setstartTimer(true);
      setonScreenQuestion(data.data[0]);
      setSelectedOption(null);
      setSelected(null);
      setMarked(false);
      getCompleteTestData(data.data[0]);
    } else {
      // alert("submit");
    }
  }, [countQuestion]);

  useEffect(async () => {
    let interval = null;

    if (startTimer == true) {
      interval = setInterval(() => {
        // setTestTime((time) => time + 1);
        const currTimeStamp = Date.now();

        setTestTime(endTestTime - currTimeStamp);
        return endTestTime - currTimeStamp;
      }, 1000);
    } else {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/package-test-result/${localStorage.getItem(
          GENERATED_TEST_ID
        )}`
      );
      setstartTimer(true);
      setEndTestTime(data.data.endTime);
      // setstartTimer()
    }

    // if (isActive && isPaused === false) {

    return () => {
      clearInterval(interval);
    };
  }, [endTestTime]);

  // useEffect(() => {
  //   getCompleteTestData();
  // }, []);
  const getCompleteTestData = async (currQuestion) => {
    console.log(countQuestion, "<<<prev count question");

    const { data } = await axios.get(
      `${BACKEND_URL}/api/v1/package-test-result/${localStorage.getItem(
        GENERATED_TEST_ID
      )}`
    );
    console.log(data, "<<<<<<prev");
    const { questions_details } = data.data;
    setTestMode(data.data.mode);
    if (questions_details.length > 0) {
      setsaveQuestionDetails(questions_details);
      console.log(
        currQuestion,
        "<<previous on Screen question",
        questions_details
      );
      const getIfquestionVisited = questions_details.filter(
        (item) => item?.question?.id == currQuestion?.id
      );

      const prevQuestion = saveQuestionDetails[+countQuestion - 1]; // -1 Because in screen countQuestion is 1 but in question_detail[] its index is 0
      // if(prevQ)

      console.log(getIfquestionVisited, "previos question visited");
      if (getIfquestionVisited.length) {
        // const {markedOption}
        setPreviousSavedAnswer(getIfquestionVisited[0]);
        setSelected(parseInt(getIfquestionVisited[0].markedOption));

        if (getIfquestionVisited[0].markedOption != "null") {
          // alert(`not null ${getIfquestionVisited[0].markedOption}`);
          setMarked(true);
        } else {
          // alert(`null ${getIfquestionVisited[0].markedOption}`);
        }

        setSelectedOption(+getIfquestionVisited[0]);
      }

      // if (prevQuestion) {
      //   console.log(prevQuestion, "<<<This is previous question<<<<");

      //   console.log(prevQuestion, "<<<<Prev <<que");
      //   const parseInt = +prevQuestion?.markedOption;
      //   setSelected(parseInt);
      // }
    }
  };

  const completeTheTest = async () => {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/package-test-result/test-completed/${localStorage.getItem(
        GENERATED_TEST_ID
      )}`
    );
  };

  const handleNextQuestion = async (last = false) => {
    let pushTheAns = {};
    console.log(selectedOption, "<<<<");

    // return null;
    if (
      selectedOption != null &&
      selected == previousSavedAnswer?.markedOption
    ) {
      // alert("same");
      pushTheAns = {
        question: onScreenQuestion.id,
        isUnused: selectedOption != null ? false : true,
        markedOption: selected != null ? selected : "null",
        isMarked: selectedOption != null ? true : false,
        isMarked: marked,
        isCorrect: selectedOption != null ? selectedOption.isCorrect : null,
        isIncorrect: selectedOption != null ? !selectedOption.isCorrect : null,
        totalPracticeTime: testMode == "LEARNING" ? practiceTime : "null",

        // timeSpend: time,
      };
      // setcountQuestion(countQuestion + 1);

      // pushTheAns = { ...previousSavedAnswer };
      // return null;
    } else {
      // alert(`else ${selected}`);
      pushTheAns = {
        question: onScreenQuestion.id,
        isUnused: selectedOption != null ? false : true,
        markedOption: selected != null ? selected : "null",
        isMarked: selectedOption != null ? true : false,
        isMarked: marked,
        isCorrect: selectedOption != null ? selectedOption.isCorrect : null,
        isIncorrect: selectedOption != null ? !selectedOption.isCorrect : null,
        timeSpend: time,
        totalPracticeTime: testMode == "LEARNING" ? practiceTime : "null",
      };
    }

    // ----------
    console.log(pushTheAns, "<<<SEnding this");
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
    console.log(pushTheAns, "<<< prev selected Option");
    setsaveQuestionDetails([...AnsweredQuestion, pushTheAns]);
    const dataToSend = {
      testId: localStorage.getItem(GENERATED_TEST_ID),
      isTestCompleted: last ? true : false,
      question_details: [pushTheAns],
      totalIncorrect:
        selectedOption != null ? (selectedOption.isCorrect ? 0 : 1) : 0,
      totalCorrect:
        selectedOption != null ? (selectedOption.isCorrect ? 1 : 0) : 0,
      totalUnanswered: selectedOption != null ? 0 : 1,
      totalMarked: selectedOption != null ? 1 : 0,
      totalTimeSpend: 80,
    };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/package-test-result/submit/answer`,
      dataToSend
    );

    if (data.statusCode == 200) {
      if (last == true) {
        completeTheTest();

        history.push(`/user/result/${localStorage.getItem(GENERATED_TEST_ID)}`);
        setLastQues(true);
      }
      setcountQuestion(countQuestion + 1);
    }
  };

  const submitHandler = async () => {
    // dispatch(submitAnswers());
    handleNextQuestion(true);
    // setLastQues()
  };

  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
      return "You have attempted to leave this page. Are you sure?";
    }

    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };
    //

    let _time = 0;
    const count = setInterval(() => {
      _time = _time + 1;
      setTime(_time);
      dispatch(setTotalTime());
    }, 1000);
    return () => clearInterval(count);
  }, [questionCount]);

  const calCulateTime = () => {
    console.log(endTestTime, "<<<endt time");
    const TimeStampDiff = endTestTime - Date.now();
    const Min = TimeStampDiff / 60000;
    console.log(parseInt(Min), "<<<<minutes");
    const checkMin = parseInt(Min);
    if (Min.toFixed(1) < 0) {
      console.log(checkMin, Min.toFixed(1), "<<<check min");
      completeTheTest();
      history.push(`/user/result/${localStorage.getItem(GENERATED_TEST_ID)}`);
    } else {
      console.log("else check min", Min.toFixed(1));
    }
    return <h3> {Min.toFixed(1)} Minutes Left</h3>;
  };

  const goToPrevious = async () => {
    const prevCount = countQuestion - 1;
    console.log(prevCount, "<previous count");
    setcountQuestion(prevCount);
    // getCompleteTestData();
    // const prevQuestion = saveQuestionDetails[prevCount - 1];
    // setSelected(prevQuestion.markedOption);
    // console.log(prevQuestion, "<<<<Previous Question");
  };

  return (
    <>
      <NavBar time={time} mode={mode} />
      <div style={styles.container}>
        <QuestionProgress />
        {testMode == "TEST" && <div>{endTestTime != 0 && calCulateTime()}</div>}
        <div>
          {testMode == "LEARNING" && (
            <PracticeTime
              practiceTime={practiceTime}
              setPracticeTime={setPracticeTime}
            />
          )}
        </div>
        <Box sx={styles.subContainer1}>
          <Typography
            sx={styles.questionTitle}
          >{`Question ${countQuestion}.`}</Typography>{" "}
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
            {+currQuestion > 1 && (
              <ModifiedButton variant="outlined" onClick={goToPrevious}>
                Previous Question
              </ModifiedButton>
            )}
            {marked ? (
              <ModifiedButton
                variant="outlined"
                onClick={() => {
                  setSelectedOption(null);
                  setSelected(null);
                  setMarked(false);
                }}
              >
                Unmark
              </ModifiedButton>
            ) : (
              <ModifiedButton
                variant="outlined"
                onClick={() => {
                  if (selectedOption) setMarked(true);
                }}
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
                  // setcountQuestion(countQuestion + 1);
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
