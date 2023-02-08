import { screen, render } from "@testing-library/react";
import TableName from "../../../components/Table/TableName";

describe("TableName", () => {
  test("renders the title", () => {
    render(<TableName title="Title" />);

    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
