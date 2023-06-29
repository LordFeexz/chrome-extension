import { NextFunction, Request, Response } from "express";
import { decrypt, validateCharacter } from "../helpers/encryption";

export default function DecryptBody(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const { body } = req;

    const decryptedBody: any = {};

    for (const key in body) {
      const value = body[key] as string;

      const decryptData = decrypt(value);

      if (
        !key.toLowerCase().includes("password") &&
        validateCharacter(decryptData)
      )
        throw {
          name: "Bad Request",
          message: `${key} is not allowed contains symbol`,
        };

      decryptedBody[key] = decryptData;
    }

    req.body = decryptedBody;

    next();
  } catch (err) {
    next(err);
  }
}
