import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Autocomplete from "../components/Autocomplete";
import { RecoilRoot } from "recoil";

describe("Autocomplete component", () => {
  it("renders without crashing", () => {
    const { getByPlaceholderText } = render(
      <RecoilRoot>
        <Autocomplete />
      </RecoilRoot>
    );
    expect(
      getByPlaceholderText("Enter Artist/Album/Song name.....")
    ).toBeInTheDocument();
  });
});
