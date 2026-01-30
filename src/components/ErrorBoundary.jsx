import React from "react";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <AlertTriangle className="h-16 w-16 text-error mb-4" />
              <h2 className="card-title text-2xl font-bold mb-2">
                Something went wrong
              </h2>
              <p className="text-base-content/70 mb-6">
                We apologize for the inconvenience. An unexpected error occurred.
              </p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </button>
              </div>
              {import.meta.env.DEV && (
                <div className="collapse collapse-arrow bg-base-200 mt-4 text-left">
                  <input type="checkbox" />
                  <div className="collapse-title font-medium text-sm">
                    Error Details
                  </div>
                  <div className="collapse-content overflow-x-auto">
                    <pre className="text-xs">
                      {this.state.error && this.state.error.toString()}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
