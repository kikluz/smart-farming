import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Cloud, Thermometer, Droplets, Wind, Sun } from "lucide-react";
import { useWeatherData } from "../api/weatherApi";

const WeatherCard = ({ lat, lng, locationName }) => {
  const { data: weather, isLoading, error } = useWeatherData(lat, lng);

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
           <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="alert alert-error">
            <span>Error loading weather data</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title">
              <Cloud className="text-blue-500" />
              Current Weather
            </h2>
            <p className="text-sm opacity-70">{locationName}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {Math.round(weather?.current?.temp)}°C
            </div>
            <div className="text-sm opacity-70">
              Feels like {Math.round(weather?.current?.temp)}°C
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Thermometer className="text-red-500" />
            <div>
              <div className="text-sm opacity-70">Temperature</div>
              <div className="font-semibold">
                {Math.round(weather?.current?.temp)}°C
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="text-blue-500" />
            <div>
              <div className="text-sm opacity-70">Humidity</div>
              <div className="font-semibold">{weather?.current?.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="text-green-500" />
            <div>
              <div className="text-sm opacity-70">Wind</div>
              <div className="font-semibold">
                {weather?.current?.wind_speed} m/s
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sun className="text-yellow-500" />
            <div>
              <div className="text-sm opacity-70">UV Index</div>
              <div className="font-semibold">{weather?.current?.uvi}</div>
            </div>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-outline">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
