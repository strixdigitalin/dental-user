import { createSlice } from "@reduxjs/toolkit";

const explanationSlice = createSlice({
  name: "explanation",
  initialState: {
    questionDetail: {},
  },
  reducers: {
    setQuestionDetail: (state, { payload }) => {
      console.log(payload);
      state.questionDetail = {
        ...payload,
      };
      // state.questionDetail = {
      //   ...payload,
      // };
    },
  },
});

export const { setQuestionDetail } = explanationSlice.actions;
export default explanationSlice.reducer;
