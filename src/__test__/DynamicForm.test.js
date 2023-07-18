import DynamicForm from "../components/DynamicForm";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn();

describe("Test the DynamicForm Component", () => {
  test("it should display caption ", () => {
    render(<DynamicForm />);
    const createBtn = screen.getByTestId("create");
    const formName = screen.getByText(/create/i);

    fireEvent.click(createBtn);

    expect(formName).toBeInTheDocument();
  });
});
