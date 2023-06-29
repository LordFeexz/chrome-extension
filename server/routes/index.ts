import DecryptBody from "../middlewares/verifyBody";
import VerifyQuery from "../middlewares/verifyQuery";
import authRoutes from "./auth";
import BaseRoutes from "./base";
import NewsRoutes from "./news";

class Routes extends BaseRoutes {
  routes(): void {
    this.router
      //verifying req.query
      .use(VerifyQuery)
      //decrypting req.body and verifying
      .use(DecryptBody)
      .use("/auth", authRoutes)
      .use("/news", NewsRoutes);
  }
}

export default new Routes().router;
