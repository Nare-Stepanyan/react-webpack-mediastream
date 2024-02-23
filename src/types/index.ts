export type Chunk = {
  chunkId: number;
  data: Blob;
};

export interface IDBProvider<T> {
  getItems: () => Promise<T[]>;
  addItem: <T>(item: T) => Promise<T>;
}

export type Defer<T> = {
  promise: Promise<T> | null;
  resolve: (val?: T) => void;
  reject: (err: any) => void;
  reset: () => void;
};
