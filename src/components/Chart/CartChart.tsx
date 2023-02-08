import React from "react";
import { useCartsTableContext } from "../../context/CartsTableContext";
import DoubleLineCartChart from "./DoubleLineChart";

function CartChart() {
  const { activeCart } = useCartsTableContext();

  return (
    <div className="w-full max-w-[960px]">
      <h2 className="text-xl font-semibold">Cart {activeCart?.cartId} Chart</h2>
      <div className="h-[400px] flex justify-center items-center">
        {activeCart ? <DoubleLineCartChart data={activeCart.products} /> : <h3 className="text-3xl">No cart selected</h3>}
      </div>
    </div>
  );
}

export default CartChart;
