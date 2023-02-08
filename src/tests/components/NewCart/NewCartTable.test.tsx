import { screen, render, waitFor } from "@testing-library/react";
import NewCartTable from "../../../components/NewCart/NewCartTable";
import { vi } from "vitest";

vi.mock("../../../context/CartsTableContext", () => ({
  CartsTableContextProvider: ({ children }: any) => children,
  useCartsTableContext: () => ({
    setInfo: vi.fn(),
    setCartsChanged: vi.fn(),
  }),
}));

vi.mock("../../../context/AddCartContext", () => ({
  AddCartContextProvider: ({ children }: any) => children,
  useAddCartContext: () => ({
    products: [
      {
        product: {
          id: 1,
          title: "Product 1",
          price: 10,
        },
      },
    ],
    newCart: {
      userId: 1,
      products: [
        {
          product: {
            id: 1,
            price: 10,
          },
          quantity: 1,
        },
      ],
    },
    removeProduct: vi.fn(),
    reset: vi.fn(),
  }),
}));

describe("NewCartTable", () => {
  test("renders", () => {
    render(<NewCartTable />);
    expect(screen.getByText("New Cart")).toBeInTheDocument();
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
    expect(screen.getByText("Add Cart")).toBeInTheDocument();
  });

  test("handles add cart", async () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
      vi.spyOn(global, "fetch").mockImplementationOnce(mockFetch);
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Success" }),
    });

    render(<NewCartTable />);
    expect(screen.getByText("Add Cart")).toBeInTheDocument();

    waitFor(() => {
      screen.getByText("Add Cart").click();
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  test("handels add cart error", () => {
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

    render(<NewCartTable />);
    expect(screen.getByText("Add Cart")).toBeInTheDocument();
    screen.getByText("Add Cart").click();

    waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });
});
