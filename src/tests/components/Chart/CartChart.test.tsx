import { screen, render } from "@testing-library/react";
import CartChart from "../../../components/Chart/CartChart";
import CartsTableContext from "../../../context/CartsTableContext";
import { vi } from "vitest";

const data = [
  { id: 1, title: "Product1", price: 10, discountedPrice: 5 },
  { id: 2, title: "Product2", price: 20, discountedPrice: 10 },
  { id: 3, title: "Product3", price: 30, discountedPrice: 15 },
];

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("CartChart", () => {
  test("renders", () => {
    render(
      <CartsTableContext.Provider value={{ activeCart: { cartId: 1, products: data } } as any}>
        <CartChart />
      </CartsTableContext.Provider>
    );
  });
});
