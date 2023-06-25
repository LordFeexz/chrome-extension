import { Collection } from "mongodb";
import { getDb } from "../config/mongodb";
import { user } from "../interfaces/model";

export default class UserModel {
  static getCollection(): Collection {
    return getDb().collection("users");
  }

  static async create(data: user): Promise<user> {
    try {
      await this.getCollection().insertOne(data);

      return data;
    } catch (err) {
      throw err;
    }
  }
}
