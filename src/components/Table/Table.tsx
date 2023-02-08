import React, { ReactNode, useMemo } from "react";
import TableName from "./TableName";
import TableContent from "./TableContent";
import TableContext from "../../context/TableContext";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

type Props<T> = {
  data: T[];
  name: ReactNode;
  content: ReactNode;
};

function Table<T>({ data, name, content }: Props<T>) {
  const valueMemo = useMemo(() => ({ data }), [data]);

  return (
    <TableContext.Provider value={valueMemo}>
      {name}
      <div className="w-full overflow-auto text-xs">{content}</div>
    </TableContext.Provider>
  );
}

Table.Name = TableName;
Table.Content = TableContent;
Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;
