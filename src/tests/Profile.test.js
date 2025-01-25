import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../pages/Profile"; // Adjust the import based on your file structure
import "@testing-library/jest-dom";

test("updates username and displays it after saving", () => {
  render(<Profile />);

  // Verify the initial username is displayed
  expect(screen.getByText("User1")).toBeInTheDocument();

  // Click the "Edit" button to enter edit mode
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  // Verify that the input field is displayed with the current username
  const inputField = screen.getByRole("textbox");
  expect(inputField).toBeInTheDocument();
  expect(inputField.value).toBe("User1");

  // Change the username in the input field
  fireEvent.change(inputField, { target: { value: "NewUsername" } });
  expect(inputField.value).toBe("NewUsername");

  // Click the "Save" button to submit the form
  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  // Verify that the new username is displayed and edit mode is exited
  expect(screen.getByText("NewUsername")).toBeInTheDocument();
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});
