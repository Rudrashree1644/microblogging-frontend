import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "../pages/Search";
// Mock the fetch API
global.fetch = jest.fn();

describe("Search", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders the component correctly", () => {
    render(<Search />);
    expect(screen.getByPlaceholderText("Enter your search query...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Search Anything")).toBeInTheDocument();
  });
})

test("shows categories after entering a query and clicking Search", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Enter your search query...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "example" } });
    fireEvent.click(searchButton);

    expect(screen.getByText("Choose a category:")).toBeInTheDocument();
  });
