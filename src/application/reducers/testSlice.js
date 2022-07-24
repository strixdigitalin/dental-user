import api from "../../infrastructure/utils/axios";
import store from "../store/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchQuestions = createAsyncThunk(
  "test/getQuestions",
  async ({ page }) => {
    const body = store.getState().test.testSetting;
    const { selectedSubTopics } = store.getState().question.metaData;
    const { filterBy, total } = store.getState().test.testSetting;
    if (filterBy[3]["all"]) {
      const { data } = await api.post(
        `question/user?filterBy=all&page=${page}&limit=1&totalQuestionCount=${total}`,
        {
          subTopicId: [...selectedSubTopics],
          // ...body,
        }
      );
      console.log("fetchquestion api", data);
      // state.testSetting = {
      //   ...state.testSetting,
      //   total,
      // }
      return { data };
    } else {
      const { data } = await api.post(
        // `question/user?page=${page}&limit=${total}`,
        `question/user?filterBy=all&page=${page}&limit=1&totalQuestionCount=${total}`,

        {
          subTopicId: [...selectedSubTopics],
          ...body,
        }
      );
      console.log("fetchquestion api", data.pageCount);

      return { data };
    }
  }
);

const submitAnswers = createAsyncThunk("test/submitAnswers", async () => {
  const testResult = store.getState().test.testResult;
  console.log(testResult, "testResult");
  const response = await api.post("testResult/add", testResult);
  console.log(response, "responseapi");
  return response;
});

const testSlice = createSlice({
  name: "test",
  initialState: {
    testQuestion: null,
    isReadyForSubmit: false,
    totalQuestion: null,
    testSetting: {
      filterBy: [],
    },
    testResult: {
      test_name: "",
      mode: "",
      totalQuestion: 0,
      totalIncorrect: 0,
      totalCorrect: 0,
      totalUnanswered: 0,
      totalMarked: 0,
      totalTimeSpend: 0,
      questions_details: [],
    },
    questionVisitCount: 1,
    submittedTest: {
      id: null,
      show: false,
    },
  },
  reducers: {
    setQuestionFilter: (
      state,
      {
        // payload: {
        //   mode,
        //   filters: { all, incorrect, marked, unused },
        //   total,
        // },
        payload,
      }
    ) => {
      // console.log(total, state, "<<<<testslice");
      console.log(payload, "<<<<");
      const { total, mode, filters } = payload;

      // state = { ...state, totalQuestion: total };
      state.testSetting = {
        ...state.testSetting,
        total,
        filterBy: [
          { isMarked: filters.marked },
          { isCorrect: filters.incorrect },
          { isUnused: filters.unused },
          { all: filters.all },
        ],
      };
      state.testResult = {
        ...state.testResult,
        mode: mode.toUpperCase(),
        totalQuestion: total,
        test_name: "Test2",
      };
    },
    incrementQuestionVisitCount: (state) => {
      console.log(
        state.questionVisitCount,
        state.totalQuestion,

        "<<<match the state"
      );
      if (+state.questionVisitCount < state.testSetting.total) {
        // if (true) {
        state.questionVisitCount = state.questionVisitCount + 1;
        if (
          state.questionVisitCount == state.testSetting.total ||
          state.totalQuestion == state.questionVisitCount
        ) {
          state.isReadyForSubmit = true;
        }
      } else state.isReadyForSubmit = true;
    },
    setQuestionVisitCount: (state, { payload }) => {
      state.isReadyForSubmit = false;
      state.questionVisitCount = payload;
    },
    setTotalTime: (state, { payload }) => {
      state.testResult.totalTimeSpend = state.testResult.totalTimeSpend + 1;
    },
    setSubmittedTestResultEmpty: (state, { payload }) => {
      console.log(payload, "payload send");
      state.testQuestion = null;
      state.isReadyForSubmit = false;
      state.totalQuestion = null;
      state.testSetting = {
        filterBy: [],
      };
      state.testResult = {
        test_name: "",
        mode: "",
        totalQuestion: 0,
        totalIncorrect: 0,
        totalCorrect: 0,
        totalUnanswered: 0,
        totalMarked: 0,
        totalTimeSpend: 0,
        questions_details: [],
      };
      state.questionVisitCount = 1;
      state.submittedTest = {
        id: null,
        show: false,
      };
    },
    addToResult: (state, { payload }) => {
      let position = null;
      console.log(payload, state.testResult, "<<<<all details on submit");
      state.testResult.questions_details.map((detail, idx) =>
        detail.question === payload.question ? (position = idx) : null
      );
      if (position !== null) {
        state.testResult.questions_details[position] = { ...payload };
        state.testResult = {
          ...state.testResult,
          totalIncorrect:
            !state.testResult.questions_details[position].isIncorrect &&
            payload.isIncorrect
              ? state.testResult.totalIncorrect + 1
              : state.testResult.totalIncorrect,
          totalCorrect:
            !state.testResult.questions_details[position].isCorrect &&
            payload.isCorrect
              ? state.testResult.totalCorrect + 1
              : state.testResult.totalCorrect,
          totalUnanswered:
            !state.testResult.questions_details[position].isUnused &&
            payload.isUnused
              ? state.testResult.totalUnanswered + 1
              : state.testResult.totalUnanswered,
          totalMarked:
            !state.testResult.questions_details[position].isMarked &&
            payload.isMarked
              ? state.testResult.totalMarked + 1
              : state.testResult.totalMarked,
        };
      } else {
        state.testResult.questions_details = [
          ...state.testResult.questions_details,
          { ...payload },
        ];
        state.testResult = {
          ...state.testResult,
          totalQuestion: state.testResult.totalQuestion + 1,
          totalIncorrect: payload.isIncorrect
            ? state.testResult.totalIncorrect + 1
            : state.testResult.totalIncorrect,
          totalCorrect: payload.isCorrect
            ? state.testResult.totalCorrect + 1
            : state.testResult.totalCorrect,
          totalUnanswered: payload.isUnused
            ? state.testResult.totalUnanswered + 1
            : state.testResult.totalUnanswered,
          totalMarked: payload.isMarked
            ? state.testResult.totalMarked + 1
            : state.testResult.totalMarked,
        };
      }
    },
  },
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, { payload: { data } }) => {
      // const { total } = store.getState().test.testSetting;
      state.testQuestion = data.data[0];
      // state.totalQuestion = data.totalQuestionCount;
      state.totalQuestion = data.pageCount;
    },
    [submitAnswers.fulfilled]: (state, { payload }) => {
      state.submittedTest = {
        id: payload.data.data._id,
        show: true,
      };
    },
  },
});

export { fetchQuestions, submitAnswers };

export const {
  setQuestionFilter,
  incrementQuestionVisitCount,
  setQuestionVisitCount,
  addToResult,
  setTotalTime,
  setSubmittedTestResultEmpty,
} = testSlice.actions;

export default testSlice.reducer;
