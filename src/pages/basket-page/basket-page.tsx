import { FC, FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import BasketCard from "../../ui/basketCard/basket-card";
import Button from "../../ui/button/button";
import Input from "../../ui/form/input/input";
import { IForm } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  deleteProductFromBasket,
  selectProductsInBasket,
} from "../../store/slices/productsSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Popup from "../../ui/popup/popup";
import { useNavigate } from "react-router-dom";
import { handleLinkClick } from "../../utils/helpers";

const buttonText = {
  pending: "Заказ формируется",
  error: "Что-то пошло не так",
  sended: "Заказ успешно оформлен",
  idle: "Оформить заказ",
};

type EmailSendStatus = "idle" | "pending" | "sended" | "error";

const BasketPage: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProductsInBasket);
  const ref = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<IForm>();
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState<EmailSendStatus>("idle");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(isDirty ? status !== "idle" : true);
  }, [status]);

  const submitHandler: SubmitHandler<IForm> = () => {
    if (!ref.current || status !== "idle") return;

    emailjs
      .sendForm("service_0wnxp58", "template_fu03m8p", ref.current)
      .then((result) => {
        if (result) {
          setShow(true);
          setStatus("sended");
        }
      })
      .catch((error) => {
        setStatus("error");
        throw new Error(error);
      })
      .finally(() => setStatus("idle"));

    setShow(true);
  };

  const registerOptions = {
    username: {
      required: "Это обязательное поле",
      minLength: {
        message: "Слишком короткое имя",
        value: 2,
      },
    },
    tel: {
      required: "Это обязательное поле",

      pattern: {
        message: "Невалидный телефон",
        value:
          /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/g,
      },
    },
    user_email: {
      required: "Это обязательное поле",
      pattern: {
        message: "Невалидный email",
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;

    if (target.form[0].value && target.form[1].value && target.form[2].value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate("/");
    reset();
    dispatch(deleteProductFromBasket({ type: "all" }));
    document.body.style.overflow = "auto";
    handleLinkClick();
  };

  return (
    <div>
      <h2 className="heading-1 lg:pl-[16px] mt-[60px] mb-[5px]">Корзина</h2>

      <div className="container">
        <div className="flex flex-wrap">
          {data.map((item) => (
            <BasketCard card={item} key={item.id} />
          ))}
        </div>

        <span className="block w-full mt-[31px] mb-[60px] text-center lg:text-right lg:pr-[39px] text-[30px] font-bold">
          Сумма{" "}
          {data.reduce((acc, item) => {
            acc += parseInt(item.price) * item.count;
            return acc;
          }, 0)}{" "}
          ₽
        </span>
      </div>

      <div className="bg-[#f2f5f9] pt-[85px] pb-[76px] lg:pl-[12px]">
        <h2 className="text-[26px] font-bold text-center">
          Пожалуйста, представьтесь
        </h2>

        <form
          ref={ref}
          action="checkout"
          method="post"
          className="max-w-[90%] usm:max-w-[430px] mx-auto flex flex-col gap-[30px] mt-[40px]"
          onSubmit={handleSubmit(submitHandler)}
          onChange={handleChange}
        >
          <div className="flex flex-col gap-2">
            <Controller
              name="username"
              control={control}
              rules={registerOptions.username}
              render={({ field }) => (
                <Input
                  className={`${errors.username && "border border-red-500"}`}
                  placeholder="Ваше имя"
                  {...field}
                />
              )}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Controller
              name="tel"
              control={control}
              rules={registerOptions.tel}
              render={({ field }) => (
                <Input
                  className={`${errors.tel && "border border-red-500"}`}
                  type="tel"
                  maskProps={{ mask: "+7 (999) 999-99-99", maskChar: "_" }}
                  placeholder="Телефон"
                  {...field}
                />
              )}
            />
            {errors.tel && (
              <span className="text-red-500">{errors.tel.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Controller
              name="user_email"
              control={control}
              rules={registerOptions.user_email}
              render={({ field }) => (
                <Input
                  className={`${errors.user_email && "border border-red-500"}`}
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              )}
            />
            {errors.user_email && (
              <span className="text-red-500">{errors.user_email.message}</span>
            )}
          </div>

          <Input
            name="job_count"
            value={Math.floor(Math.random() * 10000)}
            className="hidden"
          />

          <Button
            type="submit"
            className="uppercase text-[14px] h-[60px]"
            disabled={disabled}
          >
            {buttonText[status as keyof typeof buttonText]}
          </Button>

          <Popup
            show={show}
            onClose={handleClose}
            title={
              <h2 className="text-[24px] font-medium text-center leading-[130%] mb-[20px]">
                Спасибо,{" "}
                <span className="font-bold">
                  {((ref.current || [])[0] as HTMLInputElement)?.value}
                </span>
                , Ваш заказ{" "}
                <span className="font-bold">
                  №{((ref.current || [])[3] as HTMLInputElement)?.value}
                </span>{" "}
                оформлен.
              </h2>
            }
          >
            <p className="leading-[130%] text-[16px]">
              В ближайшее время мы свяжемся с вами по телефону{" "}
              <span className="whitespace-nowrap font-bold">
                +7 (800) 555 - 35 - 35
              </span>{" "}
              для его подтверждения.
            </p>
          </Popup>
        </form>
      </div>
    </div>
  );
};

export default BasketPage;
