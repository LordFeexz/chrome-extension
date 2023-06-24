import { NextFunction, Request, Response } from "express";
import UserValidation from "../validations/user";
import UserService from "../services/user";
import { user } from "../interfaces/model";
import Bcrypt from "../helpers/bcrypt";
import JWT from "../helpers/jwt";

export default class Controller {
  public static async Register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserValidation.validateUserCreate({ email, password });

      await UserService.createUser(user as user);

      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }

  public static async Login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserService.findOne({ email });

      if (!user) throw { name: "Invalid Credentials" };

      if (!Bcrypt.compare(password, user.password))
        throw { name: "Invalid Credentials" };

      const access_token = JWT.createToken({
        email,
        _id: user._id,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}
