import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const streamSelector = (state: RootState) => state.stream;

export const selectedMicSelector = createSelector(
  streamSelector,
  (stream) => stream.micInfo.selectedMic
);
export const selectedCameraSelector = createSelector(
  streamSelector,
  (stream) => stream.cameraInfo.selectedCamera
);
export const selectedSpeakerSelector = createSelector(
  streamSelector,
  (stream) => stream.speakerInfo.selectedSpeaker
);
export const micsSelector = createSelector(
  streamSelector,
  (stream) => stream.micInfo.mics
);
export const camerasSelector = createSelector(
  streamSelector,
  (stream) => stream.cameraInfo.cameras
);
export const speakersSelector = createSelector(
  streamSelector,
  (stream) => stream.speakerInfo.speakers
);
