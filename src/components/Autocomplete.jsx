import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useRecoilState, useRecoilCallback } from "recoil";
import { autocompleteResults } from "../store/atom";
import "../styles/Autocomplete.css";
import { BASE_URL } from "../utils/constants";

function Autocomplete() {
  const [searchParam, setSearchParam] = useState("");
  const [clickedResult, setClickedResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [autocompleteResult, setAutocompleteResult] =
    useRecoilState(autocompleteResults);

  const fetchAutocompleteSuggestions = debounce(() => {
    fetch(`${BASE_URL}/search/autocomplete?keyword=${searchParam}`, {
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
    if (searchParam.length == 0) setAutocompleteResult([]);
  }, [searchParam]);

  const autocompleteResultButtonHandler = (data) => {
    setClickedResult(data);
    setSearchParam(data?.title);
    setSuggestions([]);
  };

  useEffect(() => {
    fetch(
      `${BASE_URL}/search/result?keyword=${clickedResult?.title}&type=${clickedResult?.type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) setAutocompleteResult(response?.data);
      });
  }, [clickedResult]);

  return (
    <div>
      <input
        className="custom-input"
        placeholder="Enter Artist/Album/Song name....."
        value={searchParam}
        onChange={(e) => {
          setSearchParam(e.target?.value);
        }}
      />

      {suggestions.length > 0 && (
        <div className="suggestion-result-container">
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
