import { compareSync, hashSync } from "bcryptjs";

export default class Bcrypt {
  public static hash(data: string): string {
    return hashSync(data, 10);
  }

  public static compare(data: string, hashData: string): boolean {
    return compareSync(data, hashData);
  }
}
