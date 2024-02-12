import React, { useEffect } from "react";
import DeviceList from "../device-list";

const Home = () => {
  useEffect(() => {
    // Prefer camera resolution nearest to 1280x720.
    const constraints = {
      audio: true,
      video: { width: 1280, height: 720 },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        console.log(mediaStream);
      })
      .catch((err) => {
        // always check for errors at the end.
        console.error(`${err.name}: ${err.message}`);
      });
  }, []);
  return (
    <div>
      <DeviceList />
    </div>
  );
};

export default Home;
