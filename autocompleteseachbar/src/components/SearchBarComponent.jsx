import React, { useEffect, useMemo, useState } from "react";
import { dataset } from "../utils/products_50000_titles_desc";
import Suggestion from "./Suggestion";

const SearchBarComponent = () => {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(dataset);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [highlightedIndex, sethighlightedIndex] = useState(-1);

  const changeHandler = (value) => {
    console.log(value.length);
    console.log("Debounced value", value);
    if (value.length < 2) return;
    else setShowSuggestions(true);
    // setSearchInput(value);
  };

  const debounceHandler = (fn, delay) => {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        // fn.apply(this, args);
        fn(...args);
      }, delay);
    };
  };
  const debounce = useMemo(() => debounceHandler(changeHandler, 500), []);

  const valueHandler = (e, title) => {
    setShowSuggestions(false);
    setSearchInput(title);
    setFilteredData([]);
  };

  useEffect(() => {
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
    if (e.keyCode === 13 && filteredData?.length > 0) {
      setSearchInput(filteredData[highlightedIndex]?.title);
      setShowSuggestions(false);
      setFilteredData([]);
    }
    if (e.keyCode === 40) {
      if (filteredData?.length > 0)
        sethighlightedIndex((highlightedIndex) => highlightedIndex + 1);
    }
    if (e.keyCode === 38) {
      if (filteredData?.length > 0)
        if (highlightedIndex === 0) sethighlightedIndex(0);
        else sethighlightedIndex((highlightedIndex) => highlightedIndex - 1);
    }
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
          onChange={(e) => {
            console.log("Input typed", e.target.value);
            setSearchInput(e.target.value);
            debounce(e.target.value);
          }}
          onKeyDown={(e) => keyDownHandler(e)}
          onFocus={() => searchInput?.length > 0 && setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        {showSuggestions && (
          <div className="suggestionBox">
            <Suggestion
              filteredData={filteredData}
              highlightedIndex={highlightedIndex}
              valueHandler={valueHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarComponent;
