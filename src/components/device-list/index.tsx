import React, { useState, useEffect } from "react";
import Table from "../table";

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDeviceList(devices);
    });
  }, []);
  return (
    <div>
      <h2>My device list</h2>
      <Table devices={deviceList} />
    </div>
  );
};

export default DeviceList;
