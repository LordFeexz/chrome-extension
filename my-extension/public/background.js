const baseUrl = `http://localhost:3001`;
let access_token = "";

self.addEventListener("message", (e) => {
  const { data, type } = e.data;

  if (e.data && type === "token") access_token = data;
});

async function getDb() {
  return new Promise((resolve, reject) => {
    let db;
    const request = indexedDB.open("news", 1);

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      if (!db.objectStoreNames.contains("news")) {
        db.createObjectStore("news", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      console.log({ db });
      resolve(db);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

async function clearData() {
  try {
    const db = await getDb();

    const tx = db.transaction("news", "readwrite");

    const store = tx.objectStore("news");

    await store.clear();
  } catch (err) {
    console.log(err);
  }
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

async function renewData() {
  try {
    if (!access_token) return;

    const response = await fetch(`${baseUrl}/news`, {
      headers: {
        access_token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    if (!data.articles.length) {
      throw new Error("Data not found");
    }

    await clearData();
    await saveData(data.articles);

    console.log("success");
  } catch (err) {
    console.log(err);
  }
}

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason !== chrome.runtime.OnInstalledReason.INSTALL) {
    return;
  }
  console.log("running");
});

chrome.alarms.create("schedulers", {
  periodInMinutes: 1,
  when: Date.now() + 1000,
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "schedulers") {
    await renewData();
  }
});
