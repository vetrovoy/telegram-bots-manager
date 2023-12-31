import { useEffect } from "react";

import { message } from "antd";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTranslate } from "../../../hooks/useTranslate";

export default function AppMessagesHolder() {
  const t = useTranslate();

  const bots = useTypedSelector((state) => state.bots);
  // const user = useTypedSelector((state) => state.user);

  // const [userMessageApi, userContextHolder] = message.useMessage();
  const [botsMessageApi, botsContextHolder] = message.useMessage();

  // useEffect(() => {
  //   if (user.status !== "idle") {
  //     userMessageApi.open({
  //       type: user.status,
  //       content: user.message,
  //     });

  //     return;
  //   }
  // }, [user.status]);

  useEffect(() => {
    if (bots.status !== "idle" && bots.message.length > 0) {
      botsMessageApi.open({
        type: bots.status,
        content: t(bots.message),
      });
    }
  }, [bots.status]);

  return (
    <>
      {/* {userContextHolder} */}
      {botsContextHolder}
    </>
  );
}
