import React from "react";
import Autocomplete from "../components/Autocomplete";
import SearchResult from "../components/SearchResult";
import "../styles/Home.css";

function Home() {
  return (
    <div className="center vh-100 ">
      <div className="card">
        <span className="card-title">Search for music....</span>
        <Autocomplete />
        <SearchResult />
      </div>
    </div>
  );
}

export default Home;
