import React, { useEffect } from "react";
import DropDown from "../dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  camerasSelector,
  micsSelector,
  selectedCameraSelector,
  selectedMicSelector,
} from "../../store/stream/stream-selector";
import {
  setSelectedCamera,
  setSelectedMic,
} from "../../store/stream/stream-slice";

const Settings = () => {
  const mics = useAppSelector(micsSelector) as MediaDeviceInfo[];
  const cameras = useAppSelector(camerasSelector) as MediaDeviceInfo[];
  const selectedCamera = useAppSelector(
    selectedCameraSelector
  ) as MediaDeviceInfo;
  const selectedMic = useAppSelector(selectedMicSelector) as MediaDeviceInfo;
  const dispatch = useAppDispatch();

  const handleCameraSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = cameras.findIndex(
      (camera) => camera.deviceId === e.target.value
    );
    dispatch(setSelectedCamera(cameras[index]));
  };

  const handleMicSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = mics.findIndex((mic) => mic.deviceId === e.target.value);
    dispatch(setSelectedMic(mics[index]));
  };

  return (
    <div className="centered">
      <h4>Settings</h4>
      <div className="flex justify-around ">
        <DropDown
          title="Change microphone"
          selectedOption={selectedMic}
          handleSelectOption={handleMicSelect}
          selectOptions={mics}
        />
        <DropDown
          title="Change camera"
          selectedOption={selectedCamera}
          handleSelectOption={handleCameraSelect}
          selectOptions={cameras}
        />
      </div>
    </div>
  );
};

export default Settings;
