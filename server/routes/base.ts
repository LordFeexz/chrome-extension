import { Router } from "express";
import IRoutes from "../interfaces/router";

export default abstract class BaseRoutes implements IRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}
