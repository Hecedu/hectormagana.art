import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "./auth-slice";

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;