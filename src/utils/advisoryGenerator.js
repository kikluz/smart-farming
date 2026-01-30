import { SEVERITY_LEVELS, ADVISORY_TYPES, WEATHER_THRESHOLDS } from "./constants";

export const generateAdvisoriesForCrop = (crop, weatherData) => {
  const advisories = [];
  const { temp, humidity, wind_speed } = weatherData.current;

  // High Temperature Advisory
  if (temp > WEATHER_THRESHOLDS.HIGH_TEMP) {
    advisories.push({
      id: Date.now() + Math.random(),
      cropId: crop,
      title: `Heat Stress Alert for ${crop}`,
      severity: SEVERITY_LEVELS.HIGH,
      type: ADVISORY_TYPES.WEATHER,
      description: `Current temperature (${temp}°C) exceeds optimal range for ${crop}. Risk of heat stress.`,
      actions: [
        "Ensure adequate irrigation to cool the soil.",
        "Mulch to conserve soil moisture.",
        "Avoid applying fertilizer during peak heat.",
      ],
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 86400000 * 3).toISOString(), // Valid for 3 days
      isRead: false,
    });
  }

  // Low Temperature Advisory (e.g., for Wheat)
  if (temp < WEATHER_THRESHOLDS.LOW_TEMP && crop === "Wheat") {
    advisories.push({
      id: Date.now() + Math.random(),
      cropId: crop,
      title: `Cold Snap Warning for ${crop}`,
      severity: SEVERITY_LEVELS.MEDIUM,
      type: ADVISORY_TYPES.WEATHER,
      description: `Low temperatures (${temp}°C) detected. May affect seedling growth.`,
      actions: [
        "Monitor for frost damage.",
        "Apply light irrigation at night to prevent frost injury.",
      ],
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 86400000 * 2).toISOString(),
      isRead: false,
    });
  }

  // High Humidity / Pests (General rule)
  if (humidity > 85 && temp > 25) {
    advisories.push({
      id: Date.now() + Math.random(),
      cropId: crop,
      title: `High Pest Risk for ${crop}`,
      severity: SEVERITY_LEVELS.HIGH,
      type: ADVISORY_TYPES.PEST,
      description: `High humidity (${humidity}%) and warm temperatures favor pest proliferation.`,
      actions: [
        "Scout field for pests immediately.",
        "Ensure proper drainage.",
        "Apply preventative bio-pesticides if thresholds are met.",
      ],
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 86400000 * 5).toISOString(),
      isRead: false,
    });
  }

  // High Wind
  if (wind_speed > WEATHER_THRESHOLDS.HIGH_WIND) {
    advisories.push({
      id: Date.now() + Math.random(),
      cropId: crop,
      title: `High Wind Warning for ${crop}`,
      severity: SEVERITY_LEVELS.MEDIUM,
      type: ADVISORY_TYPES.WEATHER,
      description: `High winds (${wind_speed} km/h) expected. Risk of lodging.`,
      actions: [
        "Avoid spraying operations.",
        "Provide support for tall crops if feasible.",
        "Delay fertilizer application.",
      ],
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 86400000 * 1).toISOString(),
      isRead: false,
    });
  }

  return advisories;
};
