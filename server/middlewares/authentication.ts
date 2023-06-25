import { Request, Response, NextFunction } from "express";
import JWT from "../helpers/jwt";
import UserService from "../services/user";
import { JwtPayload } from "jsonwebtoken";

export default async function authentication(
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "Invalid Token" };

    const payload: JwtPayload = JWT.verifyToken(access_token as string);

    const user = await UserService.findOne({ _id: payload._id });

    req.user = {
      _id: user?._id,
      email: user?.email,
    };

    next();
  } catch (err) {
    next(err);
  }
}
