import { createSlice } from "@reduxjs/toolkit";

type StreamState = {
  cameraInfo: {
    selectedCamera: MediaDeviceInfo | null;
    cameras: MediaDeviceInfo[];
  };
  micInfo: {
    selectedMic: MediaDeviceInfo | null;
    mics: MediaDeviceInfo[];
  };
  speakerInfo: {
    selectedSpeaker: MediaDeviceInfo | null;
    speakers: MediaDeviceInfo[];
  };
};

const initialState: StreamState = {
  cameraInfo: {
    selectedCamera: null,
    cameras: [],
  },
  micInfo: {
    selectedMic: null,
    mics: [],
  },
  speakerInfo: {
    selectedSpeaker: null,
    speakers: [],
  },
};

const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setCameras: (state, action) => {
      state.cameraInfo.cameras = action.payload;
    },
    setSelectedCamera: (state, action) => {
      state.cameraInfo.selectedCamera = action.payload;
    },
    setMics: (state, action) => {
      state.micInfo.mics = action.payload;
    },
    setSelectedMic: (state, action) => {
      state.micInfo.selectedMic = action.payload;
    },
    setSpeakers: (state, action) => {
      state.speakerInfo.speakers = action.payload;
    },
    setSelectedSpeaker: (state, action) => {
      state.speakerInfo.selectedSpeaker = action.payload;
    },
  },
});

export const {
  setCameras,
  setSelectedCamera,
  setMics,
  setSelectedMic,
  setSpeakers,
  setSelectedSpeaker,
} = streamSlice.actions;

export default streamSlice.reducer;
