class StreamProvider {
  stream: MediaStream | null = null;

  async createStream(mic: MediaDeviceInfo, camera: MediaDeviceInfo) {
    try {
      return (this.stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: camera.deviceId },
        audio: { deviceId: mic.deviceId },
      }));
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }

  startStream(mic: MediaDeviceInfo | null, camera: MediaDeviceInfo | null) {
    if (this.stream) {
      this.stopStream();
    }
    if (!mic || !camera) {
      return;
    }
    return this.createStream(mic, camera);
  }
  stopStream() {
    if (this.stream) {
      this.stream
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
      this.stream = null;
    }
    return this.stream;
  }
}

export const streamProvider = new StreamProvider();
