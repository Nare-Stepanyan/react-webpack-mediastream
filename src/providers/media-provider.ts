import { store } from "../store";
import {
  setCameras,
  setMics,
  setSpeakers,
  setSelectedCamera,
  setSelectedMic,
  setSelectedSpeaker,
} from "../store/stream/stream-slice";

class MediaProvider {
  private isRequested = false;

  constructor(private dispatch: typeof store.dispatch) {
    navigator.mediaDevices.ondevicechange = () => {
      this.getDevices();
    };
  }

  async requestDevices(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    stream.getTracks().forEach((track) => track.stop());
  }

  async getDevices(): Promise<void> {
    if (!this.isRequested) {
      await this.requestDevices();
      this.isRequested = true;
    }
    await navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.setAllDevices(devices);
    });
  }

  setAllDevices(devices: MediaDeviceInfo[]) {
    const cameras = devices
      .filter(
        (device) =>
          device.kind === "videoinput" && device.deviceId !== "default"
      )
      .map((camera) => {
        return {
          deviceId: camera.deviceId,
          kind: camera.kind,
          label: camera.label,
        };
      });
    const mics = devices
      .filter(
        (device) =>
          device.kind === "audioinput" && device.deviceId !== "default"
      )
      .map((mic) => {
        return {
          deviceId: mic.deviceId,
          kind: mic.kind,
          label: mic.label,
        };
      });
    const speakers = devices
      .filter(
        (device) =>
          device.kind === "audiooutput" && device.deviceId !== "default"
      )
      .map((speaker) => {
        return {
          deviceId: speaker.deviceId,
          kind: speaker.kind,
          label: speaker.label,
        };
      });

    this.dispatch(setCameras(cameras));
    this.dispatch(setSelectedCamera(cameras[0]));
    this.dispatch(setMics(mics));
    this.dispatch(setSelectedMic(mics[0]));
    this.dispatch(setSpeakers(speakers));
    this.dispatch(setSelectedSpeaker(speakers[0]));
  }
}

export const mediaProvider = new MediaProvider(store.dispatch);
