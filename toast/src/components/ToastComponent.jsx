import React from "react";
import Toast from "./Toast";
import { renderApp } from "../main";

let callIndex = -1;
let stateValue = [];

export const resetHooks = () => {
  callIndex = -1;
};

const useState = (initialValue) => {
  callIndex++;

  const currentCallIndex = Number(callIndex);

  if (stateValue[currentCallIndex] === undefined)
    stateValue[currentCallIndex] = initialValue;

  const setValue = (newValue) => {
    stateValue[currentCallIndex] = newValue;
    console.log("newValue", stateValue[currentCallIndex]);
    renderApp();
  };
  return [stateValue[currentCallIndex], setValue];
};

const ToastComponent = () => {
  const [countA, setCountA] = useState(1);
  const [countB, setCountB] = useState(1);
  return (
    <>
      {/* useState Polyfill */}
      <div>
        <div>
          <h1>Count A: {countA}</h1>
          <button onClick={() => setCountA(countA - 1)}>Subtract</button>
          <button onClick={() => setCountA(countA + 1)}>Add</button>
        </div>
        <div>
          <h1>Count B: {countB}</h1>
          <button onClick={() => setCountB(countB - 1)}>Subtract</button>
          <button onClick={() => setCountB(countB - 1)}>Add</button>
        </div>
      </div>
    </>
  );
};

export default ToastComponent;
