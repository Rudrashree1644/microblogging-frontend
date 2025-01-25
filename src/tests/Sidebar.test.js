import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
  });


describe("Sidebar Component", () => {
  test("renders all links correctly", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    // Assert that the links are rendered
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  test("links have correct href attributes", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    // Check if links have the correct paths
    expect(screen.getByText(/Home/i).closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText(/Profile/i).closest("a")).toHaveAttribute("href", "/profile");
    expect(screen.getByText(/Search/i).closest("a")).toHaveAttribute("href", "/search");
    expect(screen.getByText(/Post/i).closest("a")).toHaveAttribute("href", "/post");
  });

 
  
});
