import { JwtPayload, Secret, sign, verify } from "jsonwebtoken";

const secret = process.env.SECRET as Secret;

export default class JWT {
  public static createToken(payload: object): string {
    return sign(payload, secret);
  }

  public static verifyToken(token: string): JwtPayload {
    return verify(token, secret) as JwtPayload;
  }
}
