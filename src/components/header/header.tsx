import { FC } from "react";

import logo from "../../assets/lp_logo 1.svg";
import Basket from "../../ui/basket/basket";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <div className="w-full flex items-center justify-between mt-[37px]">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      <Link to="basket">
        <Basket productsCount={5} />
      </Link>
    </div>
  );
};

export default Header;
