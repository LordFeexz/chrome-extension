import { MongoClient, Db, DBRef } from "mongodb";
import { config } from "dotenv";

config();

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

let db: Db | null = null;

export default async function MongoConnect() {
  try {
    db = client.db("extension");
  } catch (err) {
    return err;
  }
}

export function getDb(): Db {
  return db as Db;
}
