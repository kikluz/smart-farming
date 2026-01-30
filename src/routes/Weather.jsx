import React, { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import MapComponent from "../components/MapComponent.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../store/slices/weatherSlice.js";
import { useWeatherData } from "../api/weatherApi.js";
import { formatTemp, formatHumidity, formatWindSpeed } from "../utils/weatherFormatter.js";
import { formatDate } from "../utils/dateHelpers.js";

const Weather = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.weather.location);
  const { data: weather } = useWeatherData(location?.lat, location?.lng);

  useEffect(() => {
    // Default location if none set
    if (!location) {
      dispatch(
        setLocation({
          lat: 20.5937,
          lng: 78.9629,
          address: "India",
        }),
      );
    }
  }, [dispatch, location]);



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Weather Monitoring</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Map */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl h-[300px] lg:h-[500px]">
            <div className="card-body">
              <h2 className="card-title">Weather Map</h2>
              <p className="text-sm opacity-70 mb-2">Click anywhere on the map to see weather for that location.</p>
              <MapComponent
                location={location}
                weather={weather}
                onLocationSelect={(latlng) => {
                  dispatch(
                    setLocation({
                      lat: latlng.lat,
                      lng: latlng.lng,
                      address: `Location ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Current Conditions</h3>
              {weather ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Temperature</span>
                    <span className="font-semibold">
                      {formatTemp(weather.current.temp)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Humidity</span>
                    <span className="font-semibold">
                      {formatHumidity(weather.current.humidity)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wind Speed</span>
                    <span className="font-semibold">
                      {formatWindSpeed(weather.current.wind_speed)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>UV Index</span>
                    <span className="font-semibold">{weather.current.uvi}</span>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Forecast</h3>
              {weather?.daily?.slice(0, 5).map((day, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span>
                    {formatDate(new Date(day.dt * 1000), "EEE, MMM d")}
                  </span>
                  <div className="flex items-center gap-4">
                    <span>{formatTemp(day.temp.day)}</span>
                    <span className="text-sm opacity-70">{formatHumidity(day.humidity)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
