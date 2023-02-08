import React from "react";
import { useTableContext } from "../../context/TableContext";
import TableAction from "./TableAction";

type Props = {
  values: string[];
  actions?: {
    name: string;
    onClick: (params: any) => void;
  }[];
};

const defaultProps = {
  actions: [],
};

function TableBody({ values, actions }: Props) {
  const { data } = useTableContext();

  return (
    <tbody>
      {data &&
        data.map((el) => (
          <tr key={el.id} className="border-b-2 border-blue-300">
            {values.map((value) => (
              <td key={value} className="text-center px-4 py-2">
                {el[value]}
              </td>
            ))}
            <td className="text-center align-middle">
              {actions && (
                <div className="flex justify-center">
                  {actions.map((action) => (
                    <TableAction key={action.name} name={action.name} onClick={action.onClick} dataId={el.id} />
                  ))}
                </div>
              )}
            </td>
          </tr>
        ))}
    </tbody>
  );
}

TableBody.defaultProps = defaultProps;

export default TableBody;
