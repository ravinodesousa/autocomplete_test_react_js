import React from "react";
import Autocomplete from "../components/Autocomplete";

function Home() {
  return (
    <div className="center vh-100 ">
      <div className="card">
        <span className="card-title">Search for music....</span>
        <Autocomplete />
      </div>
    </div>
  );
}

export default Home;
