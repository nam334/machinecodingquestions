import React from "react";

const Chip = ({ id, chip, deleteChip }) => {
  const chipStyle = {
    backgroundColor: "lightgray",
    borderRadius: "10px",
    color: "black",
    padding: "0.2rem 0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    gap: "10px",
  };
  return (
    <>
      <div style={chipStyle}>
        <span style={{ fontSize: "1.2rem" }}>{chip}</span>
        <span
          style={{ fontSize: "1.5rem", cursor: "pointer", color: "red" }}
          onClick={() => deleteChip(id)}
        >
          &times;
        </span>
      </div>
    </>
  );
};

export default Chip;
