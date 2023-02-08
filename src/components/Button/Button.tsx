import React from "react";

type Props = {
  onClick: () => void;
  title: string;
};

function Button({ title, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="border-2 border-blue-300 rounded-2xl w-[100px] bg-blue-950 text-white px-4 py-2">
      {title}
    </button>
  );
}

export default Button;
