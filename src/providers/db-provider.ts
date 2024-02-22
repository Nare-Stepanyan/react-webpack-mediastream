const DB_NAME: string = "test-db";
const DB_VERSION: number = 1;
const STORE_NAME: string = "records";

class DbProvider {
  private db: IDBDatabase | null = null;

  async openDB() {
    if (this.db) {
      return this.db;
    }
    const indexedDB =
      window.indexedDB ||
      (window as any).mozIndexedDB ||
      (window as any).webkitIndexedDB ||
      (window as any).msIndexedDB ||
      (window as any).shimIndexedDB;

    if (!indexedDB) return;

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = this.onerror;
    request.onupgradeneeded = this.onupgradeneeded;
    request.onsuccess = this.onsuccess;
  }

  private onerror = (event: Event) => {
    const { message } = (event.target as IDBOpenDBRequest).error || {};
    console.error(`Error: ${message}`);
  };

  private onupgradeneeded = async (event: IDBVersionChangeEvent) => {
    this.db = (event.target as IDBOpenDBRequest).result;
    if (!this.db!.objectStoreNames.contains(STORE_NAME)) {
      this.db!.createObjectStore(STORE_NAME, { keyPath: "chunkId" });
    }
  };

  private onsuccess = (event: Event) => {
    return (this.db = (event.target as IDBOpenDBRequest).result);
  };

  async getItems(): Promise<any> {
    if (!this.db) {
      return;
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAll();
      console.log("success 111");

      request.onsuccess = (event: Event): void => {
        resolve((event.target as IDBOpenDBRequest).result);
      };
      request.onerror = (event: Event) => {
        reject(`Error getting records from ${STORE_NAME}: ${event.target}`);
      };
    });
  }

  async addItem(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.add(item);

      request.onsuccess = () => {
        resolve(item);
      };
      request.onerror = (event: Event) => {
        reject(`Error adding item to ${STORE_NAME}: ${event.target}`);
      };
    });
  }
}

export const dbConnector = new DbProvider();
