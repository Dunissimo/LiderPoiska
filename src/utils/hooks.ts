export const useUrl = (url: string) => {
  if (/undefined/.test(new URL(`../assets/${url}`, import.meta.url).href)) {
    // TODO: сделаь notFound картинку
    return "";
  } else {
    return new URL(`../assets/${url}`, import.meta.url).href;
  }
};
