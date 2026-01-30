import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  markAllAsRead,
  setFilteredCrop,
  setSeverityFilter,
  setTypeFilter,
  addAdvisory,
} from "../store/slices/advisoriesSlice.js";
import { addNotification } from "../store/slices/notificationSlice.js";
import AdvisoryCard from "../components/AdvisoryCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { generateAdvisoriesForCrop } from "../utils/advisoryGenerator.js";
import { SEVERITY_LEVELS, ADVISORY_TYPES, CROP_TYPES } from "../utils/constants.js";
import { Filter, CheckCircle } from "lucide-react";

const Advisories = () => {
  const dispatch = useDispatch();
  const advisories = useSelector((state) => state.advisories.advisories);
  const filteredCrop = useSelector((state) => state.advisories.filteredCrop);
  const filteredSeverity = useSelector(
    (state) => state.advisories.filteredSeverity,
  );
  const filteredType = useSelector((state) => state.advisories.filteredType);
  // const { mutate: generateAdvisories, isPending: isGenerating } = useAdvisoryGeneration();

  const cropOptions = [...CROP_TYPES, "All Crops"];

  const severityOptions = [
    { value: "all", label: "All Severity" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" },
  ];

  const typeOptions = [
    "all",
    "irrigation",
    "pest",
    "fertilizer",
    "harvest",
    "general",
  ];

  const filteredAdvisories = advisories.filter((adv) => {
    // Crop Filter
    if (
      filteredCrop &&
      filteredCrop !== "All Crops" &&
      adv.cropId !== filteredCrop
    )
      return false;

    // Severity Filter
    if (filteredSeverity !== "all" && adv.severity !== filteredSeverity)
      return false;

    // Type Filter
    if (filteredType !== "all" && adv.type !== filteredType) return false;

    return true;
  });

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleGenerateNewAdvisories = () => {
    // Simulate generating advisories for multiple crops based on "current" weather
    const mockWeatherData = {
      current: {
        temp: 36, // Simulating high heat
        humidity: 88, // Simulating high humidity
        wind_speed: 12, // Simulating high wind
      },
    };

    const newAdvisories = [];
    CROP_TYPES.forEach((crop) => {
      const generated = generateAdvisoriesForCrop(crop, mockWeatherData);
      newAdvisories.push(...generated);
    });

    if (newAdvisories.length > 0) {
      newAdvisories.forEach((adv) => {
        dispatch(addAdvisory(adv));
      });

      const message =
        newAdvisories.length === 1
          ? `New Advisory: ${newAdvisories[0].title}`
          : `${newAdvisories.length} New Advisories Generated`;

      dispatch(
        addNotification({
          type: "warning",
          message: message,
        }),
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Weather Advisories</h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            className="btn btn-primary"
            onClick={handleGenerateNewAdvisories}
          >
            Generate New Advisories
          </button>
          <button className="btn btn-outline" onClick={handleMarkAllAsRead}>
            <CheckCircle size={18} />
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* Crop Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Crop</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {cropOptions.map((crop) => (
                  <button
                    key={crop}
                    className={`btn btn-sm ${filteredCrop === crop ? "btn-primary" : "btn-outline"}`}
                    onClick={() =>
                      dispatch(
                        setFilteredCrop(crop === "All Crops" ? null : crop),
                      )
                    }
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Severity</span>
              </label>
              <select
                className="select select-bordered select-sm"
                value={filteredSeverity}
                onChange={(e) => dispatch(setSeverityFilter(e.target.value))}
              >
                {severityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Advisory Type</span>
              </label>
              <select
                className="select select-bordered select-sm"
                value={filteredType}
                onChange={(e) => dispatch(setTypeFilter(e.target.value))}
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advisories List */}
      <div className="space-y-4">
        {filteredAdvisories.length > 0 ? (
          filteredAdvisories.map((advisory) => (
            <AdvisoryCard key={advisory.id} advisory={advisory} />
          ))
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center py-8">
              <p className="text-lg opacity-70">
                No advisories found matching your filters
              </p>
              <button
                className="btn btn-link mt-2"
                onClick={() => {
                  dispatch(setFilteredCrop(null));
                  dispatch(setSeverityFilter("all"));
                  dispatch(setTypeFilter("all"));
                }}
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Advisories</div>
          <div className="stat-value">{advisories.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Unread</div>
          <div className="stat-value">
            {advisories.filter((adv) => !adv.isRead).length}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">High Priority</div>
          <div className="stat-value">
            {
              advisories.filter(
                (adv) => adv.severity === "high" || adv.severity === "critical",
              ).length
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advisories;
