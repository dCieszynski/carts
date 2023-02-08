import { screen, render, waitFor } from "@testing-library/react";
import TableAction from "../../../components/Table/TableAction";
import { vi } from "vitest";

describe("TableAction", () => {
  test("renders the name", () => {
    const onClickMock = vi.fn();
    render(<TableAction name="Action" dataId={1} onClick={onClickMock} />);

    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  test("calls the onClick function", () => {
    const onClickMock = vi.fn();
    render(<TableAction name="Action" dataId={1} onClick={onClickMock} />);

    waitFor(() => {
      screen.getByText("Action").click();
    });

    expect(onClickMock).toBeCalledWith(1);
  });
});
