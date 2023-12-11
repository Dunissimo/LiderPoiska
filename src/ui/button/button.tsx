import { FC, ReactNode } from "react";
import { IBaseButtonProps } from "../../utils/types";

interface IButtonProps extends IBaseButtonProps {
  children: ReactNode;
  variant?: "default";
}

const Button: FC<IButtonProps> = ({
  children,
  className,
  variant = "default",
  disabled,
  ...props
}) => {
  const variants = {
    default: `w-full bg-blue text-white transition-all px-4 py-2 ${
      disabled ? "opacity-50" : "hover:bg-green"
    }`,
  };

  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
