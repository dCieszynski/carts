import { screen, render, waitFor } from "@testing-library/react";
import InfoModal from "../../../components/InfoModal/InfoModal";
import CartsTableContext, { CartsTableContextProvider } from "../../../context/CartsTableContext";
import { vi } from "vitest";

describe("InfoModal", () => {
  test("renders", () => {
    render(
      <CartsTableContextProvider>
        <InfoModal />
      </CartsTableContextProvider>
    );
  });

  test("renders button", () => {
    render(
      <CartsTableContextProvider>
        <InfoModal />
      </CartsTableContextProvider>
    );

    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  test("handles button click", () => {
    const setCartsChanged = vi.fn();

    render(
      <CartsTableContext.Provider value={{ info: { title: "title", message: "message" }, setCartsChanged } as any}>
        <InfoModal />
      </CartsTableContext.Provider>
    );

    screen.getByText("OK").click();

    waitFor(() => {
      expect(setCartsChanged).toHaveBeenCalledTimes(1);
    });
  });
});
