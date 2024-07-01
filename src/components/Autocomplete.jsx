import React from "react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

function Autocomplete() {
  const [searchParam, setSearchParam] = useState("");
  const [clickedResult, setClickedResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchAutocompleteSuggestions = debounce(() => {
    fetch(`http://localhost:3000/search/autocomplete?keyword=${searchParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) setSuggestions(response?.data);
      });
  }, 1000);

  useEffect(() => {
    if (searchParam.length >= 3 && searchParam != clickedResult?.title)
      fetchAutocompleteSuggestions();
  }, [searchParam]);

  const autocompleteResultButtonHandler = (data) => {
    setClickedResult(data);
    setSearchParam(data?.title);
    setSuggestions([]);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/search/result?keyword=${clickedResult?.title}&type=${clickedResult?.type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        // if (response?.data) setSuggestions(response?.data);
      });
  }, [clickedResult]);

  return (
    <div>
      <input
        className="custom-input"
        placeholder="Enter Author/Album/Song name....."
        value={searchParam}
        onChange={(e) => {
          setSearchParam(e.target?.value);
        }}
      />

      {suggestions.length > 0 && (
        <div className="search-result-container">
          {suggestions?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                autocompleteResultButtonHandler(item);
              }}
            >
              {item?.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
