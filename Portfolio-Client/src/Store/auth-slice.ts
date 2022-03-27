import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../Models/user";
import authService from "../Services/auth-service";

export const authenticateUser = createAsyncThunk(
  "authenticateUser",
  async (JwtToken: string, thunkApi): Promise<string> => {
    return await authService.authenticateUser(JwtToken);
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
    logout(state) {
      console.log("logout");
      state.userToken = undefined;
      state.bearerToken =  undefined;
      state.userProfile = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      authenticateUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.bearerToken = action.payload;
      }
    );
  },
});

export const { setToken, setBearerToken, logout } = authSlice.actions;
export default authSlice;