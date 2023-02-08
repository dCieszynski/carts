import { createContext, useContext } from "react";
import { TTableContext } from "../types";

const TableContext = createContext<TTableContext<any> | null>(null);

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) throw new Error("useTableContext must be used within a TableContextProvider");

  return context;
}

export default TableContext;
