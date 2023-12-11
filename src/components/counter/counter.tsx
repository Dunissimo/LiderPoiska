import { FC, useState } from "react";

const Counter: FC = () => {
  const [count, setCount] = useState(1);

  const name = "h-full text-center border text-[16px] font-medium";

  return (
    <div className="w-[160px] h-[40px] flex items-center">
      <button
        className={name + " w-[50%] text-[24px] hover:bg-blue hover:text-white"}
        onClick={() => setCount((prev) => (prev += 1))}
      >
        &#43;
      </button>
      <button disabled className={name + " w-[100%]"}>
        {count}
      </button>
      <button
        className={name + " w-[50%] text-[24px] hover:bg-blue hover:text-white"}
        onClick={() => setCount((prev) => (prev -= 1))}
      >
        &minus;
      </button>
    </div>
  );
};

export default Counter;
