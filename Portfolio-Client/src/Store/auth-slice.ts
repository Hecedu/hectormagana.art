import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import User from "../Models/user";
import authService from "../Services/auth-service";

export const authenticateUser = createAsyncThunk(
  "authenticateUser",
  async (JwtToken: string, thunkApi): Promise<string> => {
    return await authService.authenticateUser(JwtToken);
  }
);
export const logoutUser = createAsyncThunk
  (
    "logoutUser",
    async (_, { getState }) => {
      const state = getState() as AuthState;
      console.log(state.bearerToken)
      if (state.bearerToken){
        await authService.logoutUser(state.bearerToken);
      }
    }
  );
interface AuthState {
  userToken?: string;
  bearerToken?: string;
  userProfile?: User;
}

const initialState: AuthState = {
  userToken: undefined,
  bearerToken: undefined,
  userProfile: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      console.log("called")
      state.userToken = action.payload;
    },
    setBearerToken(state, action: PayloadAction<string>) {
      state.bearerToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authenticateUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.bearerToken = action.payload;
      }
    );
    builder.addCase(
      logoutUser.fulfilled,
      (state) => {
        state.bearerToken = undefined;
        state.userToken = undefined;
        state.userProfile = undefined;
      }
    );
  },
});

export const { setToken, setBearerToken } = authSlice.actions;
export default authSlice;