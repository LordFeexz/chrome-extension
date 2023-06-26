import DecryptBody from "../middlewares/verifyBody";
import VerifyQuery from "../middlewares/verifyQuery";
import authRoutes from "./auth";
import BaseRoutes from "./base";
import NewsRoutes from "./news";

class Routes extends BaseRoutes {
  routes(): void {
    this.router
      .use(VerifyQuery)
      .use(DecryptBody)
      .use("/auth", authRoutes)
      .use("/news", NewsRoutes);
  }
}

export default new Routes().router;
