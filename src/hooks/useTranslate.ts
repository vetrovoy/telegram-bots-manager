import { useCallback } from "react";

import { translate } from "../utils/translate";

import { useTypedSelector } from "./useTypedSelector";

export const useTranslate = () => {
  const lang = useTypedSelector((state) => state.user.user?.language);

  const t = useCallback(
    (sting: string): string => {
      return lang ? translate(sting, lang) : translate(sting);
    },
    [lang],
  );

  return t;
};
