import React from "react";
import { AddCartContextProvider } from "../../context/AddCartContext";
import ProductsTable from "../ProductsTable/ProductsTable";
import NewCartTable from "../NewCart/NewCartTable";

function AddCart() {
  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <AddCartContextProvider>
        <ProductsTable />
        <NewCartTable />
      </AddCartContextProvider>
    </div>
  );
}

export default AddCart;
