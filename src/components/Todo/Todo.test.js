import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./index";

describe("Todo tests", () => {
  test("The three objects should be rendered by default", () => {
    render(<Todo />);
    const items = screen.getAllByText(/Item/i);

    expect(items.length).toEqual(3);
  });

  test("There should be a button and an input in document", () => {
    render(<Todo />);
    const button = screen.getByText("Add");
    const input = screen.getByLabelText("Text");
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("Todo item should be added to todo list", () => {
    // render
    render(<Todo />);

    // get elements
    const input = screen.getByDisplayValue("");
    const button = screen.getByText("Add");

    // add todo
    const todoItem = "meeting";
    fireEvent.change(input, {
      target: { value: todoItem },
    });
    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // assertion
    expect(screen.getByText(todoItem)).toBeInTheDocument();
  });
});
