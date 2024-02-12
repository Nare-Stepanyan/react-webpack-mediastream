import React, { useState, useEffect } from "react";
import C1 from "../C1";
import { timeProvider } from "../../providers/time-provider";

const Time = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      timeProvider.setTime(timeProvider.time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <C1 />
    </>
  );
};

export default Time;
