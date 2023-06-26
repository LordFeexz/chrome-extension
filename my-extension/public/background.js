import { openDB } from "idb";

async function getDb() {
  const db = await openDB("news", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("news"))
        db.createObjectStore("news", {
          keyPath: "id",
          autoIncrement: true,
        });
    },
  });

  return db;
}

async function clearData() {
  const db = await getDb();

  const tx = db.transaction("news", "readwrite");

  const store = tx.objectStore("news");

  await store.clear();
}

async function saveData(data) {
  try {
    const db = await getDb();

    const transaction = db.transaction("news", "readwrite");

    const objectStore = transaction.objectStore("news");

    data.forEach((item) => {
      objectStore.add(item);
    });

    transaction.onerror = (e) => {
      throw { name: "Failed to save data" };
    };

    return true;
  } catch (err) {
    return false;
  }
}

