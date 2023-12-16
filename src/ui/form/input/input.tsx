import { FC } from "react";
import { IBaseInputProps } from "../../../utils/types";
import React from "react";
import InputMask from "react-input-mask";

interface IInputProps extends IBaseInputProps {}

const Input: FC<IInputProps> = ({
  variant = "default",
  className,
  maskProps,
  ...props
}) => {
  const [value, setValue] = React.useState("");

  const variants = {
    default: "bg-white pt-[20px] pl-[26px] pb-[19px]",
  };

  if (props.type == "tel") {
    return (
      <InputMask
        className={`${variants[variant]} ${className}`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        {...maskProps!}
        {...props}
      />
    );
  }

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
