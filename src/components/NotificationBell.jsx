import React from "react";
import { Bell, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../store/slices/notificationSlice";

const NotificationBell = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const unreadCount = notifications.length;

  const handleDismiss = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="badge badge-xs badge-primary indicator-item">
              {unreadCount}
            </span>
          )}
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{unreadCount} Notifications</span>
          <div className="divider my-0"></div>
          {unreadCount === 0 ? (
            <p className="text-center py-4 opacity-70">No new notifications</p>
          ) : (
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className={`flex justify-between items-start py-2 border-b last:border-0 ${
                    note.type === "error" ? "text-error" : ""
                  }`}
                >
                  <span className="text-sm">{note.message}</span>
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => handleDismiss(note.id)}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBell;
