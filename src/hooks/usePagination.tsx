/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from "react";

export const usePagination = (perPage: number, total: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < Math.ceil(total / perPage);

  const goToNextPage = useCallback(() => {
    if (!hasNextPage) return;
    setCurrentPage((prevPage) => prevPage + 1);
  }, [hasNextPage]);

  const goToPrevPage = useCallback(() => {
    if (!hasPrevPage) return;
    setCurrentPage((prevPage) => prevPage - 1);
  }, [hasPrevPage]);

  return { currentPage, hasPrevPage, hasNextPage, setCurrentPage, goToNextPage, goToPrevPage };
};
