const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.auth.login({
      email,
      password,
    });
    return data;
  }
);

const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { extra: api, dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.refreshToken();
      return data;
    } catch (error) {
      dispatch(logout());
      return rejectWithValue("Failed to refresh token.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: {
      accessToken: "",
      refreshToken: "",
    },
    user: {
      areaOfPractise: "",
      email: "",
      name: "",
    },
    ui: {
      login: {},
      refreshToken: {},
    },
  },
  reducers: {
    logout: () => {
      // just so that we have an action type to dispatch in our root reducer.
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.ui.login.loading = true;
      state.ui.login.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.ui.login.loading = false;
      state.isAuth = true;
      state.token = {
        accessToken: payload.data.tokenRes.access_token,
        // refreshToken: payload.data.tokenRes.refresh_token,
      };
      console.log(payload);
      state.user = {
        areaOfPractise: payload.data.user.area_of_practise,
        email: payload.data.user.email,
        name: `${payload.data.user.firstName} ${payload.data.user.lastName}`,
        userId: payload.data.user._id,
      };
    },
    [login.rejected]: (state, action) => {
      state.ui.login.loading = false;
      state.ui.login.error = action.error.message;
    },
    [refreshToken.pending]: (state) => {
      state.ui.refreshToken.loading = true;
    },
    [refreshToken.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.ui.refreshToken.loading = false;
    },
    [refreshToken.rejected]: (state) => {
      state.ui.refreshToken.loading = false;
    },
  },
});

const getAuth = (state) => state.auth;
const getAuthUI = (state) => state.auth.ui;
const getAuthRefreshTokenUi = (state) => state.auth.ui.refreshToken;

const { logout } = authSlice.actions;

export {
  getAuth,
  getAuthUI,
  login,
  logout,
  refreshToken,
  getAuthRefreshTokenUi,
};

export default authSlice.reducer;
