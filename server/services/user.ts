import { user } from "../interfaces/model";
import UserModel from "../models/user";
import Bcrypt from "../helpers/bcrypt";

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
}
