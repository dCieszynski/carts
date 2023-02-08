import React from "react";

type Props = {
  onClick?: () => void;
  title: string;
};

const defaultProps = {
  onClick: undefined,
};

function PaginationButton({ onClick, title }: Props) {
  return (
    <button type="button" onClick={onClick} className={`px-2 border-2 border-blue-300 rounded ${onClick ? "bg-blue-300" : "bg-blue-500"}`}>
      {title}
    </button>
  );
}

PaginationButton.defaultProps = defaultProps;

export default PaginationButton;
