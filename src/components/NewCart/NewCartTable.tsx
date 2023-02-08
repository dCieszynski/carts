import React, { useMemo } from "react";
import { useAddCartContext } from "../../context/AddCartContext";
import Table from "../Table/Table";
import NewCartTableBody from "./NewCartTableBody";
import { useCartsTableContext } from "../../context/CartsTableContext";
import Button from "../Button/Button";

function NewCartTable() {
  const { products, newCart, removeProduct, reset } = useAddCartContext();
  const { setCartsChanged, setInfo } = useCartsTableContext();

  const newCartTable = {
    names: ["Id", "Title", "Price", "Quantity", "Total", "Actions"],
    values: ["id", "title", "price"],
  };

  const newCartTableActions = useMemo(() => {
    return [{ name: "Remove", onClick: removeProduct }];
  }, [removeProduct]);

  const addNewCart = async () => {
    const response = await fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCart),
    });
    if (!response.ok) {
      setInfo({ title: "Error", message: "Something went wrong" });
      setCartsChanged(true);
    } else {
      const data = await response.json();
      setInfo({ title: "Success", message: `Cart ${data.id} added` });
      reset();
      setCartsChanged(true);
    }
  };

  return (
    <div className="max-w-[350px] lg:max-w-[256px] xl:max-w-[400px] 2xl:max-w-[500px] lg:h-[400px] overflow-auto flex flex-col gap-3">
      <Table
        data={products}
        name={<Table.Name title="New Cart" />}
        content={
          <Table.Content>
            <Table.Header headers={newCartTable.names} />
            <NewCartTableBody values={newCartTable.values} actions={newCartTableActions} />
          </Table.Content>
        }
      />
      {products.length > 0 && <Button onClick={addNewCart} title="Add Cart" />}
      {products.length === 0 && <p className="text-center">There are no products in the cart</p>}
    </div>
  );
}

export default NewCartTable;
