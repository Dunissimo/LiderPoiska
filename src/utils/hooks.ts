import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useUrl = (url: string) => {
  if (/undefined/.test(new URL(`../assets/${url}`, import.meta.url).href)) {
    // TODO: сделаь notFound картинку
    return "";
  } else {
    return new URL(`../assets/${url}`, import.meta.url).href;
  }
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
