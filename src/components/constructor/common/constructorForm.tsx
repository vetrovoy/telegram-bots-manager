import { useEffect, useState } from "react";

import { IBot, IConstructor, IConstructorButton } from "../../../types/app";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import ConstructorMessageForm from "../from/constructorMessageForm";

import ConstructorButtons from "./constructorButtons";

type ConstructorFormProps = {
  bot: IBot;
};

export default function ConstructorForm({ bot }: ConstructorFormProps) {
  const constructors = useTypedSelector(
    (state) => state.constructors.constructors,
  );

  const [constructorForm, seiConstructorForm] = useState<IConstructor>({
    id: -1,
    name: "",
    message: "",
    buttons: [],
    bot_id: -1,
    user_id: -1,
  });

  useEffect(() => {
    (async function () {
      const constructor = constructors.find(
        (constructor) => constructor.bot_id === bot.id,
      );
      if (constructor) {
        seiConstructorForm(constructor);
      }
    })();
  }, [bot.id, constructors]);

  const onConstructorButtonsSave = (buttons: IConstructorButton[]) =>
    seiConstructorForm((prevForm) => {
      return { ...prevForm, ...{ buttons: buttons } };
    });

  const onConstructorMessageSave = (message: string) =>
    seiConstructorForm((prevForm) => {
      return { ...prevForm, ...{ message: message } };
    });

  return (
    <>
      {constructorForm.id > 0 ? (
        <>
          <ConstructorMessageForm
            initialMessage={constructorForm.message}
            onSave={onConstructorMessageSave}
          />
          <ConstructorButtons
            initialButtons={constructorForm.buttons}
            onSave={onConstructorButtonsSave}
          />
        </>
      ) : (
        "Сценарии отсутствуют"
      )}
    </>
  );
}
