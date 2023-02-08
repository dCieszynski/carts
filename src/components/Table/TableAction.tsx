import React from "react";

type Props = {
  name: string;
  dataId: number;
  onClick: (params: any) => void;
};

function TableAction({ name, dataId, onClick }: Props) {
  return (
    <button type="button" className="text-blue-800 rounded-xl px-2 py-1 mx-1" onClick={() => onClick(dataId)}>
      {name}
    </button>
  );
}

export default TableAction;
