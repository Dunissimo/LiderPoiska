import { FC } from "react";
import { IBaseInputProps } from "../../../utils/types";
import React from "react";

interface IInputProps extends IBaseInputProps {}

const Input: FC<IInputProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const [value, setValue] = React.useState("");

  const variants = {
    default: "bg-white pt-[20px] pl-[26px] pb-[19px]",
  };

  return (
    <input
      className={`${variants[variant]} ${className}`}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      {...props}
    />
  );
};

export default Input;
