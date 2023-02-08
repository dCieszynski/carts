import React, { PropsWithChildren } from "react";

function TableContent({ children }: PropsWithChildren) {
  return <table className="bg-slate-100 w-full border-collapse">{children}</table>;
}

export default TableContent;
