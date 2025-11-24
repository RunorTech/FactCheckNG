import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer } from "redux-persist";
import { SharedReduxState } from "@/types/reduxStore";

const initialState: SharedReduxState = {
  toastData: {
    message: "",
    duration: 5000,
    showDismissButton: true,
  },
  hasProfile: false,
  currentUserID: null,

};

export const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setToastData: (
      state,
      action: { payload: SharedReduxState["toastData"] }
    ) => {
      const { payload } = action;
      state.toastData = { ...initialState.toastData, ...payload };
    },
    setHasProfile: (state, action) => {
      const { payload } = action;
      state.hasProfile = payload;
    },
    setCurrentUserID: (state, action) => {
      const { payload } = action;
      state.currentUserID = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToastData, setHasProfile, setCurrentUserID } = sharedSlice.actions;

export const persistConfig: PersistConfig<SharedReduxState> = {
  key: "shared",
  storage: storage,
  whitelist: ["hasProfile", "currentUserID"],
};

export const sharedReducer = persistReducer(persistConfig, sharedSlice.reducer);
