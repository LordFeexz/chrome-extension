import { openDB, IDBPDatabase } from "idb";
import News from "../interfaces/news";

export async function getIdb(): Promise<IDBPDatabase<unknown>> {
  const db = await openDB("news", 1, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
      if (!database.objectStoreNames.contains("news"))
        database.createObjectStore("news", {
          keyPath: "id",
          autoIncrement: true,
        });
    },
  });

  return db;
}

export async function getData(): Promise<News[] | []> {
  try {
    const db = await getIdb();

    const tx = db.transaction("news", "readonly");

    const store = tx.objectStore("news");

    return await store.getAll();
  } catch (err) {
    return [];
  }
}

export async function saveData(data: News[]): Promise<boolean> {
  try {
    const db = await getIdb();

    const transaction = db.transaction("news", "readwrite");

    const objectStore = transaction.objectStore("news");

    data.forEach((item) => {
      objectStore.add(item);
    });

    transaction.onerror = (e: Event) => {
      throw { name: "Failed to save data" };
    };

    return true;
  } catch (err) {
    return false;
  }
}
