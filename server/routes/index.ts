import authRoutes from "./auth";
import BaseRoutes from "./base";

class Routes extends BaseRoutes {
  routes(): void {
    this.router.use("/auth", authRoutes);
  }
}

export default new Routes().router;
