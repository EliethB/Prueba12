import { createContext, useCallback, useContext, useState } from "react";

const AlertContext = createContext({
  showAlert: (newMessage, newSeverity) => {},
});

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const showAlert = (newMessage, newSeverity = "info") => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  const getStyleAlert = useCallback(() => {
    if (severity === "success") {
      return "bg-green-500";
    }
    if (severity === "error") {
      return "bg-red-500";
    }
    return "bg-yellow-500";
  }, [severity]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {open && (
        <div className="fixed top-0 right-0 m-3 z-50">
        <div className={`p-3 rounded-md ${getStyleAlert()} flex items-center justify-between`}>
          <div className="flex items-center">
            <span className="text-white mr-2">{message}</span>
          </div>
          <button
            onClick={hideAlert}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            X
          </button>
        </div>
      </div>
      
      )}
    </AlertContext.Provider>
  );
};
