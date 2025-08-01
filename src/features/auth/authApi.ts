import type { AppDispatch } from "@/store"
import { loginFailure, loginStart, loginSuccess } from "./authSlice"
import api from "@/lib/axios"
import { clearTokens, getRefreshToken, saveTokens } from "./authUtils"
import type { User } from "./types"

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart())

  try {
    const tokenRes = await api.post(`/token/`, { email, password })
    const accessToken = tokenRes.data.access
    const refreshToken = tokenRes.data.refresh
    saveTokens(accessToken, refreshToken)

    const userRes = await api.get<User>("/auth/me/", {})
    const user = userRes.data

    
    dispatch(loginSuccess({ accessToken, refreshToken, user}))
  } catch (err: any) {
    dispatch(loginFailure("Login failed. Please check your credentials."))
    throw err
  }
}


export const logoutUser = () => (dispatch: AppDispatch) => {
  clearTokens();
  dispatch(logoutUser());
};


export async function tryRefreshToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  try {
    const res = await api.post("/token/refresh/", {
      refresh,
    });

    const newAccess = res.data.access;
    saveTokens(newAccess, refresh);
    return newAccess;
  } catch (err) {
    clearTokens();
    throw err;
  }
}