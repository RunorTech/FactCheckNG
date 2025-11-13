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
  },
});

// Action creators are generated for each case reducer function
export const {
 setToastData,
} = sharedSlice.actions;

export const persistConfig: PersistConfig<SharedReduxState> = {
  key: "shared",
  storage: storage,
  whitelist: [
    
  ],
};

export const sharedReducer = persistReducer(persistConfig, sharedSlice.reducer);
