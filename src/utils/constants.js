export const SEVERITY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};

export const CROP_TYPES = [
  "Rice",
  "Wheat",
  "Corn",
  "Soybean",
  "Cotton",
  "Barley",
];

export const ADVISORY_TYPES = {
  PEST: "pest",
  DISEASE: "disease",
  WEATHER: "weather",
  FERTILIZER: "fertilizer",
  IRRIGATION: "irrigation",
  HARVEST: "harvest",
  GENERAL: "general",
};

export const WEATHER_THRESHOLDS = {
  HIGH_TEMP: 35, // Celsius
  LOW_TEMP: 10, // Celsius
  HIGH_WIND: 20, // km/h
  HEAVY_RAIN: 50, // mm
};
