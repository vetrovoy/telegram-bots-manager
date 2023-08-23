import { useEffect } from "react";

import { message } from "antd";

import { useTypedSelector } from "../../hooks/useTypedSelector.";

export default function MessagesHolder() {
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
    if (bots.status !== "idle") {
      botsMessageApi.open({
        type: bots.status,
        content: bots.message,
      });

      return;
    }
  }, [bots.status]);

  return (
    <>
      {/* {userContextHolder} */}
      {botsContextHolder}
    </>
  );
}
