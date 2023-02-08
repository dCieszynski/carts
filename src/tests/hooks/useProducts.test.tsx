import { screen, render } from "@testing-library/react";
import { useProducts } from "../../hooks/useProducts";
import { vi } from "vitest";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.spyOn(global, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useProducts", () => {
  test("returns the correct products", () => {
    const Component = () => {
      const { products } = useProducts();
      return (
        <>
          <div data-testid="products">{products && products.length > 0 ? products.length : "0"}</div>
        </>
      );
    };
    render(<Component />);
    expect(screen.getByTestId("products")).toHaveTextContent("0");
  });
});
