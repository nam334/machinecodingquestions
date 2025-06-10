import React, { useEffect, useState } from "react";

const Toast = ({ message, type, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setVisible(false), duration);

    return () => [clearTimeout(timer)];
  });

  if (!visible) return;
  const myStyle = {
    backgroundColor:
      type === "success"
        ? "green"
        : type === "info"
        ? "blue"
        : type === "error"
        ? "red"
        : null,
    width: "100%",
    color: "white",
    padding: " 0.5rem 1rem",
    borderRadius: "5px",
    fontSize: "15px",
    margin: "1.5rem",
  };
  return <div style={myStyle}>{message}</div>;
};

export default Toast;
