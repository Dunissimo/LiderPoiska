import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

export interface ICard {
  id: number;
  img: string;
  title: string;
  price: number;
}

export interface IBaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface IBaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
}
export interface IBaseCardProps extends HTMLAttributes<HTMLDivElement> {
  card: ICard;
  isInBusket?: boolean;
}
