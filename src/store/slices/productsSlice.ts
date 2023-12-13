import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../utils/types";
import { RootState } from "..";
import { products } from "../../../data.json";

interface IInitialState {
  products: IProduct[];
  productsInBasket: IProduct[];
}

const initialState: IInitialState = {
  products: products,
  productsInBasket: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Если бы была логика запроса с бэка, то я бы добавил actions
    // для работы с самими товарами. А так я использую моковые данные,
    // так что делать это не стал

    addProductToBasket: (state, action: PayloadAction<IProduct>) => {
      state.productsInBasket = [action.payload, ...state.productsInBasket];
    },
    deleteProductFromBasket: ({ products }, action: PayloadAction<number>) => {
      const index = products.findIndex((item) => item.id === action.payload);

      products = [...products.slice(0, index), ...products.slice(index)];
    },
  },
});

export const { addProductToBasket, deleteProductFromBasket } =
  productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsInBasket = (state: RootState) =>
  state.products.productsInBasket;

export default productsSlice.reducer;
