import { Chunk } from "../types";
import { STORE_NAMES } from "../constants";
import { dbConnector } from "./db-provider";

class RecordingDbProvider {
  getItems(): Promise<Chunk[] | undefined> {
    return dbConnector.getItems<Chunk[]>(STORE_NAMES.RECORDING);
  }

  async addItem(chunk: Chunk): Promise<Chunk | undefined> {
    return dbConnector.addItem<Chunk>(chunk, STORE_NAMES.RECORDING);
  }
}

export const recordingDbProvider = new RecordingDbProvider();
