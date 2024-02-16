class DbProvider {
  private db: IDBDatabase | null;
  dbName: string;

  constructor(dbName: string, dbVersion: number) {
    this.dbName = dbName;
    this.db = null;
  }

  async openDB() {
    let db;
    const request = indexedDB.open(this.dbName);
    request.onerror = (event) => {
      console.error("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = (event) => {
      const target = event.target as IDBOpenDBRequest;
      db = target.result;
    };
  }

  async getItems(storeName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, "readonly");
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onerror = (event: any) => {
        reject(`Error getting records from ${storeName}: ${event.target}`);
      };

      request.onsuccess = (event: any) => {
        resolve(request.result);
      };
    });
  }

  async addItem(storeName: string, item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add(item);

      request.onerror = (event) => {
        reject(`Error adding item to ${storeName}: ${event.target}`);
      };

      request.onsuccess = (event) => {
        resolve();
      };
    });
  }
}

export const dbConnector = new DbProvider("test", 1);
