import api from "../utils/axios";

const authService = {
  login: (payload) => api.post(`/auth/login`, payload),
};

export default authService;
