import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useCarts } from "../../hooks/useCarts";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.spyOn(global, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useCarts", () => {
  test("returns the correct carts", () => {
    const Component = () => {
      const { carts } = useCarts();
      return (
        <>
          <div data-testid="carts">{carts && carts.length > 0 ? carts.length : "0"}</div>
        </>
      );
    };
    render(<Component />);
    expect(screen.getByTestId("carts")).toHaveTextContent("0");
  });

  test("fetches the carts", () => {
    const Component = () => {
      const { fetchCarts } = useCarts();
      return (
        <>
          <button data-testid="fetch" onClick={() => fetchCarts(1)} />
        </>
      );
    };
    render(<Component />);
    waitFor(() => {
      screen.getByTestId("fetch").click();
      expect(screen.getByTestId("carts")).toHaveTextContent("0");
    });
  });
});
