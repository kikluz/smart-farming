import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import locationReducer from "./slices/locationSlice.js";
import weatherReducer from "./slices/weatherSlice.js";
import advisoryReducer from "./slices/advisoriesSlice.js";
import cropsReducer from "./slices/cropsSlice.js";
import notificationReducer from "./slices/notificationSlice.js";
import forumReducer from "./slices/forumSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    weather: weatherReducer,
    advisories: advisoryReducer,
    crops: cropsReducer,
    notification: notificationReducer,
    forum: forumReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
