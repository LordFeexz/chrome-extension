import Controller from "../controllers/news";
import authentication from "../middlewares/authentication";
import BaseRoutes from "./base";

class NewsRoutes extends BaseRoutes {
  routes(): void {
    this.router
      .use(authentication)
      .get("/", Controller.getHeadlineNews);
  }
}

export default new NewsRoutes().router;
