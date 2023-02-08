import { screen, render } from "@testing-library/react";
import Pagination from "../../../components/Pagination/Pagination";

describe("Pagination", () => {
  test("renders", () => {
    render(<Pagination currentPage={1} hasNextPage={false} hasPrevPage={false} goToNextPage={() => {}} goToPrevPage={() => {}} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders with prev page", () => {
    render(<Pagination currentPage={2} hasNextPage={false} hasPrevPage={true} goToNextPage={() => {}} goToPrevPage={() => {}} />);
  });

  test("renders with next page", () => {
    render(<Pagination currentPage={1} hasNextPage={true} hasPrevPage={false} goToNextPage={() => {}} goToPrevPage={() => {}} />);
  });
});
