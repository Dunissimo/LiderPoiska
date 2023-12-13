import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

export interface IProduct {
  id: number;
  img: string;
  title: string;
  price: string;
}

export interface IBaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface IBaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
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

export type Action = {
  type: "all" | "name" | "email" | "tel" | "status";
  payload?: any;
};
