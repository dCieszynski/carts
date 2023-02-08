import { screen, render } from "@testing-library/react";
import PaginationButton from "../../../components/Pagination/PaginationButton";
import { vi } from "vitest";

describe("PaginationButton", () => {
  test("renders", () => {
    render(<PaginationButton title="1" />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders with onClick", () => {
    render(<PaginationButton title="1" onClick={() => {}} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("handles onClick", () => {
    const onClick = vi.fn();

    render(<PaginationButton title="1" onClick={onClick} />);

    screen.getByText("1").click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
