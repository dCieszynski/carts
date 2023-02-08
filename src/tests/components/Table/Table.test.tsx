import { screen, render } from "@testing-library/react";
import Table from "../../../components/Table/Table";
import TableContent from "../../../components/Table/TableContent";
import TableHeader from "../../../components/Table/TableHeader";
import TableBody from "../../../components/Table/TableBody";

describe("Table", () => {
  test("renders the table", () => {
    render(
      <Table
        data={[
          { id: 1, title: "Title1" },
          { id: 2, title: "Title2" },
        ]}
        name={<h1>Header</h1>}
        content={
          <TableContent>
            <TableHeader headers={["Id", "Name"]} />
            <TableBody values={["id", "title"]} />
          </TableContent>
        }
      ></Table>
    );

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Title1")).toBeInTheDocument();
    expect(screen.getByText("Title2")).toBeInTheDocument();
  });
});
