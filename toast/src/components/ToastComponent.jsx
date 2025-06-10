import React, { useState } from "react";
import Toast from "./Toast";

const ToastComponent = () => {
  const [toast, setToast] = useState([]);
  const addToast = (message, type, duration) => {
    const id = Date.now();
    setToast((prev) => [...prev, { id, message, type, duration }]);
  };
  return (
    <>
      <div>
        <button onClick={() => addToast("Success", "success", 4000)}>
          Show success
        </button>
        <button onClick={() => addToast("Error", "error", 3000)}>
          Show Error
        </button>
        <button onClick={() => addToast("Info", "info", 2000)}>
          Show Info
        </button>
      </div>
      {toast?.length &&
        toast?.map(({ id, message, type, duration }) => (
          <Toast message={message} type={type} duration={duration} />
        ))}
    </>
  );
};

export default ToastComponent;
