import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  preferences: {
    locationSettings: {
      autoDetect: true,
      defaultLocation: "Farm Location",
      updateFrequency: "15min",
    },
    notificationSettings: {
      emailAlerts: true,
      pushNotifications: true,
      criticalAlerts: true,
      dailyDigest: false,
    },
    weatherSettings: {
      temperatureUnit: "celsius",
      rainfallUnit: "mm",
      windSpeedUnit: "m/s",
      showUvIndex: true,
    },
  },
  farmProfile: {
    farmName: "",
    primaryCrop: "Rice",
    farmArea: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updatePreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    updateFarmProfile: (state, action) => {
      state.farmProfile = {
        ...state.farmProfile,
        ...action.payload,
      };
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  logout,
  updatePreferences,
  updateFarmProfile,
} = userSlice.actions;

export default userSlice.reducer;
