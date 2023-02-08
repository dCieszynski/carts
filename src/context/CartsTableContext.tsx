import React, { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
import { TCartsTableContext, TActiveChart } from "../types";

const CartsTableContext = createContext<TCartsTableContext | null>(null);

export function CartsTableContextProvider({ children }: PropsWithChildren) {
  const [cartsChanged, setCartsChanged] = useState<boolean>(false);
  const [activeCart, setActiveCart] = useState<TActiveChart | null>(null);
  const [info, setInfo] = useState({ title: "", message: "" });

  const valueMemo = useMemo(
    () => ({ cartsChanged, setCartsChanged, activeCart, setActiveCart, info, setInfo }),
    [cartsChanged, setCartsChanged, activeCart, setActiveCart, info, setInfo]
  );

  return <CartsTableContext.Provider value={valueMemo}>{children}</CartsTableContext.Provider>;
}

export function useCartsTableContext() {
  const context = useContext(CartsTableContext);
  if (!context) throw new Error("useCartsTableContext must be used within a CartsTableContextProvider");

  return context;
}

export default CartsTableContext;
