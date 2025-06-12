import React, { useState } from "react";
import Chip from "./Chip";

function ChipsInput() {
  const [text, setText] = useState("");
  const [chips, setChips] = useState([]);
  const keyDownHandler = (e) => {
    const trimmedText = text.trim();
    if (!trimmedText.length) return;
    if (e.key === "Enter") {
      let id = Date.now();
      setChips((prev) => [...prev, { id, chip: e.target.value }]);
      setText("");
    }
  };

  const deleteChip = (chipId) => {
    console.log(chipId);
    let updatedChips = chips?.filter((chip) => chip.id !== chipId);
    setChips(updatedChips);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px 0",
      }}
    >
      <h2>Chips Input</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
        onKeyDown={(e) => keyDownHandler(e)}
      />
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {chips?.map(({ id, chip }) => (
          <Chip id={id} chip={chip} deleteChip={deleteChip} />
        ))}
      </div>
    </div>
  );
}

export default ChipsInput;
