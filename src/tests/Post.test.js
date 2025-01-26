import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Post from "../pages/Post"; // Adjust the path if necessary

test("allows user to type and submit a tweet", async () => {
    render(<Post />);
  
    const tweetInput = screen.getByPlaceholderText("Share your thoughts...");
    const submitButton = screen.getByRole("button", { name: "Post" });
  
    // Simulate typing into the tweet input
    fireEvent.change(tweetInput, { target: { value: "This is my tweet" } });
  
    // Submit the tweet
    fireEvent.click(submitButton);
  
    // Wait for the tweet to be added to the list
    await waitFor(() => screen.getByText("This is my tweet"));
  
    // Verify the tweet is in the feed
    expect(screen.getByText("This is my tweet")).toBeInTheDocument();
    expect(screen.getByText(/Posted by User1/)).toBeInTheDocument();
  });
  

  test("shows alert when trying to post an empty tweet", () => {
    render(<Post />);
  
    const submitButton = screen.getByRole("button", { name: "Post" });
  
    // Mock the alert function
    global.alert = jest.fn();
  
    // Submit without typing anything
    fireEvent.click(submitButton);
  
    // Check if alert is called with the appropriate message
    expect(global.alert).toHaveBeenCalledWith("Please write something before posting.");
  });
  
  test("displays character count correctly", () => {
    render(<Post />);
  
    const tweetInput = screen.getByPlaceholderText("Share your thoughts...");
    const charCount = screen.getByText(/characters remaining/);
  
    // Simulate typing
    fireEvent.change(tweetInput, { target: { value: "Hello world!" } });
  
    // Check if the character count updates correctly
    // Expected: 280 - "Hello world!" (12 characters) = 268 characters remaining
    expect(charCount.textContent).toBe("268 characters remaining");
  });
  test("shows no tweets message when there are no tweets", () => {
    render(<Post />);
  
    // Ensure no tweets are displayed initially
    const noTweetsMessage = screen.getByText("No tweets yet. Start sharing your thoughts!");
    expect(noTweetsMessage).toBeInTheDocument();
  });
    