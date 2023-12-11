import { FC } from "react";
import { useUrl } from "../../utils/hooks";
import Button from "../button/button";
import { IBaseCardProps } from "../../utils/types";

interface ICatalogCardProps extends IBaseCardProps {}

const CatalogCard: FC<ICatalogCardProps> = ({
  card,
  className,
  isInBusket = false,
  ...props
}) => {
  const { img, title, price } = card;

  const imgSource = useUrl("products/" + img);

  return (
    <div
      className={`w-full flex flex-col justify-between gap-[15px] relative border border-[#dedede] bg-white pt-[10px] px-[20px] pb-[65px] cursor-pointer lg:[&>.btn]:hover:opacity-100 ${className}`}
      {...props}
    >
      <img
        className="max-w-[200px] max-h-[200px] mx-auto"
        src={imgSource}
        alt=""
      />
      <span className="title text text-center mt-[19px]">{title}</span>
      <span className="text-[18px] font-bold text-center">{price} ₽</span>

      <Button
        className={`btn absolute scale-90 bottom-[15px] left-[50%] translate-x-[-50%] text-[14px] lg:opacity-0 transition-all duration-300 uppercase tracking-[0.6px] ${
          isInBusket ? "bg-green" : "bg-blue"
        }`}
      >
        {isInBusket ? "В корзине" : "добавить в корзину"}
      </Button>
    </div>
  );
};

export default CatalogCard;
