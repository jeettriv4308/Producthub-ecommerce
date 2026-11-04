
import {
  describe,
  it,
  expect,
  vi,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import ErrorState from "./ErrorState";

describe("ErrorState Component", () => {
  it("displays the error title and message", () => {
    render(
      <ErrorState
        title="Unable to load products"
        message="Please try again."
      />
    );

    expect(
      screen.getByText("Unable to load products")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please try again.")
    ).toBeInTheDocument();
  });

  it("displays the retry button", () => {
    render(
      <ErrorState onRetry={() => {}} />
    );

    expect(
      screen.getByRole("button", {
        name: /try again/i,
      })
    ).toBeInTheDocument();
  });

  it("calls retry when the button is clicked", async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    render(
      <ErrorState onRetry={handleRetry} />
    );

    await user.click(
      screen.getByRole("button", {
        name: /try again/i,
      })
    );

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("does not display retry button without onRetry", () => {
    render(<ErrorState />);

    expect(
      screen.queryByRole("button", {
        name: /try again/i,
      })
    ).not.toBeInTheDocument();
  });

  it("announces errors to assistive technology", () => {
    render(<ErrorState />);

    expect(
      screen.getByRole("alert")
    ).toBeInTheDocument();
  });
});
