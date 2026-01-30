import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: null,
  forecast: [],
  location: null,
  isLoading: false,
  lastUpdated: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.currentWeather = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setForecast: (state, action) => {
      state.forecast = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setWeatherData, setForecast, setLocation, setLoading } =
  weatherSlice.actions;
export default weatherSlice.reducer;
