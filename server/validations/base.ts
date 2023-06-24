import { Schema } from "yup";

export default class BaseValidation {
  public static async validate(schema: Schema, data: Record<any, any>) {
    return await schema.validate(data, {
      stripUnknown: true,
      abortEarly: false,
    });
  }

  public static errorHandler(err: any) {
    throw { err: err.errors, statusCode: 400 };
  }
}
