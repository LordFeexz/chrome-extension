import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let message: string;
  let status: number;

  switch (err.name) {
    case "Data not found":
      message = err.message || err.name;
      status = 404;
      break;
    case "Invalid Credentials":
      message = err.name;
      status = 401;
      break;
    case "Validation Error":
      message = err.message;
      status = 400;
    default:
      message = "Internal Server Error";
      status = 500;
      break;
  }

  res.status(status).json({ message });
}
