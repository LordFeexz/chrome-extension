import * as yup from "yup";
import BaseValidation from "./base";
import { user } from "../interfaces/model";

export default class UserValidation extends BaseValidation {
  public static async validateUserCreate(data: user): Promise<user | void> {
    try {
      return await this.validate(
        yup.object().shape({
          email: yup
            .string()
            .required("please input email")
            .email("please use email format"),
          password: yup
            .string()
            .required("please input password")
            .test(
              "lowercase test",
              "password must contain lowercase character",
              (val) => /^(?=.*[a-z])/.test(val)
            )
            .test(
              "uppercase test",
              "password must contain uppercase character",
              (val) => /(?=.*[A-Z])/.test(val)
            )
            .test(
              "numeric test",
              "password must contains numeric character",
              (val) => /(?=.*[0-9])/.test(val)
            )
            .test(
              "symbol test",
              "password must contain symbol character",
              (val) => /(?=.*[!@#$%^&*])/.test(val)
            ),
        }),
        data
      );
    } catch (err) {
      this.errorHandler(err);
    }
  }
}
