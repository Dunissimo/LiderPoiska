import { FC } from "react";

import CatalogCard from "../../ui/catalogCard/catalog-card";
import { ICard } from "../../utils/types";

import data from "../../../data.json";

const HomePage: FC = () => {
  return (
    <div>
      <h2 className="heading-1 mt-[60px] mb-[40px]">Каталог товаров</h2>

      <div className="container flex">
        <div className="flex flex-wrap justify-center gap-x-[30px] gap-y-[40px]">
          {(data.products as ICard[]).map((item) => (
            <CatalogCard
              className="w-full sm:w-[70%] md:w-[47%] lg:w-[31%] xl:w-[23%]"
              card={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
