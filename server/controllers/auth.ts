import { NextFunction, Request, Response } from "express";
import UserValidation from "../validations/user";
import UserService from "../services/user";
import { user } from "../interfaces/model";

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
}
