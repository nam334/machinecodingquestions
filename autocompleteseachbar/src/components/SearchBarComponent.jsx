import React, { useEffect, useState } from "react";
import { dataset } from "../utils/products_500_titles_desc";
import Suggestion from "./Suggestion";

const SearchBarComponent = () => {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(dataset);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectFiltered, setSelectFiltered] = useState(false);

  const changeHandler = (e) => {
    setShowSuggestions(true);

    setSearchInput(e.target.value);
  };

  const valueHandler = (e, title) => {
    // console.log("click", e);
    // e.stopPropagation();
    // console.log(title);
    setShowSuggestions(false);

    setSearchInput(title);
    setFilteredData([]);
  };

  // useEffect(() => {
  //   console.log("showSuggestions", showSuggestions);
  // }, [showSuggestions]);

  // useEffect(() => {
  //   console.log(filteredData);
  // }, [filteredData]);

  useEffect(() => {
    // if (searchInput?.length > 0) {
    //   setShowSuggestions(true);
    // } else setShowSuggestions(false);

    if (searchInput?.length === 0) {
      setShowSuggestions(false);
    }
    const start = performance.now();
    const filteredData = data?.filter(
      (dataitem) =>
        dataitem.title
          .toLowerCase()
          .trim()
          .includes(searchInput.toLowerCase().trim()) ||
        dataitem.description
          .toLowerCase()
          .trim()
          .includes(searchInput.toLowerCase().trim())
    );

    setFilteredData(filteredData);
    const end = performance.now();
    console.log("For each keystroke, console shows", end - start, "timings");
  }, [searchInput]);

  const keyDownHandler = (e) => {
    console.log(e);
  };
  return (
    <div>
      <h3 className="searchBarHeading">Find what You need 🔍</h3>
      <div className="searchBarComponent">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="searchBox"
          value={searchInput}
          onChange={(e) => changeHandler(e)}
          onKeyDown={(e) => keyDownHandler(e)}
          onFocus={() => searchInput?.length > 0 && setShowSuggestions(true)}
          //onBlur={() => setShowSuggestions(false)}
        />
        {showSuggestions && (
          <div className="suggestionBox">
            <Suggestion
              filteredData={filteredData}
              setSelectFiltered={setSelectFiltered}
              valueHandler={valueHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarComponent;
