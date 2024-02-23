import { STORES } from "../constants";
import { createDefer } from "../defer";
import { Defer } from "../types";

const DB_NAME: string = "test-db";
const DB_VERSION: number = 1;

class DbProvider<T> {
  private db: IDBDatabase | null = null;
  isDbOpened = createDefer();

  openDB() {
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
    this.isDbOpened.reject(message);
  };

  private onupgradeneeded = async (event: IDBVersionChangeEvent) => {
    this.db = (event.target as IDBOpenDBRequest).result;
    STORES.forEach(({ name, keyPath }) => {
      if (!this.db!.objectStoreNames.contains(name)) {
        console.log(`Creating object store: ${name}`);
        this.db!.createObjectStore(name, { keyPath });
      }
    });
    this.isDbOpened.resolve();
  };

  private onsuccess = (event: Event) => {
    this.db = (event.target as IDBOpenDBRequest).result;
    this.isDbOpened.resolve();
  };

  async getItems<T>(storeName: string) {
    if (!this.db) {
      return;
    }
    const defer = createDefer<T>();

    const transaction = this.db!.transaction(storeName, "readonly");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();

    request.onsuccess = (event: Event): void => {
      defer.resolve((event.target as IDBOpenDBRequest).result as T);
    };
    request.onerror = (event: Event) => {
      defer.reject(`Error getting records from ${storeName}: ${event.target}`);
    };
    return defer.promise!;
  }

  async addItem<T>(item: T, storeName: string) {
    if (!this.db) {
      return;
    }
    const defer = createDefer<T>();

    const transaction = this.db!.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add(item);

    request.onsuccess = () => {
      defer.resolve(item);
    };
    request.onerror = (event: Event) => {
      defer.reject(`Error adding item to ${storeName}: ${event.target}`);
    };
    return defer.promise!;
  }
}

export const dbConnector = new DbProvider();
