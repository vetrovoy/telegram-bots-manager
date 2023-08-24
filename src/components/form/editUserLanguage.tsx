import { Select, Typography } from "antd";

import { useTranslate } from "../../hooks/useTranslate";
import { useTypedDispatch } from "../../hooks/useTypedSelector";
import { userActions } from "../../store/user/user";
import { IUser } from "../../types/app";

type Props = { user: IUser };

export default function EditUserLanguage({ user }: Props) {
  const dispatch = useTypedDispatch();
  const t = useTranslate();

  const handleChange = (value: "ru" | "en") => {
    const userWithChangedLang = { ...user, language: value };
    dispatch(userActions.setUser(userWithChangedLang));
  };

  return (
    <>
      <Typography.Text
        type="secondary"
        style={{ display: "inline-block", marginBottom: 16 }}
      >
        {t("Выберите язык приложения")}
      </Typography.Text>

      <Select
        defaultValue={user?.language}
        style={{ width: 190, display: "block" }}
        onChange={handleChange}
        options={[
          { value: "ru", label: t("Русский") },
          { value: "en", label: t("Английский") },
        ]}
      />
    </>
  );
}
