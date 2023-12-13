import { FC, useState } from "react";

const Counter: FC = () => {
  const [count, setCount] = useState(1);

  const btnClass = "h-full text-center border text-[16px] font-medium";

  return (
    <div className="w-[160px] h-[40px] flex items-center ml-[55px]">
      <button
        className={
          btnClass + " w-[50%] text-[24px] hover:bg-blue hover:text-white"
        }
        onClick={() =>
          setCount((prev) => {
            return prev - 1 < 1 ? prev : prev - 1;
          })
        }
      >
        &minus;
      </button>
      <button disabled className={btnClass + " w-[100%]"}>
        {count}
      </button>
      <button
        className={
          btnClass + " w-[50%] text-[24px] hover:bg-blue hover:text-white"
        }
        onClick={() =>
          setCount((prev) => {
            return prev + 1 > 10 ? prev : prev + 1;
          })
        }
      >
        &#43;
      </button>
    </div>
  );
};

export default Counter;
