import { openDB } from "idb";
import axios from "axios";
const baseUrl = `http://localhost:3001`;

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

chrome.alarms.create("schedulers", {
  when: Date.now() + 1000,
  periodInMinutes: 1 * 60,
});

async function renewData() {
  try {
    const access_token = localStorage.getItem("access_token");
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/news`,
      headers: {
        access_token,
      },
    });

    if (!data.articles.length) throw { message: "Data not found" };

    await clearData();

    await saveData(data.articles);

    console.log("success");
  } catch (err) {
    console.log(err);
  }
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "schedulers") {
    await renewData();
  }
});
