import React from "react";
import { useTableContext } from "../../context/TableContext";
import TableAction from "../Table/TableAction";

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

function NewCartTableBody({ values, actions }: Props) {
  const { data } = useTableContext();

  return (
    <tbody>
      {data &&
        data.map((el) => (
          <tr key={el.product.id} className="border-b-2 border-blue-300">
            {values.map((value) => (
              <td key={value} className="text-center px-4 py-2">
                {el.product[value]}
              </td>
            ))}
            <td className="text-center px-4 py-2">{el.quantity}</td>
            <td className="text-center px-4 py-2">{el.product.price * el.quantity}</td>
            <td className="text-center align-middle">
              {actions &&
                actions.map((action) => <TableAction key={action.name} name={action.name} onClick={action.onClick} dataId={el.product.id} />)}
            </td>
          </tr>
        ))}
    </tbody>
  );
}

NewCartTableBody.defaultProps = defaultProps;

export default NewCartTableBody;
