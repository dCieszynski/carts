import { screen, render, waitFor } from "@testing-library/react";
import CartsTable from "../../../components/CartsTable/CartsTable";
import { vi } from "vitest";
import CartChart from "../../../components/Chart/CartChart";

vi.mock("../../../context/CartsTableContext", () => ({
  CartsTableContextProvider: ({ children }: any) => children,
  useCartsTableContext: () => ({
    carts: [
      {
        id: 1,
        products: [
          {
            product: {
              id: 1,
              name: "Product 1",
              price: 10,
            },
            quantity: 1,
          },
        ],
      },
    ],
    setActiveCart: vi.fn(),
    setInfo: vi.fn(),
    setCartsChanged: vi.fn(),
  }),
}));

vi.mock("../../../hooks/useCarts", () => ({
  useCarts: () => ({
    carts: [
      {
        id: 1,
        products: [
          {
            product: {
              id: 1,
              price: 10,
            },
            quantity: 1,
          },
        ],
        total: 10,
        discountedTotal: 5,
        userId: 1,
        totalProducts: 2,
      },
    ],
    fetchCarts: vi.fn(),
    currentPage: 1,
    setCurrentPage: vi.fn(),
    hasNextPage: false,
    hasPrevPage: false,
    goToNextPage: vi.fn(),
    goToPrevPage: vi.fn(),
  }),
}));

describe("CartsTable", () => {
  test("renders a table with the carts", () => {
    render(<CartsTable />);

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("User Id")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Disc. Price")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByText("1").length).toBe(3);
  });

  test("handles the delete cart action", async () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
      vi.spyOn(global, "fetch").mockImplementation(mockFetch);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Deleted" }),
    });

    render(<CartsTable />);

    await screen.findByText("Delete");

    screen.getByText("Delete").click();

    waitFor(() => {
      expect(screen.getByText("Deleted")).toBeInTheDocument();
    });
  });

  test("handles delete cart if error", async () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
      vi.spyOn(global, "fetch").mockImplementation(mockFetch);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "Error" }),
    });

    render(<CartsTable />);

    await screen.findByText("Delete");

    screen.getByText("Delete").click();

    waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });
});

test("handles view cart", async () => {
  render(
    <div>
      <CartsTable />
      <CartChart />
    </div>
  );

  await screen.findByText("View");

  screen.getByText("View").click();

  waitFor(() => {
    expect(screen.getByText("Cart 1 Chart")).toBeInTheDocument();
  });
});
