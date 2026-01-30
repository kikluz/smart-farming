import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLocation: null,
  savedLocations: [],
  isFetching: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    addSavedLocation: (state, action) => {
      state.savedLocations.push(action.payload);
    },
    removeSavedLocation: (state, action) => {
      state.savedLocations = state.savedLocations.filter(
        (loc) => loc.id !== action.payload,
      );
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const {
  setCurrentLocation,
  addSavedLocation,
  removeSavedLocation,
  setIsFetching,
} = locationSlice.actions;

export default locationSlice.reducer;
