import { store } from "../store";
import { setCameras, setMics, setSpeakers } from "../store/stream/stream-slice";

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
      console.log(devices, "devices");
      this.setAllDevices(devices);
    });
  }
  setAllDevices(devices: MediaDeviceInfo[]) {
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const mics = devices.filter((device) => device.kind === "audioinput");
    const speakers = devices.filter((device) => device.kind === "audiooutput");

    this.dispatch(setCameras(cameras));
    this.dispatch(setMics(mics));
    this.dispatch(setSpeakers(speakers));
  }
}

export const mediaProvider = new MediaProvider(store.dispatch);
