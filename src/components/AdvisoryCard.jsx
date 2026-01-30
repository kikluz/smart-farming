import React from "react";
import { AlertTriangle, CheckCircle, Info, Zap } from "lucide-react";
import { useDispatch } from "react-redux";
import { markAsRead } from "../store/slices/advisoriesSlice";

const AdvisoryCard = ({ advisory }) => {
  const dispatch = useDispatch();

  const severityIcons = {
    low: Info,
    medium: Info,
    high: AlertTriangle,
    critical: Zap,
  };

  const severityColors = {
    low: "info",
    medium: "warning",
    high: "error",
    critical: "error",
  };

  const Icon = severityIcons[advisory.severity];
  const color = severityColors[advisory.severity];

  const handleMarkAsRead = () => {
    dispatch(markAsRead(advisory.id));
  };

  return (
    <div
      className={`card bg-base-100 shadow-lg border-l-4 ${!advisory.isRead ? "ring-2" : ""}`}
      style={{ borderColor: `var(--color-${color})` }}
    >
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Icon className={`text-${color} mt-1`} size={24} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="card-title text-lg">{advisory.title}</h3>
                <span className={`badge badge-${color}`}>
                  {advisory.severity.toUpperCase()}
                </span>
                <span className="badge badge-outline">{advisory.type}</span>
              </div>
              <p className="mt-2">{advisory.description}</p>

              {advisory.actions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {advisory.actions.map((action, index) => (
                      <li key={index} className="text-sm">
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 text-sm opacity-70">
                Valid: {new Date(advisory.validFrom).toLocaleDateString()} -{" "}
                {new Date(advisory.validTo).toLocaleDateString()}
              </div>
            </div>
          </div>

          {!advisory.isRead && (
            <button onClick={handleMarkAsRead} className="btn btn-sm btn-ghost">
              <CheckCircle size={18} />
              Mark Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisoryCard;
