import { MongoClient, Db } from "mongodb";
import { config } from "dotenv";

config();

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

let db: Db | null = null;

export default async function MongoConnect() {
  try {
    db = client.db("extension");
    db.collection("users").createIndex({ email: 1 }, { unique: true });
  } catch (err) {
    return err;
  }
}

export function getDb(): Db {
  return db as Db;
}
