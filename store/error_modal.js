import { createContext, useState, useContext } from "react";
const ErrorModalContext = createContext();

export function ErrorModalContextProvider({ children }) {
  const [error, setError] = useState();
  const content = {
    error: error,
    setError: setError,
  };
  return (
    <ErrorModalContext.Provider value={content}>
      {children}
    </ErrorModalContext.Provider>
  );
}
export function useErrorModal() {
  const context = useContext(ErrorModalContext);
  if (context === undefined) {
    throw new Error(
      `useErrorModal must be used within a ErrorModalContextProvider.`
    );
  }
  return context;
}

export default ErrorModalContext;
