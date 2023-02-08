import { screen, render, renderHook, act } from "@testing-library/react";
import { AddCartContextProvider, useAddCartContext } from "../../context/AddCartContext";
import { vi } from "vitest";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.spyOn(global, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AddCartContextProvider", () => {
  test("adds a product to the cart", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => ({
        id: 1,
        name: "Product 1",
        price: 10,
      }),
    });

    const wrapper = ({ children }: any) => <AddCartContextProvider>{children}</AddCartContextProvider>;

    const { result } = renderHook(() => useAddCartContext(), { wrapper });

    await act(async () => {
      await result.current.addProduct(1);
    });

    expect(result.current.products).toEqual([{ product: { id: 1, name: "Product 1", price: 10 }, quantity: 1 }]);
  });

  test("adds a product to the cart if it already exists", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => ({
        id: 1,
        name: "Product 1",
        price: 10,
      }),
    });

    const wrapper = ({ children }: any) => <AddCartContextProvider>{children}</AddCartContextProvider>;

    const { result } = renderHook(() => useAddCartContext(), { wrapper });

    await act(async () => {
      await result.current.addProduct(1);
    });

    await act(async () => {
      await result.current.addProduct(1);
    });

    expect(result.current.products).toEqual([{ product: { id: 1, name: "Product 1", price: 10 }, quantity: 2 }]);
  });

  test("removes a product from the cart", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => ({
        id: 1,
        name: "Product 1",
        price: 10,
      }),
    });

    const wrapper = ({ children }: any) => <AddCartContextProvider>{children}</AddCartContextProvider>;

    const { result } = renderHook(() => useAddCartContext(), { wrapper });

    await act(async () => {
      await result.current.addProduct(1);
    });

    act(() => {
      result.current.removeProduct(1);
    });

    expect(result.current.products).toEqual([]);
  });

  test("removes a product from the cart if it has more than one quantity", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => ({
        id: 1,
        name: "Product 1",
        price: 10,
      }),
    });

    const wrapper = ({ children }: any) => <AddCartContextProvider>{children}</AddCartContextProvider>;

    const { result } = renderHook(() => useAddCartContext(), { wrapper });

    await act(async () => {
      await result.current.addProduct(1);
    });

    await act(async () => {
      await result.current.addProduct(1);
    });

    act(() => {
      result.current.removeProduct(1);
    });

    expect(result.current.products).toEqual([{ product: { id: 1, name: "Product 1", price: 10 }, quantity: 1 }]);
  });

  test("clears the cart", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => ({
        id: 1,
        name: "Product 1",
        price: 10,
      }),
    });

    const wrapper = ({ children }: any) => <AddCartContextProvider>{children}</AddCartContextProvider>;

    const { result } = renderHook(() => useAddCartContext(), { wrapper });

    await act(async () => {
      await result.current.addProduct(1);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.products).toEqual([]);
  });
});
