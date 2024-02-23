export const TIME_EVENTS = {
  ON_UPDATE: "ON_UPDATE",
};
type StoreModel = {
  name: string;
  keyPath: string;
};

export const STORE_NAMES = {
  RECORDING: "recording",
};

export const STORE_KEY_PATHS = {
  CHUNK_ID: "chunkId",
};

export const STORES: StoreModel[] = [
  {
    name: STORE_NAMES.RECORDING,
    keyPath: STORE_KEY_PATHS.CHUNK_ID,
  },
];
