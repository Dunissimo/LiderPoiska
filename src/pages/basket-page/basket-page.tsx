import { FC, FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import BasketCard from "../../ui/basketCard/basket-card";
import Button from "../../ui/button/button";
import Input from "../../ui/form/input/input";
import { IForm } from "../../utils/types";
import { useAppSelector } from "../../utils/hooks";
import { selectProductsInBasket } from "../../store/slices/productsSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const buttonText = {
  pending: "Заказ формируется",
  error: "Что-то пошло не так",
  sended: "Заказ успешно оформлен",
  idle: "Оформить заказ",
};

type EmailSendStatus = "idle" | "pending" | "sended" | "error";

const BasketPage: FC = () => {
  const data = useAppSelector(selectProductsInBasket);
  const ref = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>();
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState<EmailSendStatus>("idle");

  useEffect(() => {
    setDisabled(status !== "idle");
  }, [status]);

  const submitHandler: SubmitHandler<IForm> = () => {
    if (!ref.current || status !== "idle") return;

    setStatus("pending");

    emailjs
      .sendForm("service_0wnxp58", "template_fu03m8p", ref.current)
      .then((result) => {
        if (result) {
          setStatus("sended");
        }
      })
      .catch((error) => {
        setStatus("error");
        throw new Error(error);
      })
      .finally(() => setStatus("idle"));
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
      minLength: {
        message: "Телефон должен содержать 11 цифр",
        value: 11,
      },
      maxLength: {
        message: "Телефон должен содержать 11 цифр",
        value: 11,
      },
      pattern: {
        message: "Буквы недопустимы",
        value: /^[0-9]*$/g,
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
                <Input placeholder="Ваше имя" {...field} />
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
                <Input placeholder="Телефон (вида 8-XXX-XX-XX)" {...field} />
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
              render={({ field }) => <Input placeholder="Email" {...field} />}
            />
            {errors.user_email && (
              <span className="text-red-500">{errors.user_email.message}</span>
            )}
          </div>

          <Input
            name="job_count"
            value={Math.floor(Math.random() * 100)}
            className="hidden"
          />

          <Button
            className="uppercase text-[14px] h-[60px]"
            disabled={disabled}
          >
            {buttonText[status as keyof typeof buttonText]}
            {/* Оформить заказ */}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BasketPage;
