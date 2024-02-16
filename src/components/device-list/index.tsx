import React, { useState, useEffect } from "react";
import Table from "../table";
import { mediaProvider } from "../../providers/media-provider";
import { useAppSelector } from "../../hooks";
import {
  camerasSelector,
  micsSelector,
  speakersSelector,
} from "../../store/stream/stream-selector";

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const mics = useAppSelector(micsSelector) as MediaDeviceInfo[];
  const cameras = useAppSelector(camerasSelector) as MediaDeviceInfo[];
  const speakers = useAppSelector(speakersSelector) as MediaDeviceInfo[];
  useEffect(() => {
    const combinedDevices = [...mics, ...cameras, ...speakers];
    setDeviceList(combinedDevices);
  }, [mics, cameras, speakers]);

  return (
    <div>
      <h2>My device list</h2>
      <Table devices={deviceList} />
    </div>
  );
};

export default DeviceList;
