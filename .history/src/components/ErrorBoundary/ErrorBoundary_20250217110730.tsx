import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorFallbackView from "../ErrorFallback/ErrorFallback.view";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const handleErrorReset = () => {
    // Logika reset error (opsional)
    console.log("Error boundary reset triggered.");
  };

  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorFallbackView error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
      onReset={handleErrorReset}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;