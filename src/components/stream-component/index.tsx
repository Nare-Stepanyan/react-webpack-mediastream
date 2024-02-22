import React, { FC, useEffect, useRef } from "react";
import { streamProvider } from "../../providers/stream-provider";
import {
  selectedCameraSelector,
  selectedMicSelector,
} from "../../store/stream/stream-selector";
import { useAppSelector } from "../../hooks";

const StreamComponent: FC = () => {
  const selectedMic = useAppSelector(selectedMicSelector);
  const selectedCamera = useAppSelector(selectedCameraSelector);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (selectedMic && selectedCamera) {
      startStream();
    }
  }, [selectedMic, selectedCamera]);

  const startStream = async () => {
    await streamProvider.startStream(
      selectedMic as MediaDeviceInfo,
      selectedCamera as MediaDeviceInfo
    );
    if (videoRef.current) {
      videoRef.current.srcObject = streamProvider.stream;
      videoRef.current.autoplay = true;
      videoRef.current.play;
    }
  };

  return (
    <>
      <div>
        <video ref={videoRef} width={640} height={360}></video>
      </div>
    </>
  );
};

export default StreamComponent;
