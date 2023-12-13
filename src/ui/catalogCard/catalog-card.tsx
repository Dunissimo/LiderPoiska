import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useUrl } from "../../utils/hooks";
import Button from "../button/button";
import { IBaseCardProps } from "../../utils/types";
import {
  addProductToBasket,
  deleteProductFromBasket,
  selectProductsInBasket,
} from "../../store/slices/productsSlice";

interface ICatalogCardProps extends IBaseCardProps {}

const CatalogCard: FC<ICatalogCardProps> = ({ card, className, ...props }) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectProductsInBasket);
  const { img, title, price, id } = card;
  const [isInBasket, setIsInBasket] = useState(false);

  useEffect(() => {
    if (!basket.find((item) => item.id == id)) {
      setIsInBasket(false);
      return;
    }

    setIsInBasket(true);
  }, [basket, id]);

  const imgSource = useUrl("products/" + img);
  const text = title.split("<br>");

  return (
    <div
      className={`w-[270px] sm:w-[450px] lg:w-[270px] lg:h-[380px] flex flex-col justify-between gap-[15px] relative border border-[#dedede] bg-white pt-[10px] px-[20px] pb-[65px] cursor-pointer lg:[&>.title]:hover:mt-[-1rem] lg:[&>.btn]:hover:opacity-100 ${className}`}
      {...props}
    >
      <img
        className="max-w-[200px] max-h-[200px] mx-auto"
        src={imgSource}
        alt=""
      />
      <span className="title min-h-[63px] text text-center mt-[18px] mb-[2px]">
        {text.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </span>
      <span className="text-[18px] ml-[12px] font-bold text-center">
        {price} ₽
      </span>

      <Button
        onClick={() => {
          if (isInBasket) {
            dispatch(deleteProductFromBasket({ type: "all", id }));
          } else {
            dispatch(addProductToBasket(card));
          }
        }}
        className={`btn absolute scale-90 bottom-[15px] left-[50%] translate-x-[-50%] text-[14px] lg:opacity-0 transition-all duration-300 uppercase tracking-[0.6px] active:scale-[.85] ${
          isInBasket ? "bg-green" : "bg-blue"
        }`}
      >
        {isInBasket ? "В корзине" : "добавить в корзину"}
      </Button>
    </div>
  );
};

export default CatalogCard;
