import { NextFunction, Request, Response } from "express";

export default function VerifyQuery(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { query } = req;
  const verifiedQuery: any = {};
  for (const key in query) {
    const value = query[key] as string;

    verifiedQuery[key] = value.replace(/[^a-zA-Z0-9.,:_\s@]/g, "");
  }

  req.query = verifiedQuery;

  next();
}
