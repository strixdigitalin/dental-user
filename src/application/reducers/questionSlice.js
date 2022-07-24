const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const questionSelectors = {
  getQuestionMetaData: (state) => state.question.metaData,
};

const getQuestionMetaData = createAsyncThunk(
  "question/getQuestionMetaData",
  async (_, { extra: api }) => {
    const { data } = await api.question.getQuestionMetaData();
    console.log("get data :: ",data);
    return data;
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    metaData: {
      selectedSubjects: [],
      selectedTopics: [],
      selectedSubTopics: [],
    },
    entities: [],
    ui: {
      getQuestionMetaData: {},
    },
  },
  reducers: {
    setSelectedSubject: (state, { payload }) => {
      state.metaData.selectedSubjects = [
        ...state.metaData.selectedSubjects,
        payload,
      ];
      // state.metaData.selectedTopic = null;
      // state.metaData.selectedSubTopic = null;
    },
    removeSelectedSubject: (state, { payload }) => {
      const temp = [];
      state.metaData.selectedSubjects.map((subject) => {
        if (subject !== payload) {
          temp.push(subject);
        }
        return null;
      });
      state.metaData.selectedSubjects = temp;
    },
    removeSelectedAllSubject: (state, { payload }) => {
      const temp = [];
      state.metaData.selectedSubjects = temp;
    },
    setSelectedTopic: (state, { payload }) => {
      state.metaData.selectedTopics = [
        ...state.metaData.selectedTopics,
        payload,
      ];
      // state.metaData.selectedSubTopic = null;
    },
    removeSelectedTopic: (state, { payload }) => {
      const temp = [];
      state.metaData.selectedTopics.map((topic) => {
        if (topic !== payload) {
          temp.push(topic);
        }
        return null;
      });
      state.metaData.selectedTopics = temp;
    },
    removeSelectedAllTopic: (state, { payload }) => {
      const temp = [];
      state.metaData.selectedTopics = temp;
    },
    setSelectedSubTopic: (state, { payload }) => {
      state.metaData.selectedSubTopics = [
        ...state.metaData.selectedSubTopics,
        payload,
      ];
    },
    removeSelectedSubTopic: (state, { payload }) => {
      const temp = [];
      state.metaData.selectedSubTopics.map((subtopic) => {
        if (subtopic !== payload) {
          temp.push(subtopic);
        }
        return null;
      });
      state.metaData.selectedSubTopics = temp;
    },
    removeSelectedAllSubTopic: (state, { payload }) => {
      const temp = [];
      state.metaData.selectedSubTopics = temp;
    },
  },
  extraReducers: {},
});

const questionActions = questionSlice.actions;

export { questionActions, questionSelectors, getQuestionMetaData };

export default questionSlice.reducer;
