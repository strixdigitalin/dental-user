import React, { useEffect, useMemo, useState, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Checkbox,
  Collapse,
  FormControlLabel,
  Button,
  RadioGroup,
  Radio,
  TextField,
} from "@mui/material";
import UserNavigation from "../../component/UserNavigation";

import UserFooter from "../../component/UserFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionMetaData,
  questionActions,
  questionSelectors,
} from "../../../application/reducers/questionSlice";
import {
  getSubTopics,
  fetchQuestions,
  setQuestionFilter,
  getSubmitAnswer,
  getsubmitUserdata,
  setSubmittedTestResultEmpty,
} from "../../../application/reducers/testSlice";
import { makeStyles } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { NavLink, useHistory } from "react-router-dom";
import api, { headers } from "../../../infrastructure/utils/axios";
import PackageBox from "../../component/PackageBox";
import axios from "axios";
import {
  BACKEND_URL,
  CURRENT_QUESTION,
  CURRENT_SELECTED_PACKAGE,
  GENERATED_TEST_ID,
  TOTAL_SELECTED_QUESTION,
} from "../../Constant";
// import { UserContext } from "../../../UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid gray",
    display: "flex",
    margin: "3rem 0",
  },
  subjectsCont: {
    margin: "1rem 0",
    width: "30%",
    maxWidth: 300,
  },
  checkbox: {
    display: "flex",
    columnGap: "0.5rem",
    alignItems: "center",
    background: "#EFF5F8",
    color: "#525252 !important",
    "& p": {
      fontWeight: 600,
    },
  },
  topicCont: {
    background: "#EFF5F8",
    flex: 1,
    padding: "1rem",
  },
  subTopicCont: {
    marginLeft: "2rem",
  },
}));

const ShowSelectionContainer = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentSubTopic, setCurrentSubTopic] = useState(null);
  const [subjectDatas, setSubjectDatas] = useState([]);

  const [subjectsId, setSubjectsId] = useState();

  //when click on back , removes selected option
  useEffect(() => {
    dispatch(questionActions.removeSelectedAllSubject());
    dispatch(questionActions.removeSelectedAllTopic());
    dispatch(questionActions.removeSelectedAllSubTopic());
  }, []);

  // const userContext = useContext(UserContext);

  console.log("getvdata  :: ", data);

  const handleCurrentSubject = (id) => {
    setCurrentSubject(id);
  };
  const handleCurrentTopic = (id) => {
    setCurrentTopic(id);
  };

  const handleCurrentSubTopic = (id) => {
    setCurrentSubTopic(id);
  };

  const { selectedSubjects, selectedTopics, selectedSubTopics } = useSelector(
    questionSelectors.getQuestionMetaData
  );

  const handleSubjectChange = (id, checked) => {
    checked
      ? dispatch(questionActions.setSelectedSubject(id))
      : dispatch(questionActions.removeSelectedSubject(id));
  };
  const handleTopicChange = (id, checked) => {
    checked
      ? dispatch(questionActions.setSelectedTopic(id))
      : dispatch(questionActions.removeSelectedTopic(id));
  };
  const handleSubTopicChange = (id, checked) => {
    checked
      ? dispatch(questionActions.setSelectedSubTopic(id))
      : dispatch(questionActions.removeSelectedSubTopic(id));
  };

  let subjectData = [];
  const topics = useMemo(() => {
    if (subjectDatas.length !== 0) {
      subjectData.push(...subjectDatas);
    }
    if (!selectedSubjects || !data) return null;

    const [subject] = data.filter((subject) => subject.id === currentSubject);
    const [isSubjectExist] = subjectDatas.filter(
      (subject) => subject.id === currentSubject
    );

    // pusdata.push(subject)
    if (!subject) return null;
    if (isSubjectExist) {
      subjectData = [];
      const [newSubject] = subjectDatas.map((subject) => {
        return subjectDatas.filter((subject) => subject.id !== currentSubject);
      });
      subjectData.push(...newSubject);
    } else {
      subjectData.push(subject);
    }
    setSubjectDatas(subjectData);
    // return subject.topics;
  }, [data, currentSubject, selectedSubjects]);

  // const getstate = state.map(data=> data

  useDispatch(() => {
    if (selectedSubjects && selectedSubjects) {
      setSubjectsId(selectedSubjects);
    }
  }, [selectedSubjects]);

  const subTopics = useMemo(() => {
    if (!selectedSubjects || !selectedTopics || !data) return null;

    const [subject] = data.filter((subject) => subject.id === currentSubject);
    if (!subject) return null;

    // console.log("subject :: ",subject);

    const [topic] = subject.topics.filter((topic) => topic.id === currentTopic);
    if (!topic) return null;

    return topic.subTopics;
  }, [data, selectedSubjects, selectedTopics, currentSubject, currentTopic]);

  return (
    <div className={classes.root}>
      <div className={classes.subjectsCont}>
        {data.map((subject) => {
          console.log(subject, "<<<<item");
          return (
            <div
              className={classes.checkbox}
              style={{
                background: selectedSubjects.includes(subject.id)
                  ? "#EFF5F8"
                  : "white",
              }}
              key={subject.id}
            >
              <Checkbox
                checked={selectedSubjects.includes(subject.id) ? true : false}
                onChange={(e) => {
                  handleSubjectChange(subject.id, e.target.checked);
                  handleCurrentSubject(subject.id);
                }}
                name={subject.id}
              />
              <Typography>
                {/* {subject.title} {subject.title == "Bhushan" ? "   (1)" : ""} */}
                {subject.title} {`(${subject.topics.length})`}
              </Typography>
            </div>
          );
        })}
      </div>
      <div className={classes.topicCont}>
        {subjectDatas?.map((topics) =>
          topics?.topics.map((topic) => (
            <div key={topic.id}>
              <div className={classes.checkbox} key={topic.id}>
                <Checkbox
                  checked={selectedTopics.includes(topic.id) ? true : false}
                  onChange={(e) => {
                    handleTopicChange(topic.id, e.target.checked);
                    handleCurrentTopic(topic.id);
                  }}
                  name={topic}
                />
                <Typography>
                  {topic.title} ({topic?.subTopics?.length})
                </Typography>
                <div style={{ flex: 1 }} />

                {currentTopic !== topic.id ? (
                  <AddIcon style={{ color: "#BFBFBF" }} />
                ) : (
                  <RemoveIcon style={{ color: "#F23A5E" }} />
                )}
              </div>
              <Collapse
                in={currentTopic === topic.id}
                timeout="auto"
                unmountOnExit
              >
                <div className={classes.subTopicCont}>
                  {topic.subTopics?.map((subTopic) => (
                    <div className={classes.checkbox} key={subTopic.id}>
                      <Checkbox
                        checked={
                          selectedSubTopics.includes(subTopic.id) ? true : false
                        }
                        onChange={(e) => {
                          handleSubTopicChange(subTopic.id, e.target.checked);
                          handleCurrentSubTopic(subTopic.id);
                        }}
                        name={subTopic.id}
                      />
                      <Typography>{subTopic.title}</Typography>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Practice = () => {
  const packageData = [
    {
      name: "Package 1",
      totalQuestions: 40,
    },
    {
      name: "Package 1",
      totalQuestions: 40,
    },
    {
      name: "Package 1",
      totalQuestions: 40,
    },
    {
      name: "Package 1",
      totalQuestions: 40,
    },
    {
      name: "Package 1",
      totalQuestions: 40,
    },
    {
      name: "Package 1",
      totalQuestions: 40,
    },
    {
      name: "Package 1",
      totalQuestions: 40,
    },
  ];

  const UserData = useSelector((state) => state.auth);

  console.log(UserData, "<<<user Data");

  const [testExists, setTestExists] = useState(async () => {
    const res = await api.get("question/testExists");
    const data = await res.data;
    return data.exists;
  });

  const [checked, setChecked] = useState([0]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const history = useHistory();
  const [mode, setMode] = useState("learning");
  const [total, setTotal] = useState(null);
  const [filters, setFilters] = useState({
    unused: true,
    incorrect: false,
    marked: false,
    all: !testExists ? true : false,
  });
  const { selectedSubTopics } = useSelector(
    questionSelectors.getQuestionMetaData
  );
  const dispatch = useDispatch();

  const filterChangeHandler = (e) => {
    const { id, checked } = e.target;
    if (id === "all" && checked)
      setFilters({
        unused: checked,
        incorrect: checked,
        marked: checked,
        all: checked,
      });
    else if (id === "unused")
      setFilters({
        ...filters,
        unused: checked,
        all: checked && filters.incorrect && filters.marked ? true : false,
      });
    else if (id === "incorrect")
      setFilters({
        ...filters,
        incorrect: checked,
        all: checked && filters.unused && filters.marked ? true : false,
      });
    else if (id === "marked")
      setFilters({
        ...filters,
        marked: checked,
        all: checked && filters.unused && filters.incorrect ? true : false,
      });
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [questionSelectionData, setQuestionSelectionData] = useState([]);
  useEffect(async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/package`);
    setQuestionSelectionData(data.data);
    // consoel.log(data)
  }, [dispatch]);

  const minMaxValue = (e) => {
    setTotal(e.target.value);
  };
  const handleSubmit = async () => {
    localStorage.setItem(TOTAL_SELECTED_QUESTION, total);
    localStorage.setItem(CURRENT_QUESTION, 1);

    const { id, questionCount, title } = questionSelectionData[selectedPackage];
    console.log(title, "<<<title");
    localStorage.setItem(CURRENT_SELECTED_PACKAGE, id);

    if (questionCount >= total) {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/package-test-result/add`,
        {
          test_name: title,
          package: id,
          mode: "TEST",
          questions_details: [],
          totalQuestion: total,
          totalIncorrect: 0,
          totalCorrect: 0,
          totalUnanswered: 0,
          totalMarked: 0,
          totalTimeSpend: 0,
          endTime: Date.now() + 60000 * total * 3,
        },
        {
          headers: headers(),
        }
      );
      if (data.statusCode == 200) {
        localStorage.setItem(GENERATED_TEST_ID, data.data._id);
        history.push("/user/test");
      }
    } else {
      alert("You can select maximum:" + questionCount);
    }
  };

  console.log("questionSelectionData :: ", questionSelectionData);

  return (
    <>
      <UserNavigation />
      <Container
        maxWidth="xl"
        sx={{ textAlign: "center", margin: "70px auto" }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: "38px", color: "#434343", fontWeight: "bold" }}
        >
          Choose your practice
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#F1F1F1",
            borderRadius: "58px",
            width: "30%",
            margin: "30px auto",
            padding: "10px",
          }}
        >
          <div>
            <RadioGroup
              aria-label="mode"
              value={mode}
              name="controlled-radio-buttons-group"
              row
              onChange={(e) => setMode(e.target.value)}
            >
              <FormControlLabel
                value="learning"
                control={<Radio />}
                label="Practice"
              />
              <FormControlLabel value="test" control={<Radio />} label="Test" />
            </RadioGroup>
          </div>
        </Box>
        {testExists ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "50%",
              margin: "30px auto",
            }}
          >
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.unused}
                    onChange={(e) => filterChangeHandler(e)}
                    id="unused"
                  />
                }
                label="Unused"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.incorrect}
                    onChange={(e) => filterChangeHandler(e)}
                    id="incorrect"
                  />
                }
                label="Incorrect"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.marked}
                    onChange={(e) => filterChangeHandler(e)}
                    id="marked"
                  />
                }
                label="Marked"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.all}
                    id="all"
                    onChange={(e) => filterChangeHandler(e)}
                  />
                }
                label="All"
              />
            </div>
          </Box>
        ) : null}

        <hr />
        <br />
        <br />
        <Typography
          variant="h2"
          sx={{ fontSize: "38px", color: "#434343", fontWeight: "bold" }}
        >
          Select Questions From Functional Knowledge and Topic
        </Typography>

        <div></div>

        {/* ************************************* */}
        {/* {questionSelectionData ? (
          <ShowSelectionContainer data={questionSelectionData} />
        ) : null} */}

        {/* ---- show packages */}
        <div className="package-outer">
          {questionSelectionData.map((item, index) => {
            return (
              <PackageBox
                index={index}
                item={item}
                setSelectedPackage={setSelectedPackage}
                selectedPackage={selectedPackage}
              />
            );
          })}
        </div>

        {/* --- */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>
            Enter number of questions
            <span style={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              type="number"
              onChange={(e) => minMaxValue(e)}
              // onChange={(e) => setTotal(e.target.value)}
              size="small"
              sx={{ paddingLeft: "1em" }}
              required
              value={total}
            />
            {/* <Typography style={{color:"red"}}>Please enter 10 to 100</Typography> */}
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography style={{ visibility: "hidden" }}>
            Enter number of questions
            <span style={{ color: "red" }}> *</span>
          </Typography>
          <Typography style={{ color: "red", paddingLeft: "1em" }}>
            Please enter valid number 10 to 100
          </Typography>
        </Box>
        {/* {total > 0 && total < 100 && selectedSubTopics.length > 0 ? ( */}
        {total > 0 && total < 100 ? (
          // <NavLink to="/user/test">
          <Button
            onClick={() => {
              if (selectedPackage == null) {
                alert("Select PAckage");
              }
              handleSubmit();
              // dispatch(setSubmittedTestResultEmpty());
              // dispatch(setQuestionFilter({ filters, mode, total }));
              // dispatch(fetchQuestions({ page: 1 }));
            }}
            sx={{ color: "white", "&:hover": { backgroundColor: "#f23a5e" } }}
          >
            Start
          </Button>
        ) : (
          // </NavLink>
          <Button disabled>Start</Button>
        )}
      </Container>
      <UserFooter />
    </>
  );
};

export default Practice;
