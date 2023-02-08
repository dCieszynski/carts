import React from "react";
import CartsTable from "../components/CartsTable/CartsTable";
import AddCart from "../components/AddCart/AddCart";
import { CartsTableContextProvider } from "../context/CartsTableContext";
import CartChart from "../components/Chart/CartChart";

function Dashboard() {
  return (
    <div className="flex flex-col gap-2 pb-2 items-center">
      <CartsTableContextProvider>
        <CartChart />
        <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:gap-6 lg:items-start">
          <CartsTable />
          <AddCart />
        </div>
      </CartsTableContextProvider>
    </div>
  );
}

export default Dashboard;
