import { screen, render } from "@testing-library/react";
import ProductsTable from "../../../components/ProductsTable/ProductsTable";
import { vi } from "vitest";

vi.mock("../../../context/AddCartContext", () => ({
  AddCartContextProvider: ({ children }: any) => children,
  useAddCartContext: () => ({
    addProduct: vi.fn(),
  }),
}));

vi.mock("../../../hooks/useProducts", () => ({
  useProducts: () => ({
    products: [
      {
        id: 1,
        title: "Product 1",
        price: 10,
      },
    ],
    fetchProducts: vi.fn(),
    currentPage: 1,
    setCurrentPage: vi.fn(),
    hasNextPage: false,
    hasPrevPage: false,
    goToNextPage: vi.fn(),
    goToPrevPage: vi.fn(),
  }),
}));

describe("ProductsTable", () => {
  test("renders", () => {
    render(<ProductsTable />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
