import React, { useEffect, useRef } from "react";

const Suggestion = ({ filteredData, highlightedIndex, valueHandler }) => {
  const highlightedRef = useRef(null);

  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="suggestionContainer">
      {filteredData?.map((filteredData, index) => (
        <div
          className={
            highlightedIndex === index
              ? `highlightedIndex selectedItem`
              : `selectedItem`
          }
          key={filteredData?.id}
          ref={highlightedIndex === index ? highlightedRef : null}
        >
          <h1
            className="suggestionContainertitle"
            onMouseDown={(e) => valueHandler(e, filteredData?.title)}
          >
            {filteredData?.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
