import React from "react";

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClass = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
    xs: "loading-xs",
  }[size] || "loading-md";

  return (
    <div className={`flex justify-center items-center ${className}`}>
        <span className={`loading loading-spinner ${sizeClass}`}></span>
    </div>
  );
};

export default LoadingSpinner;
