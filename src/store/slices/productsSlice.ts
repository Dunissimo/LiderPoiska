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
  productsInBasket: JSON.parse(localStorage.getItem("basket") || "") || [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Если бы была логика запроса с бэка, то я бы добавил actions
    // для работы с самими товарами. А так я использую моковые данные,
    // так что делать это не стал

    addProductToBasket: (state, action: PayloadAction<IProduct>) => {
      const index = state.productsInBasket.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index > -1) {
        state.productsInBasket[index].count! += 1;

        return;
      }

      state.productsInBasket = [action.payload, ...state.productsInBasket];
      localStorage.setItem("basket", JSON.stringify(state.productsInBasket));
    },
    deleteProductFromBasket: (
      state,
      action: PayloadAction<{ type: "all" | "one"; id: number }>
    ) => {
      const index = state.productsInBasket.findIndex(
        (item) => item.id === action.payload.id
      );

      if (action.payload.type == "one" && index) {
        state.productsInBasket[index].count =
          state.productsInBasket[index].count! - 1;
      }

      state.productsInBasket = state.productsInBasket.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("basket", JSON.stringify(state.productsInBasket));
    },
  },
});

export const { addProductToBasket, deleteProductFromBasket } =
  productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsInBasket = (state: RootState) =>
  state.products.productsInBasket;

export default productsSlice.reducer;
