import React from "react";
import PaginationButton from "./PaginationButton";

type Props = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
};

function Pagination({ currentPage, hasNextPage, hasPrevPage, goToNextPage, goToPrevPage }: Props) {
  return (
    <div className="flex gap-[0.15rem]">
      {hasPrevPage && (
        <>
          <PaginationButton title="Prev" onClick={goToPrevPage} />
          <PaginationButton title={`${currentPage - 1}`} onClick={goToPrevPage} />
        </>
      )}
      <PaginationButton title={`${currentPage}`} />
      {hasNextPage && (
        <>
          <PaginationButton title={`${currentPage + 1}`} onClick={goToNextPage} />
          <PaginationButton title="Next" onClick={goToNextPage} />
        </>
      )}
    </div>
  );
}

export default Pagination;
