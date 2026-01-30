import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = {
  getCurrentWeather: async (lat, lng) => {
    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon: lng,
          units: "metric",
          appid: API_KEY,
        },
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon: lng,
          units: "metric",
          appid: API_KEY,
        },
      }),
    ]);

    // Transform 5-day/3-hour forecast to daily forecast (approximate)
    const dailyForecast = [];
    const seenDates = new Set();

    forecastResponse.data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!seenDates.has(date)) {
        // Take the first available slot for the day (usually 00:00 or current time for today)
        // ideally we'd pick noon, but for simplicity this works to get distinct days
        // Better: Find the entry closest to 12:00 PM for each day
        seenDates.add(date);
        
        // Construct a daily object compatible with UI
        dailyForecast.push({
          dt: item.dt,
          temp: {
             day: item.main.temp,
             min: item.main.temp_min,
             max: item.main.temp_max
          },
          humidity: item.main.humidity,
          weather: item.weather,
        });
      }
    });

    // Ensure we have 5 days
    const slicedDaily = dailyForecast.slice(0, 5);

    return {
      current: {
        temp: weatherResponse.data.main.temp,
        humidity: weatherResponse.data.main.humidity,
        wind_speed: weatherResponse.data.wind.speed,
        uvi: 0, // Not available in free tier
        weather: weatherResponse.data.weather,
      },
      daily: slicedDaily,
    };
  },

  getHistoricalWeather: async (lat, lng, days = 30) => {
    // Mock data for development
    return Promise.resolve({
      data: Array(days)
        .fill()
        .map((_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          temp: 20 + Math.random() * 15,
          rainfall: Math.random() * 50,
          humidity: 40 + Math.random() * 40,
        })),
    });
  },
};

export const useWeatherData = (lat, lng) => {
  return useQuery({
    queryKey: ["weather", lat, lng],
    queryFn: () => weatherApi.getCurrentWeather(lat, lng),
    enabled: !!lat && !!lng,
    staleTime: 1000 * 60 * 10,
  });
};


