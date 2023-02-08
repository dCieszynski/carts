import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { usePagination } from "../../hooks/usePagination";

describe("usePagination", () => {
  test("returns the correct pagination", () => {
    const Component = () => {
      const { currentPage, hasNextPage, hasPrevPage } = usePagination(10, 20);
      return (
        <>
          <div data-testid="page">{currentPage}</div>
          <div data-testid="hasNextPage">{hasNextPage ? "true" : "false"}</div>
          <div data-testid="hasPrevPage">{hasPrevPage ? "true" : "false"}</div>
        </>
      );
    };
    render(<Component />);
    expect(screen.getByTestId("page")).toHaveTextContent("1");
    expect(screen.getByTestId("hasNextPage")).toHaveTextContent("true");
    expect(screen.getByTestId("hasPrevPage")).toHaveTextContent("false");
  });

  test("changes the page", () => {
    const Component = () => {
      const { currentPage, goToNextPage, goToPrevPage } = usePagination(1, 30);
      return (
        <>
          <div data-testid="page">{currentPage}</div>
          <button data-testid="next" onClick={goToNextPage} />
          <button data-testid="prev" onClick={goToPrevPage}></button>
        </>
      );
    };
    render(<Component />);
    expect(screen.getByTestId("page")).toHaveTextContent("1");
    waitFor(() => {
      screen.getByTestId("next").click();
      expect(screen.getByTestId("page")).toHaveTextContent("2");
      screen.getByTestId("prev").click();
      expect(screen.getByTestId("page")).toHaveTextContent("1");
    });
  });

  test("does not change the page if there is no next page", () => {
    const Component = () => {
      const { currentPage, goToNextPage, goToPrevPage } = usePagination(1, 1);
      return (
        <>
          <div data-testid="page">{currentPage}</div>
          <button data-testid="next" onClick={goToNextPage} />
          <button data-testid="prev" onClick={goToPrevPage}></button>
        </>
      );
    };
    render(<Component />);
    expect(screen.getByTestId("page")).toHaveTextContent("1");
    waitFor(() => {
      screen.getByTestId("next").click();
      expect(screen.getByTestId("page")).toHaveTextContent("1");
      screen.getByTestId("prev").click();
      expect(screen.getByTestId("page")).toHaveTextContent("1");
    });
  });
});
