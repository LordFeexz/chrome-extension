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

    if (!access_token) throw { name: "Invalid Token" }; //check if access token is exists,if not, throw error

    const payload: JwtPayload = JWT.verifyToken(access_token as string); //verify token,will throw JsonWebTokenError if signing key is invalid

    const user = await UserService.findOne({ _id: payload._id }); //search user by id

    req.user = {
      _id: user?._id,
      email: user?.email,
    };

    next();
  } catch (err) {
    next(err);
  }
}
