import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crops: [
    {
      id: 1,
      name: "Rice",
      variety: "Basmati",
      plantingDate: "2024-01-15",
      area: "2.5 acres",
      growthStage: "Vegetative",
      health: "Good",
      weatherImpact: "Moderate",
    },
    {
      id: 2,
      name: "Wheat",
      variety: "Durum",
      plantingDate: "2024-01-10",
      area: "3.0 acres",
      growthStage: "Flowering",
      health: "Excellent",
      weatherImpact: "Low",
    },
    {
      id: 3,
      name: "Corn",
      variety: "Sweet Corn",
      plantingDate: "2024-01-20",
      area: "1.5 acres",
      growthStage: "Seedling",
      health: "Fair",
      weatherImpact: "High",
    },
  ],
};

const cropsSlice = createSlice({
  name: "crops",
  initialState,
  reducers: {
    addCrop: (state, action) => {
      state.crops.push(action.payload);
    },
    removeCrop: (state, action) => {
      state.crops = state.crops.filter((crop) => crop.id !== action.payload);
    },
    updateCropStage: (state, action) => {
      const { id, stage } = action.payload;
      const crop = state.crops.find((c) => c.id === id);
      if (crop) {
        crop.growthStage = stage;
      }
    },
    updateCropHealth: (state, action) => {
       const { id, health } = action.payload;
       const crop = state.crops.find((c) => c.id === id);
       if(crop) {
           crop.health = health;
       }
    }
  },
});

export const { addCrop, removeCrop, updateCropStage, updateCropHealth } = cropsSlice.actions;

export default cropsSlice.reducer;
