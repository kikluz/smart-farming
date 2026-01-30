import React from "react";
import { Sprout, Calendar, Trash2, Edit2, Thermometer } from "lucide-react";

const CropCard = ({ crop, onDelete, onUpdate }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Sprout className="text-green-500" />
              <h3 className="card-title">{crop.name}</h3>
              <span className="badge badge-outline">{crop.variety}</span>
            </div>
            <p className="text-sm opacity-70">{crop.area} acres</p>
          </div>
          <div
            className={`badge ${
              crop.health === "Excellent"
                ? "badge-success"
                : crop.health === "Good"
                ? "badge-info"
                : "badge-warning"
            }`}
          >
            {crop.health}
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span className="text-sm">Planted: {crop.plantingDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sprout size={16} />
            <span className="text-sm">Stage: {crop.growthStage}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer size={16} />
            <span className="text-sm">
              Weather Impact: {crop.weatherImpact}
            </span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-sm btn-ghost text-error"
            onClick={() => onDelete(crop.id)}
          >
            <Trash2 size={16} />
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => onUpdate(crop)}
          >
            <Edit2 size={16} /> Update Stage
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
