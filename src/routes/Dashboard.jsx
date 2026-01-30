import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import WeatherCard from "../components/WeatherCard.jsx";
import AdvisoryCard from "../components/AdvisoryCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useQuery } from "@tanstack/react-query";
import ChartComponent from "../components/ChartComponent.jsx";

const Dashboard = () => {
  const { t } = useTranslation();
  const location = useSelector((state) => state.weather.location);
  const advisories = useSelector((state) => state.advisories.advisories);

  const { data: weatherHistory, isLoading: isWeatherHistoryLoading } = useQuery({
    queryKey: ["weatherHistory"],
    queryFn: () =>
      Promise.resolve({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        temperatures: [22, 25, 28, 30, 32, 35],
        rainfall: [50, 60, 80, 100, 120, 150],
      }),
  });

  const chartData = {
    labels: weatherHistory?.labels || [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherHistory?.temperatures || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Rainfall (mm)",
        data: weatherHistory?.rainfall || [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("dashboard.title")}</h1>
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>{t("dashboard.home")}</a>
            </li>
            <li>{t("dashboard.title")}</li>
          </ul>
        </div>
      </div>

      {/* Weather Overview */}
      {location && (
        <WeatherCard
          lat={location.lat}
          lng={location.lng}
          locationName={location.address}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advisories */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{t("dashboard.recentAdvisories")}</h2>
              <div className="space-y-4">
                {advisories.slice(0, 3).map((advisory) => (
                  <AdvisoryCard key={advisory.id} advisory={advisory} />
                ))}
              </div>
              {advisories.length === 0 && (
                <div className="text-center py-8">
                  <p className="opacity-70">{t("dashboard.noAdvisories")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">{t("dashboard.activeCrops")}</div>
              <div className="stat-value">4</div>
              <div className="stat-desc">↗︎ 2 this month</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">{t("dashboard.todaysRainfall")}</div>
              <div className="stat-value">25mm</div>
              <div className="stat-desc">↑ 5mm from yesterday</div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{t("dashboard.weatherTrends")}</h3>
              <div className="h-48">
                {isWeatherHistoryLoading ? (
                  <LoadingSpinner className="h-full" />
                ) : (
                  <ChartComponent
                    type="line"
                    data={chartData}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
