import React, { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
  const [animatedBar, setAnimatedBar] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimatedBar(progress), 100);
  }, [progress]);
  const progressBarOuter = {
    backgroundColor: "lightgray",
    // width: "500px",
    borderRadius: "10px",
  };

  const progressBarInner = {
    backgroundColor: "green",
    width: `${progress}%`,
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    transition: "ease-in 0.2s",
    transform: `translateX(${animatedBar - 100}%)`,
  };
  return (
    <>
      <h2>Progress Bar</h2>
      <div style={progressBarOuter}>
        <div
          className="inner"
          style={progressBarInner}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemax="100"
          aria-valuemin="0"
        >
          {animatedBar}%
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
