import { useCallback } from "react";

import { translate } from "../utils/translate";

import { useTypedSelector } from "./useTypedSelector";

export const useTranslate = () => {
  const user = useTypedSelector((state) => state.user.user);

  const t = useCallback(
    (sting: string): string => {
      return user?.language
        ? translate(sting, user.language)
        : translate(sting);
    },
    [user?.language],
  );

  return t;
};
