import { AES, enc } from "crypto-ts";

const ENCRYPTION_KEY: string = process.env.REACT_APP_ENCRYPTION_KEY as string;

export const encrypt = (data: string): string =>
  AES.encrypt(data, ENCRYPTION_KEY).toString();

export const decrypt = (data: string): string =>
  AES.decrypt(data, ENCRYPTION_KEY).toString(enc.Utf8);

export const validateCharacter = (data: string): boolean =>
  /[^a-zA-Z0-9.,:()/_-\s@]/g.test(data);
