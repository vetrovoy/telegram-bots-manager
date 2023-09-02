import { useState } from "react";

import { IBot, TConstructor, TConstructorButton } from "../../../types/app";

import BotConstructorButtonsForm from "./botConstructorButtonsForm";
import BotConstructorMessageForm from "./botConstructorMessageForm";

type BotConstructorProps = {
  bot: IBot;
};

export default function BotConstructor({ bot }: BotConstructorProps) {
  const [constructorForm, setConstructorForm] = useState<TConstructor>({
    message: bot.constructor?.message ? bot.constructor?.message : "",
    buttons: bot.constructor?.buttons ? bot.constructor?.buttons : [],
  });

  const onBotConstructorButtonsSave = (buttons: TConstructorButton[]) =>
    setConstructorForm((prevForm) => {
      return { ...prevForm, ...{ buttons: buttons } };
    });

  const onBotConstructorMessageSave = (message: string) =>
    setConstructorForm((prevForm) => {
      return { ...prevForm, ...{ message: message } };
    });

  console.log(constructorForm);

  return (
    <>
      <BotConstructorMessageForm
        initialMessage={constructorForm.message}
        onSave={onBotConstructorMessageSave}
      />
      <BotConstructorButtonsForm
        initialButtons={constructorForm.buttons}
        onSave={onBotConstructorButtonsSave}
      />
    </>
  );
}
