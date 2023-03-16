import axios from "axios";
import { refreshToken } from "../../application/reducers/authSlice";
import { actions, ALERT_TYPES } from "../../application/reducers/uiSlice";
import store from "../../application/store";
export const headers = () => {
  const auth = store.getState().auth;

  return {
    authorization: `Bearer ${auth.token.accessToken}`,
  };
};

const api = axios.create({
  // baseURL: "https://dental-world-api.herokuapp.com/api/v1",
  // baseURL: "https://dental-back.onrender.com/api/v1",
  baseURL: "https://dental-back.onrender.com/api/v1",
  // baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use((request) => {
  const auth = store.getState().auth;

  if (auth.isAuth)
    request.headers.Authorization = `Bearer ${auth.token.accessToken}`;
  return request;
});

// api.interceptors.response.use(undefined, (error) => {
//   // if there is an error and its status is 403 then logout user (till refresh token is unavailable)
//   if (error.response?.status === 403) {
//     store.dispatch(refreshToken()).catch((err) =>
//       store.dispatch(
//         actions.showAlert({
//           type: ALERT_TYPES.INFO,
//           message: "You were inactive for a long time. Please signin again.",
//         })
//       )
//     );

//     return Promise.reject(error);
//   }

//   console.log(error.response.data?.error);

//   if (error.response?.status === 500) {
//     error.message = "Sorry, something went wrong in our server.";
//   } else {
//     error.message = error.response
//       ? error.response.data?.error?.message
//       : "Something went wrong. Try again.";
//   }

//   if (axios.isCancel(error)) {
//     return new Promise.reject(error);
//   }

//   store.dispatch(
//     actions.showAlert({ type: ALERT_TYPES.ERROR, message: error.message })
//   );

//   error.code = error.response ? error.response.data.data : null;
//   return Promise.reject(error);
// });

export default api;
