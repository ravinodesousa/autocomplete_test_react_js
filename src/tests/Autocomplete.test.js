import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Autocomplete from "../components/Autocomplete";

describe("Autocomplete component", () => {
  it("renders without crashing", () => {
    const { getByPlaceholderText } = render(<Autocomplete />);
    expect(
      getByPlaceholderText("Enter Author/Album/Song name.....")
    ).toBeInTheDocument();
  });
});
