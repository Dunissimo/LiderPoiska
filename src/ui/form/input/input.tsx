import { FC } from "react";
import { IBaseInputProps } from "../../../utils/types";

interface IInputProps extends IBaseInputProps {}

const Input: FC<IInputProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const variants = {
    default: "bg-white pt-[20px] pl-[26px] pb-[19px]",
  };

  return <input className={`${variants[variant]} ${className}`} {...props} />;
};

export default Input;
