export type TResponse = {
  products?: TProduct[];
  carts?: TCart[];
  total: number;
  skip: number;
  limit: number;
};

export type TCart = {
  id: number;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
  }[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProdcuts: number;
  totalQuantity: number;
};

export type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type TTableContext<T> = {
  data: T[];
};

export type TCartProduct = {
  product: TProduct;
  quantity: number;
};

export type TNewCart = {
  userId: number;
  products: {
    id: number;
    quantity: number;
  }[];
};

export type TAddCartContext = {
  products: TCartProduct[];
  newCart: TNewCart | null;
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (id: number) => void;
  reset: () => void;
};

export type TCartsTableContext = {
  cartsChanged: boolean;
  setCartsChanged: (value: boolean) => void;
  activeCart?: TActiveChart | null;
  setActiveCart: (cart: TActiveChart) => void;
  info: {
    title: string;
    message: string;
  };
  setInfo: (info: { title: string; message: string }) => void;
};

export type TActiveChart = {
  cartId: number;
  products: TActiveCartProduct[];
};

export type TActiveCartProduct = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
};
