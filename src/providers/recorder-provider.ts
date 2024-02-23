import { STORE_NAMES } from "../constants";
import { dbConnector } from "./db-provider";
import { recordingDbProvider } from "./recording-db-provider";

const CHUNK_DURATION = 2000;

class RecorderProvider {
  private recorder: MediaRecorder | null = null;
  private chunkId: number = 1;
  start(stream: MediaStream) {
    this.recorder = new MediaRecorder(stream);
    this.recorder.onstart = () => {
      console.log("Recording started");
    };
    this.recorder.ondataavailable = (event: BlobEvent) => {
      recordingDbProvider
        .addItem({
          chunkId: this.chunkId++,
          data: event.data,
        })
        .then(() => {
          console.log(`Chunk ${this.chunkId} added to the store`);
        });
    };
    this.recorder.onstop = () => {
      console.log("recording stopped");
    };
    this.recorder.start(CHUNK_DURATION);
  }
  stop() {
    if (!this.recorder) {
      return;
    }
    this.recorder.stop();
    this.recorder = null;
  }
}

export const recordProvider = new RecorderProvider();
