import Controller from "../controllers/auth";
import BaseRoutes from "./base";

class AuthRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/register", Controller.Register);
  }
}

export default new AuthRoutes().router;
