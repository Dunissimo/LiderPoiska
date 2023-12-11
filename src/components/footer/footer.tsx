import { FC } from "react";

import love from "../../assets/icons/love.svg";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="flex flex-col lg:flex-row items-center justify-between mt-[60px] pt-[20px] pb-[21px] border-t border-t-[#a8afbb]">
      <p className="text-center lg:text-left text-[12px] tracking-[.13px]">
        Тестовое задание на должность младшего программиста «Лидера поиска»,
        ver. 3.0
      </p>
      <p className="flex items-center">
        Выполнил с <img className="px-1" src={love} alt="" />{" "}
        <Link
          className="underline hover:no-underline"
          to="https://github.com/Dunissimo"
          target="_blank"
        >
          Dunissimo
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
