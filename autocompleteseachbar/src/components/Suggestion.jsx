import React from "react";

const Suggestion = ({ filteredData, setSearchInput, valueHandler }) => {
  return (
    <div className="suggestionContainer">
      {filteredData?.map((filteredData) => (
        <div className="selectedItem" key={filteredData?.id}>
          <h1
            className="suggestionContainertitle"
            onClick={(e) => valueHandler(e, filteredData?.title)}
          >
            {filteredData?.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
