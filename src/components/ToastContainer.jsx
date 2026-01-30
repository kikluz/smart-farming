import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../store/slices/notificationSlice";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";

const Toast = ({ notification }) => {
  const dispatch = useDispatch();
  const { id, type, message } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, 5000); // Auto dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "warning":
        return <AlertTriangle size={20} />;
      case "error":
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert-success";
      case "warning":
        return "alert-warning";
      case "error":
        return "alert-error";
      default:
        return "alert-info";
    }
  };

  return (
    <div className={`alert ${getAlertClass()} shadow-lg flex justify-between items-start min-w-[300px]`}>
      <div className="flex gap-2">
        {getIcon()}
        <span>{message}</span>
      </div>
      <button 
        className="btn btn-xs btn-ghost btn-circle"
        onClick={() => dispatch(removeNotification(id))}
      >
        <X size={16} />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const notifications = useSelector((state) => state.notification.notifications);

  if (notifications.length === 0) return null;

  return (
    <div className="toast toast-end toast-bottom z-50 flex flex-col gap-2">
      {notifications.map((note) => (
        <Toast key={note.id} notification={note} />
      ))}
    </div>
  );
};

export default ToastContainer;
