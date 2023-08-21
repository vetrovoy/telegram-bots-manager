import { Select, Typography } from "antd";

type Props = { username: string };

export default function EditUserLanguage({ username }: Props) {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Typography.Text
        type="secondary"
        style={{ display: "inline-block", marginBottom: 16 }}
      >
        Выберите язык конструктора
      </Typography.Text>

      <Select
        defaultValue="Русский"
        style={{ width: 190, display: "block" }}
        onChange={handleChange}
        options={[
          { value: "russian", label: "Русский" },
          { value: "english", label: "Английский" },
        ]}
      />
    </>
  );
}
