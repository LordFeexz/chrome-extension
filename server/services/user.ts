import { user } from "../interfaces/model";
import UserModel from "../models/user";
import Bcrypt from "../helpers/bcrypt";
import { WithId } from "mongodb";

export default class UserService {
  public static async createUser(data: user): Promise<user | void> {
    try {
      const { email, password } = data;
      const hashPassword = Bcrypt.hash(password);

      await UserModel.create({
        email,
        password: hashPassword,
      });

      return {
        email,
        password: hashPassword,
      };
    } catch (err) {
      throw err;
    }
  }

  public static async findOne(
    query: Record<any, any>
  ): Promise<WithId<user> | null> {
    try {
      const data = await UserModel.getCollection().findOne(query);

      return data as WithId<user>;
    } catch (err) {
      return null;
    }
  }
}
