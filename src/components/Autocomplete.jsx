import React from "react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

function Autocomplete() {
  const [searchParam, setSearchParam] = useState("");
  const [clickedResult, setClickedResult] = useState("");
  const [songData, setSongData] = useState([]);

  const fetchSongData = debounce(() => {
    fetch(`http://localhost:3000/search?keyword=${searchParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) setSongData(response?.data);
      });
  }, 1000);

  useEffect(() => {
    if (searchParam.length >= 3 && searchParam != clickedResult)
      fetchSongData();
  }, [searchParam]);

  const searchResultButtonHandler = (title) => {
    setClickedResult(title);
    setSearchParam(title);
    setSongData([]);
  };

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

      {songData.length > 0 && (
        <div className="search-result-container">
          {songData?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                searchResultButtonHandler(item?.title);
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
