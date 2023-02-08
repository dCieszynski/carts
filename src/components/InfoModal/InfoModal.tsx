import React from "react";
import { useCartsTableContext } from "../../context/CartsTableContext";
import Button from "../Button/Button";

function InfoModal() {
  const { info, setCartsChanged } = useCartsTableContext();
  document.body.style.overflow = "hidden";

  const closeModal = () => {
    setCartsChanged(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="fixed w-screen min-h-full top-0 left-0 backdrop-blur-sm z-50 flex justify-center items-center overflow-y-hidden">
      <div className="w-[300px] h-[200px] bg-blue-100 border-blue-500 border-2 rounded-md flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-bold z-50 mt-4">{info.title}</h2>
          <p className="text-lg z-50">{info.message}</p>
        </div>
        <Button title="OK" onClick={closeModal} />
      </div>
    </div>
  );
}

export default InfoModal;
