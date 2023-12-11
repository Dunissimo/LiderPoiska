import { FC } from "react";
import { IBaseCardProps } from "../../utils/types";
import { useUrl } from "../../utils/hooks";
import Counter from "../../components/counter/counter";

interface IBasketCardProps extends IBaseCardProps {}

const BasketCard: FC<IBasketCardProps> = ({ card, className, ...props }) => {
  const { img, title, price } = card;

  const imgSource = useUrl("products/" + img);
  const text = title.split("<br>");

  return (
    <div
      className={`w-full flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between py-[40px] lg:pr-[30px] border-b border-b-[#a8afbb] ${className}`}
      {...props}
    >
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
        <img className="max-w-[150px] lg:mr-[57px]" src={imgSource} alt="" />
        <span className="w-[260px] mt-[10px] text-center lg:text-left">
          {text.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </span>
      </div>

      <Counter />

      <span className="ml-[50px] text-[18px] font-bold">{price} ₽</span>

      <button className="hidden lg:block h-[40px] mr-[-18px] px-[10px] hover:bg-blue hover:text-white">
        &#x2715;
      </button>

      <button className="lg:hidden h-[40px] px-[10px] bg-blue text-white hover:bg-green">
        &#x2715; Удалить
      </button>
    </div>
  );
};

export default BasketCard;
