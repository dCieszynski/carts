import React, { useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import { useAddCartContext } from "../../context/AddCartContext";

function ProductsTable() {
  const { products, currentPage, hasNextPage, hasPrevPage, goToNextPage, goToPrevPage } = useProducts();
  const { addProduct } = useAddCartContext();

  const productsTable = {
    names: ["Id", "Brand", "Title", "Price", "Rating", "Actions"],
    values: ["id", "brand", "title", "price", "rating"],
  };

  const productsTableActions = useMemo(() => {
    return [{ name: "Add", onClick: addProduct }];
  }, [addProduct]);

  return (
    <div className="max-w-[350px] lg:max-w-[256px] xl:max-w-[400px] 2xl:max-w-[500px] lg:h-[400px] flex flex-col gap-2">
      {products && (
        <Table
          data={products}
          name={<Table.Name title="Products" />}
          content={
            <Table.Content>
              <Table.Header headers={productsTable.names} />
              <Table.Body values={productsTable.values} actions={productsTableActions} />
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
    </div>
  );
}

export default ProductsTable;
