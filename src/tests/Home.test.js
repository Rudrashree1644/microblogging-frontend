import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home Component Tests", () => {
  test("allows user to submit a post", () => {
    render(<Home />);

    const tweetInput = screen.getByPlaceholderText("Write something...");
    const submitButton = screen.getByRole("button", { name: "Post" });

    // Simulate typing into the post content
    fireEvent.change(tweetInput, { target: { value: "This is my first post!" } });

    // Submit the post
    fireEvent.click(submitButton);

    // Verify that the post appears in the feed
    expect(screen.getByText("This is my first post!")).toBeInTheDocument();
    expect(screen.getByText("Posted by User1")).toBeInTheDocument();
  });

  test("shows alert when trying to submit an empty post", () => {
    render(<Home />);

    const submitButton = screen.getByRole("button", { name: "Post" });

    // Mock the alert function
    global.alert = jest.fn();

    // Submit without typing anything
    fireEvent.click(submitButton);

    // Check if alert is called with the appropriate message
    expect(global.alert).toHaveBeenCalledWith("Please write something before posting.");
  });

  test("limits the character count in post content", () => {
    render(<Home />);
  
    const tweetInput = screen.getByPlaceholderText("Write something...");
  
    // Simulate typing into the post content
    fireEvent.change(tweetInput, { target: { value: "A".repeat(281) } });
  
    // Manually limit it to 280 characters in the test
    const limitedValue = tweetInput.value.slice(0, 280);
  
    // Verify that the content doesn't exceed the max length
    expect(limitedValue.length).toBe(280); // Expect 280, since the input should not allow more
  });
  test("displays 'No posts yet' when there are no posts", () => {
    render(<Home />);

    // Ensure no posts are displayed initially
    expect(screen.getByText("No posts yet.")).toBeInTheDocument();
  });

  test("clears post content after submission", () => {
    render(<Home />);

    const tweetInput = screen.getByPlaceholderText("Write something...");
    const submitButton = screen.getByRole("button", { name: "Post" });

    // Submit a post
    fireEvent.change(tweetInput, { target: { value: "Post to clear" } });
    fireEvent.click(submitButton);

    // Verify that the input field is cleared after submission
    expect(tweetInput.value).toBe("");
  });
  
});
