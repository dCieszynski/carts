/* eslint-disable import/prefer-default-export */
import { useCallback, useEffect, useMemo, useState } from "react";
import { TResponse } from "../types";
import { usePagination } from "./usePagination";

export const useProducts = () => {
  const [productsResponse, setProductsResponse] = useState<TResponse | null>(null);
  const perPage = useMemo(() => 10, []);
  const { currentPage, hasNextPage, hasPrevPage, goToNextPage, goToPrevPage } = usePagination(perPage, productsResponse?.total || 0);

  const fetchProdcuts = useCallback(
    async (page: number) => {
      const url = `https://dummyjson.com/products/?limit=${perPage}&skip=${(page - 1) * perPage}`;
      const response = await fetch(url);
      if (response && response.ok) setProductsResponse(await response.json());
    },
    [perPage]
  );

  useEffect(() => {
    fetchProdcuts(currentPage);
  }, [currentPage, fetchProdcuts]);

  return { products: productsResponse?.products, currentPage, hasNextPage, hasPrevPage, goToNextPage, goToPrevPage };
};
