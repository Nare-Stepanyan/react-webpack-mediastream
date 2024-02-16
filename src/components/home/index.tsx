import React, { useEffect } from "react";
import DeviceList from "../device-list";
import Stream from "../stream-component";
import { dbConnector } from "./../../providers/db-provider";
import StreamComponent from "../stream-component";
import { mediaProvider } from "../../providers/media-provider";
import Settings from "../settings";

const Home = () => {
  useEffect(() => {
    dbConnector.openDB();
    mediaProvider.getDevices();
  }, []);
  return (
    <div>
      <DeviceList />
      <Settings />
      <StreamComponent />
    </div>
  );
};

export default Home;
