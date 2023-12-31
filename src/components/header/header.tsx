import { FC } from "react";

import logo from "../../assets/lp_logo 1.svg";
import Basket from "../../ui/basket/basket";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { selectProductsInBasket } from "../../store/slices/productsSlice";

const Header: FC = () => {
  const length = useAppSelector(selectProductsInBasket).length;

  return (
    <div className="w-full flex items-center justify-between gap-[60px] sm:gap-0 mt-[37px]">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      {length > 0 ? (
        <Link
          to="basket"
          className="transition-all hover:text-green active:scale-[.95]"
        >
          <Basket productsCount={length} />
        </Link>
      ) : (
        <Link to="/" title="Сначала добавьте товары">
          <Basket />
        </Link>
      )}
    </div>
  );
};

export default Header;
