import React, { FC, useEffect, useState } from "react";
import { timeProvider } from "../../providers/time-provider";
import { TIME_EVENTS } from "../../constants";

const C2: FC = () => {
  const [time, setTime] = useState(timeProvider.time);
  useEffect(() => {
    return timeProvider.eventEmitter.on(TIME_EVENTS.ON_UPDATE, setTime);
  }, []);

  return (
    <>
      <span>C2 component: {time} </span>
    </>
  );
};

export default C2;
