import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TAddCartContext, TCartProduct, TNewCart, TProduct } from "../types";

const AddCartContext = createContext<TAddCartContext | null>(null);

export function AddCartContextProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<TCartProduct[]>([]);
  const [newCart, setNewCart] = useState<TNewCart | null>(null);

  const addProduct = useCallback(
    async (productId: number) => {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) throw new Error("Something went wrong");
      const product: TProduct = await response.json();
      if (products.some((p) => p.product.id === product.id)) {
        const newProducts = products.map((p) => {
          if (p.product.id === product.id) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        });
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, { product, quantity: 1 }]);
      }
    },
    [products]
  );

  const removeProduct = useCallback(
    (id: number) => {
      const newProducts = [...products];
      const index = newProducts.findIndex((p) => p.product.id === id);
      if (newProducts[index]?.quantity > 1) {
        newProducts[index].quantity -= 1;
        setProducts(newProducts);
      } else {
        newProducts.splice(index, 1);
        setProducts(newProducts);
      }
    },
    [products]
  );

  const reset = useCallback(() => {
    setProducts([]);
  }, []);

  useEffect(() => {
    const newCartProdcuts = products.map((p) => {
      return {
        id: p.product.id,
        quantity: p.quantity,
      };
    });
    setNewCart({ userId: 1, products: newCartProdcuts });
  }, [products]);

  const valueMemo = useMemo(() => ({ products, newCart, addProduct, removeProduct, reset }), [products, newCart, addProduct, removeProduct, reset]);

  return <AddCartContext.Provider value={valueMemo}>{children}</AddCartContext.Provider>;
}

export function useAddCartContext() {
  const context = useContext(AddCartContext);
  if (!context) throw new Error("useAddCartContext must be used within a AddCartContextProvider");

  return context;
}

export default AddCartContext;
