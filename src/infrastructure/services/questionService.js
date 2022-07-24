import api from "../utils/axios";

const questionService = {
  getQuestionMetaData: () => api.get(`/subject/details`),
};

export default questionService;
