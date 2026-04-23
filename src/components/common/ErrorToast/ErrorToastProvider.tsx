import * as React from "react";
import type { ReactNode } from "react";
import "./ErrorToastProvider.scss";

type ErrorToastContextType = {
  showError: (message: string, duration?: number) => void;
};

const ErrorToastContext = React.createContext<
  ErrorToastContextType | undefined
>(undefined);

export const useErrorToast = (): ErrorToastContextType["showError"] => {
  const context = React.useContext(ErrorToastContext);

  if (!context) {
    throw new Error(
      "useErrorToast must be used within an ErrorToastProvider"
    );
  }

  return context.showError;
};

type ErrorToastProviderProps = {
  children: ReactNode;
};

export const ErrorToastProvider: React.FC<ErrorToastProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isExiting, setIsExiting] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  const clearToastTimeout = (): void => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleClose = React.useCallback((): void => {
    setIsExiting(true);

    window.setTimeout(() => {
      setOpen(false);
      setIsExiting(false);
      setMessage("");
    }, 300);
  }, []);

  const showError = React.useCallback(
    (msg: string, duration = 4000): void => {
      clearToastTimeout();
      setMessage(msg);
      setOpen(true);
      setIsExiting(false);

      timeoutRef.current = window.setTimeout(() => {
        handleClose();
      }, duration);
    },
    [handleClose]
  );

  React.useEffect(() => {
    return () => {
      clearToastTimeout();
    };
  }, []);

  return (
    <ErrorToastContext.Provider value={{ showError }}>
      {children}

      {open && (
        <div className={`error-toast-overlay ${isExiting ? "exit" : ""}`}>
          <div className={`error-toast ${isExiting ? "exit" : ""}`}>
            <div className="error-moving-line" />

            <div className="error-toast-content">
              <div className="error-icon-wrapper">
                <svg
                  className="error-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="16" r="0.8" fill="currentColor" />
                </svg>
              </div>

              <div className="error-text-section">
                <h4 className="error-title">Access Denied</h4>
                <p className="error-message">{message}</p>
              </div>

              <button
                type="button"
                className="error-close-btn"
                onClick={handleClose}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="error-progress-bar">
              <div className="error-progress-fill" />
            </div>
          </div>
        </div>
      )}
    </ErrorToastContext.Provider>
  );
};