import { en } from "../translations/en";

type Translation = {
  [key: string]: string;
};

export const translate = (str: string, lang: "en" | "ru" = "en"): string => {
  if (lang === "ru") return str;
  let value: string = str;

  const data: Translation = en;
  value = data[str] || str;

  return value;
};
