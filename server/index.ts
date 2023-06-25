import { config } from "dotenv";

config();

import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import moment from "moment";
import routes from "./routes";
import ErrorHandler from "./middlewares/errorHandler";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    this.errorHandling();
  }

  protected plugins(): void {
    this.app.use(helmet({ referrerPolicy: { policy: "same-origin" } }));
    this.app.use(cors());
    morgan.token("date", (req, res, tz: any) =>
      moment().utcOffset(tz).format()
    );
    morgan.format(
      "production",
      '[:date[Asia/Jakarta]] ":method :url" :status :res[content-length] - :response-time ms'
    );
    morgan.format(
      "dev",
      '[:date[Asia/Jakarta]] ":method :url" :status :res[content-length] - :response-time ms'
    );
    this.app.use(morgan("combined"));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected routes(): void {
    this.app.use(routes);
  }

  protected errorHandling(): void {
    this.app.use(ErrorHandler);
  }
}

export default new App().app;
