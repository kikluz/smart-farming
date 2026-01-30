import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  advisories: [],
  filteredCrop: null,
  filteredSeverity: "all",
  filteredType: "all",
  unreadCount: 0,
};

const advisoriesSlice = createSlice({
  name: "advisories",
  initialState,
  reducers: {
    setAdvisories: (state, action) => {
      state.advisories = action.payload;
      state.unreadCount = action.payload.filter((adv) => !adv.isRead).length;
    },
    addAdvisory: (state, action) => {
      state.advisories.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action) => {
      const advisory = state.advisories.find(
        (adv) => adv.id === action.payload,
      );
      if (advisory && !advisory.isRead) {
        advisory.isRead = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.advisories.forEach((adv) => {
        adv.isRead = true;
      });
      state.unreadCount = 0;
    },
    setFilteredCrop: (state, action) => {
      state.filteredCrop = action.payload;
    },
    setSeverityFilter: (state, action) => {
      state.filteredSeverity = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.filteredType = action.payload;
    },
  },
});

export const {
  setAdvisories,
  addAdvisory,
  markAsRead,
  markAllAsRead,
  setFilteredCrop,
  setSeverityFilter,
  setTypeFilter,
} = advisoriesSlice.actions;

export default advisoriesSlice.reducer;
