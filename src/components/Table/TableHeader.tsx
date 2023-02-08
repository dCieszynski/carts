import React from "react";

type Props = {
  headers: string[];
};

function TableHeader({ headers }: Props) {
  return (
    <thead>
      <tr className="font-semibold">
        {headers.map((header) => (
          <td key={header} className="bg-white sticky top-0 px-5 text-center z-10 shadow-inner-border">
            {header}
          </td>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
