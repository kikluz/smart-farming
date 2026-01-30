import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
} from "lucide-react";

export const formatTemp = (temp) => {
  if (temp === undefined || temp === null) return "N/A";
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed) => {
  if (speed === undefined || speed === null) return "N/A";
  return `${speed} m/s`;
};

export const formatHumidity = (humidity) => {
  if (humidity === undefined || humidity === null) return "N/A";
  return `${humidity}%`;
};

export const getWeatherIcon = (weatherId) => {
  // Rough mapping based on OpenWeatherMap condition codes
  if (!weatherId) return Sun;

  if (weatherId >= 200 && weatherId < 300) return CloudLightning;
  if (weatherId >= 300 && weatherId < 500) return CloudDrizzle;
  if (weatherId >= 500 && weatherId < 600) return CloudRain;
  if (weatherId >= 600 && weatherId < 700) return CloudSnow;
  if (weatherId >= 700 && weatherId < 800) return Wind; // Atmosphere (Mist, Smoke, etc.)
  if (weatherId === 800) return Sun;
  if (weatherId > 800) return CloudSun;

  return Cloud;
};
