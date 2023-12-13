import { FC } from "react";

import logo from "../../assets/lp_logo 1.svg";
import Basket from "../../ui/basket/basket";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { selectProductsInBasket } from "../../store/slices/productsSlice";

const Header: FC = () => {
  const length = useAppSelector(selectProductsInBasket).length;

  return (
    <div className="w-full flex items-center justify-between mt-[37px]">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      {length > 0 ? (
        <Link
          to="basket"
          className="transition-all hover:text-green  active:scale-[.95]"
        >
          <Basket productsCount={length} />
        </Link>
      ) : (
        <Basket />
      )}
    </div>
  );
};

export default Header;
