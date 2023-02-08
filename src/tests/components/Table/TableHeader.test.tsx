import { screen, render } from "@testing-library/react";
import TableHeader from "../../../components/Table/TableHeader";

describe("TableHeader", () => {
  test("renders the title", () => {
    render(<TableHeader headers={["Title", "Title2"]} />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Title2")).toBeInTheDocument();
  });
});
