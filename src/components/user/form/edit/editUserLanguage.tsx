import { Select, Typography } from "antd";

import { useTranslate } from "../../../../hooks/useTranslate";
import { useTypedDispatch } from "../../../../hooks/useTypedSelector";
import { userActions } from "../../../../store/user/user";
import { IUser } from "../../../../types/app";

import style from "./style/editUserLanguage.module.css";

type EditUserLanguageProps = { user: IUser };

export default function EditUserLanguage({ user }: EditUserLanguageProps) {
  const dispatch = useTypedDispatch();
  const t = useTranslate();

  const handleChange = (value: "ru" | "en") => {
    const userWithChangedLang = { ...user, language: value };
    dispatch(userActions.setUser(userWithChangedLang));
  };

  return (
    <>
      <Typography.Text type="secondary" className={style.text}>
        {t("Выберите язык приложения")}
      </Typography.Text>

      <Select
        defaultValue={user?.language}
        className={style.select}
        onChange={handleChange}
        options={[
          { value: "ru", label: t("Русский") },
          { value: "en", label: t("Английский") },
        ]}
      />
    </>
  );
}
