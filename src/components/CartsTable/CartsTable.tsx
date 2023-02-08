import React, { useCallback, useEffect, useMemo } from "react";
import { useCarts } from "../../hooks/useCarts";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import { useCartsTableContext } from "../../context/CartsTableContext";
import InfoModal from "../InfoModal/InfoModal";

function CartsTable() {
  const { carts, fetchCarts, currentPage, setCurrentPage, hasNextPage, hasPrevPage, goToNextPage, goToPrevPage } = useCarts();
  const { cartsChanged, setCartsChanged, setActiveCart, setInfo } = useCartsTableContext();

  const cartsTable = {
    names: ["Id", "User Id", "Quantity", "Price", "Disc. Price", "Actions"],
    values: ["id", "userId", "totalProducts", "total", "discountedTotal"],
  };

  const deleteCart = useCallback(
    async (id: number) => {
      const response = await fetch(`https://dummyjson.com/carts/${id}`, {
        method: "DELETE",
      });
      if (!response?.ok) {
        setInfo({ title: "Error", message: "Something went wrong" });
        setCartsChanged(true);
      } else {
        const data = await response.json();
        setInfo({ title: "Success", message: `Cart ${data.id} deleted` });
        setCartsChanged(true);
      }
    },
    [setCartsChanged, setInfo]
  );

  const viewCart = useCallback(
    (id: number) => {
      const cartData = carts?.find((cart) => cart.id === id);
      if (cartData) {
        const cartProducts = cartData.products.map((product) => {
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            discountedPrice: product.price - (product.price * product.discountPercentage) / 100,
          };
        });
        setActiveCart({ cartId: cartData.id, products: cartProducts });
      }
    },
    [carts, setActiveCart]
  );

  const cartsTableActions = useMemo(() => {
    return [
      { name: "View", onClick: viewCart },
      { name: "Delete", onClick: deleteCart },
    ];
  }, [viewCart, deleteCart]);

  useEffect(() => {
    if (!cartsChanged) return;
    setCurrentPage(1);
    fetchCarts(1);
  }, [cartsChanged, fetchCarts, setCurrentPage]);

  return (
    <div className="max-w-[350px] lg:max-w-[250px] xl:max-w-[400px] 2xl:max-w-[500px] lg:h-[400px] flex flex-col gap-2">
      {carts && (
        <Table
          data={carts}
          name={<Table.Name title="Carts" />}
          content={
            <Table.Content>
              <Table.Header headers={cartsTable.names} />
              <Table.Body values={cartsTable.values} actions={cartsTableActions} />
            </Table.Content>
          }
        />
      )}
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
      {cartsChanged && <InfoModal />}
    </div>
  );
}

export default CartsTable;
