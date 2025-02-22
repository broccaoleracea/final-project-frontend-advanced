import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
}

const setCookies = (
    accessToken: string,
    refreshToken: string
) => {
  
  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, { expires: 1/24 }); // 1h
  Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, { expires: 4/24 }); // 4h
};

const clearCookies = () => {

  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
  Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
};

const initialState: AuthState = {
  user: null,
  accessToken: Cookies.get(COOKIE_KEYS.ACCESS_TOKEN) || null,
  refreshToken: Cookies.get(COOKIE_KEYS.REFRESH_TOKEN) || null,
};


export interface AuthState {
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface SetCredentialsPayload {
  user: string;
  accessToken: string;
  refreshToken: string;
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
        state,
        { payload }: PayloadAction<SetCredentialsPayload>
    ) => {
      const { user, accessToken, refreshToken } = payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      setCookies(accessToken, refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      clearCookies();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;