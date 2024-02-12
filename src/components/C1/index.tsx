import React, { FC, useEffect, useState } from "react";
import { timeProvider } from "../../providers/time-provider";
import { TIME_EVENTS } from "../../constants";
import C2 from "../C2";

const C1: FC = () => {
  const [time, setTime] = useState(timeProvider.time);
  useEffect(() => {
    return timeProvider.eventEmitter.on(TIME_EVENTS.ON_UPDATE, setTime);
  }, []);
  return (
    <>
      <div>C1: {time}</div>
      <C2 />
    </>
  );
};

export default C1;
