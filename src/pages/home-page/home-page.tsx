import { FC } from "react";

import CatalogCard from "../../ui/catalogCard/catalog-card";
import { useAppSelector } from "../../utils/hooks";
import { selectProducts } from "../../store/slices/productsSlice";

const HomePage: FC = () => {
  const data = useAppSelector(selectProducts);

  return (
    <div className="container">
      <h2 className="heading-1 pl-[16px] mt-[60px] mb-[40px]">
        Каталог товаров
      </h2>

      <div className="w-fit mx-auto grid justify-items-center grid-col-one lg:grid-cols-three xxl:grid-cols-four gap-x-[30px] gap-y-[40px]">
        {data.map((item) => (
          <CatalogCard card={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
