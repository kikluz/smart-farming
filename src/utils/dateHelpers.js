import { format, isToday as dateFnsIsToday, parseISO } from "date-fns";

export const formatDate = (date, formatStr = "PPP") => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const isToday = (date) => {
  if (!date) return false;
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return dateFnsIsToday(dateObj);
};

export const getSeason = (date = new Date()) => {
  const month = date.getMonth();
  // Northern Hemisphere seasons (approximate)
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
};

export const getCropGrowthDuration = (plantingDate) => {
  if (!plantingDate) return 0;
  const start = new Date(plantingDate);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
