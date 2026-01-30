import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  MapPin,
  Bell,
  Cloud,
  User,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updatePreferences, updateFarmProfile } from "../store/slices/userSlice.js";
import { addNotification } from "../store/slices/notificationSlice.js";

const Settings = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.user.preferences);
  const farmProfile = useSelector((state) => state.user.farmProfile);

  const [locationSettings, setLocationSettings] = useState(preferences.locationSettings);
  const [notificationSettings, setNotificationSettings] = useState(preferences.notificationSettings);
  const [weatherSettings, setWeatherSettings] = useState(preferences.weatherSettings);
  const [localFarmProfile, setLocalFarmProfile] = useState(farmProfile);

  // Sync with Redux if it changes (optional but good practice)
  useEffect(() => {
    setLocationSettings(preferences.locationSettings);
    setNotificationSettings(preferences.notificationSettings);
    setWeatherSettings(preferences.weatherSettings);
    setLocalFarmProfile(farmProfile);
  }, [preferences, farmProfile]);

  const handleSave = () => {
    dispatch(updatePreferences({
        locationSettings,
        notificationSettings,
        weatherSettings
    }));
    dispatch(updateFarmProfile(localFarmProfile));
    
    dispatch(addNotification({
        type: "success",
        message: "Settings saved successfully!"
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon size={24} />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} />
              <h2 className="card-title">Location Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Auto-detect location</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={locationSettings.autoDetect}
                    onChange={(e) =>
                      setLocationSettings({
                        ...locationSettings,
                        autoDetect: e.target.checked,
                      })
                    }
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Default Location</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={locationSettings.defaultLocation}
                  onChange={(e) =>
                    setLocationSettings({
                      ...locationSettings,
                      defaultLocation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Weather Update Frequency</span>
                </label>
                <select
                  className="select select-bordered"
                  value={locationSettings.updateFrequency}
                  onChange={(e) =>
                    setLocationSettings({
                      ...locationSettings,
                      updateFrequency: e.target.value,
                    })
                  }
                >
                  <option value="5min">Every 5 minutes</option>
                  <option value="15min">Every 15 minutes</option>
                  <option value="30min">Every 30 minutes</option>
                  <option value="1hour">Every hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} />
              <h2 className="card-title">Notification Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Email alerts</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notificationSettings.emailAlerts}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailAlerts: e.target.checked,
                      })
                    }
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Push notifications</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: e.target.checked,
                      })
                    }
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Critical weather alerts</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notificationSettings.criticalAlerts}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        criticalAlerts: e.target.checked,
                      })
                    }
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Daily advisory digest</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notificationSettings.dailyDigest}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        dailyDigest: e.target.checked,
                      })
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Cloud size={20} />
              <h2 className="card-title">Weather Display Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Temperature Unit</span>
                </label>
                <div className="flex gap-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">°C</span>
                    <input
                      type="radio"
                      name="tempUnit"
                      className="radio radio-primary"
                      checked={weatherSettings.temperatureUnit === "celsius"}
                      onChange={() =>
                        setWeatherSettings({
                          ...weatherSettings,
                          temperatureUnit: "celsius",
                        })
                      }
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">°F</span>
                    <input
                      type="radio"
                      name="tempUnit"
                      className="radio radio-primary"
                      checked={weatherSettings.temperatureUnit === "fahrenheit"}
                      onChange={() =>
                        setWeatherSettings({
                          ...weatherSettings,
                          temperatureUnit: "fahrenheit",
                        })
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rainfall Unit</span>
                </label>
                <select
                  className="select select-bordered"
                  value={weatherSettings.rainfallUnit}
                  onChange={(e) =>
                    setWeatherSettings({
                      ...weatherSettings,
                      rainfallUnit: e.target.value,
                    })
                  }
                >
                  <option value="mm">Millimeters (mm)</option>
                  <option value="in">Inches (in)</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Show UV Index</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={weatherSettings.showUvIndex}
                    onChange={(e) =>
                      setWeatherSettings({
                        ...weatherSettings,
                        showUvIndex: e.target.checked,
                      })
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <User size={20} />
              <h2 className="card-title">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Farm Name</span>
                </label>
                <input 
                    type="text" 
                    className="input input-bordered" 
                    value={localFarmProfile.farmName}
                    onChange={(e) => setLocalFarmProfile({...localFarmProfile, farmName: e.target.value})}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Primary Crop</span>
                </label>
                <select 
                    className="select select-bordered"
                    value={localFarmProfile.primaryCrop}
                    onChange={(e) => setLocalFarmProfile({...localFarmProfile, primaryCrop: e.target.value})}
                >
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Corn</option>
                  <option>Soybean</option>
                  <option>Multiple Crops</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Total Farm Area (acres)</span>
                </label>
                <input 
                    type="number" 
                    className="input input-bordered" 
                    value={localFarmProfile.farmArea}
                    onChange={(e) => setLocalFarmProfile({...localFarmProfile, farmArea: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
            className="btn btn-primary btn-lg"
            onClick={handleSave}
        >
            Save All Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
