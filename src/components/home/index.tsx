import React, { useEffect, useState } from "react";
import DeviceList from "../device-list";
import { dbConnector } from "./../../providers/db-provider";
import StreamComponent from "../stream-component";
import { mediaProvider } from "../../providers/media-provider";
import Settings from "../settings";
import { streamProvider } from "../../providers/stream-provider";
import { Chunk } from "../../types";
import { recordProvider } from "../../providers/recorder-provider";
import { useAppSelector } from "../../hooks";
import {
  selectedCameraSelector,
  selectedMicSelector,
} from "../../store/stream/stream-selector";

const Home = () => {
  const [isRecording, setIsRecording] = useState(true);
  const selectedMic = useAppSelector(selectedMicSelector);
  const selectedCamera = useAppSelector(selectedCameraSelector);

  useEffect(() => {
    dbConnector.openDB();
    mediaProvider.getDevices();
  }, []);

  const toggleRecording = async () => {
    const stream = await streamProvider.startStream(
      selectedMic as MediaDeviceInfo,
      selectedCamera as MediaDeviceInfo
    );
    isRecording ? recordProvider.stop() : recordProvider.start(stream!);
    setIsRecording((isRecording) => !isRecording);
  };

  const onDownload = async () => {
    const chunks = (await dbConnector.getItems()) as Chunk[];
    if (!chunks?.length) return;
    const blob = new Blob(
      chunks?.map((chunk: Chunk) => chunk.data),
      { type: "video/webm" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
  };

  return (
    <div>
      <DeviceList />
      <Settings />
      <StreamComponent />
      <div className="video-buttons">
        <button onClick={toggleRecording}>
          {isRecording ? "Stop" : "Start"}
        </button>
        <button disabled={isRecording} onClick={onDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Home;
