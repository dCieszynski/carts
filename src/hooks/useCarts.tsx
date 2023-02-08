/* eslint-disable import/prefer-default-export */
import { useState, useEffect, useMemo, useCallback } from "react";
import { TResponse } from "../types";
import { usePagination } from "./usePagination";

export const useCarts = () => {
  const [cartsResponse, setCartsResponse] = useState<TResponse | null>(null);
  const perPage = useMemo(() => 10, []);
  const { currentPage, hasPrevPage, hasNextPage, setCurrentPage, goToNextPage, goToPrevPage } = usePagination(perPage, cartsResponse?.total || 0);

  const fetchCarts = useCallback(
    async (page: number) => {
      const response = await fetch(`https://dummyjson.com/carts/?limit=${perPage}&skip=${(page - 1) * perPage}`);
      if (response && response.ok) setCartsResponse(await response.json());
    },

    [perPage]
  );

  useEffect(() => {
    fetchCarts(currentPage);
  }, [currentPage, fetchCarts]);

  return {
    carts: cartsResponse?.carts,
    currentPage,
    setCurrentPage,
    hasPrevPage,
    hasNextPage,
    goToNextPage,
    goToPrevPage,
    fetchCarts,
  };
};
