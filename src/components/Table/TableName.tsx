import React from "react";

type Props = {
  title: string;
};

function TableName({ title }: Props) {
  return <h2 className="text-xl font-semibold">{title}</h2>;
}

export default TableName;
