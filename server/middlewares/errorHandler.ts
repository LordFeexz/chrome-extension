import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let message: string;
  let status: number;
  //all errors will handle here
  switch (err.name) {
    case "Data not found":
      message = err.message || err.name;
      status = 404;
      break;
    case "Invalid Credentials":
    case "Unauthorized":
      message = err.name;
      status = 401;
      break;
    case "Validation Error":
      message = err.message;
      status = 400;
      break;
    case "Conflict":
      message = err.message;
      status = 409;
      break;
    case "Too many request":
      message = err.name;
      status = 429;
      break;
    case "Invalid Token":
    case "JsonWebTokenError":
      message = "Invalid Token";
      status = 401;
      break;
    case "Bad Request":
      message = err.message || err.name;
      status = 400;
      break;
    case "Bad Gateway":
      message = err.name;
      status = 502;
    default:
      message = "Internal Server Error";
      status = 500;
      break;
  }

  res.status(status).json({ message });
}
