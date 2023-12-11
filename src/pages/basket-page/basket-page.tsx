import { FC, useReducer, useRef } from "react";
import emailjs from "@emailjs/browser";

import BasketCard from "../../ui/basketCard/basket-card";
import Button from "../../ui/button/button";
import Input from "../../ui/form/input/input";
import { ICard } from "../../utils/types";

import data from "../../../data.json";

interface IForm {
  username: string;
  tel: string;
  user_email: string;
  status: "loading" | "error" | "sended" | "idle";
}

type Action = {
  type: "all" | "name" | "email" | "tel" | "status";
  payload?: any;
};

const initialState: IForm = {
  username: "",
  tel: "",
  user_email: "",
  status: "idle",
};

const reducer = (state: IForm, action: Action) => {
  switch (action.type) {
    case "all":
      return { ...action.payload };
    case "name":
      return { ...state, username: action.payload };
    case "tel":
      return { ...state, tel: action.payload };
    case "email":
      return { ...state, user_email: action.payload };
    case "status":
      return { ...state, status: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const buttonText = {
  loading: "Заказ формируется",
  error: "Что-то пошло не так",
  sended: "Заказ успешно оформлен",
  idle: "Оформить заказ",
};

const BasketPage: FC = () => {
  const [form, dispatch] = useReducer(reducer, initialState);
  const ref = useRef<HTMLFormElement>(null);

  const submitHandler = () => {
    dispatch({ type: "status", payload: "loading" });

    if (!ref.current) return;

    emailjs
      .sendForm("service_0wnxp58", "template_fu03m8p", ref.current)
      .then((result) => {
        if (result) {
          dispatch({ type: "status", payload: "sended" });
        }
      })
      .catch((error) => {
        dispatch({ type: "status", payload: "error" });
        throw new Error(error);
      })
      .finally(() => {
        dispatch({ type: "all", payload: {} });
      });
  };

  return (
    <div>
      <h2 className="heading-1 mt-[60px] mb-[40px]">Корзина</h2>

      <div className="container">
        <div className="flex flex-wrap gap-[30px]">
          {(data.products as ICard[]).map((item) => (
            <BasketCard className="mb-[40px]" card={item} key={item.id} />
          ))}
        </div>
      </div>

      <div className="bg-[#f2f5f9] pt-[70px] pb-[76px]">
        <h2 className="heading-1">Пожалуйста, представьтесь</h2>

        <form
          ref={ref}
          action="checkout"
          method="post"
          className="w-[35%] mx-auto flex flex-col gap-[30px] mt-[30px]"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-2 [&>span]:text-red-500">
            <Input
              value={form.username}
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
              placeholder="Ваше имя"
            />
          </div>

          <div className="flex flex-col gap-2 [&>span]:text-red-500">
            <Input
              value={form.tel}
              onChange={(e) => {
                dispatch({ type: "tel", payload: e.target.value });
              }}
              name="tel"
              placeholder="Телефон"
            />
          </div>

          <div className="flex flex-col gap-2 [&>span]:text-red-500">
            <Input
              value={form.user_email}
              onChange={(e) => {
                dispatch({ type: "email", payload: e.target.value });
              }}
              name="user_email"
              placeholder="Email"
            />
          </div>

          <Input
            name="job_count"
            value={Math.floor(Math.random() * 100)}
            className="hidden"
          />

          <Button
            className="uppercase py-4 text-[14px]"
            disabled={
              !form["username"] ||
              !form["tel"] ||
              !form["user_email"] ||
              form.status == "loading" ||
              form.status == "error"
            }
          >
            {buttonText[form.status as keyof typeof buttonText]}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BasketPage;
