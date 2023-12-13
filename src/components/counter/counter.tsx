import { FC } from "react";
import { useAppDispatch } from "../../utils/hooks";
import {
  addProductToBasket,
  deleteProductFromBasket,
} from "../../store/slices/productsSlice";
import { IProduct } from "../../utils/types";

interface ICounterProps {
  product: IProduct;
}

const Counter: FC<ICounterProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const btnClass = "h-full text-center border text-[16px] font-medium";

  return (
    <div className="w-[160px] h-[40px] flex items-center ml-[55px]">
      <button
        className={
          btnClass + " w-[50%] text-[24px] hover:bg-blue hover:text-white"
        }
        onClick={() => {
          if (product.count - 1 > 1) {
            dispatch(deleteProductFromBasket({ type: "one", id: product.id }));
          }
        }}
      >
        &minus;
      </button>
      <button disabled className={btnClass + " w-[100%]"}>
        {product.count}
      </button>
      <button
        className={
          btnClass + " w-[50%] text-[24px] hover:bg-blue hover:text-white"
        }
        onClick={() => {
          if (product.count + 1 <= 10) {
            dispatch(addProductToBasket(product));
          }
        }}
      >
        &#43;
      </button>
    </div>
  );
};

export default Counter;
