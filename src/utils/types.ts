import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";
import { Props as MaskProps } from "react-input-mask";

export interface IProduct {
  id: number;
  img: string;
  title: string;
  price: string;
  count: number;
}

export interface IBaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface IBaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
  maskProps?: MaskProps;
}
export interface IBaseCardProps extends HTMLAttributes<HTMLDivElement> {
  card: IProduct;
  isInBusket?: boolean;
}

export interface IForm {
  username: string;
  tel: string;
  user_email: string;
  status: "loading" | "error" | "sended" | "idle";
}

export type ActionType = "username" | "user_email" | "tel" | "status";

export type Action = {
  type: ActionType;
  payload?: any;
};
