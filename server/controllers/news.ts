import axios from "axios";
import { NextFunction, Request, Response } from "express";
const headLineUrl = "https://newsapi.org/v2/top-headlines";

export default class Controller {
  public static async getHeadlineNews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { q, country = "us", language = "en" } = req.query; //getting req query and give default value if not exists
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const { data } = await axios({
        method: "GET",
        url: headLineUrl,
        params: {
          apikey: process.env.NEWS_API_KEY,
          pageSize,
          page,
          country,
          language,
          q,
        },
      }); //do external api request

      if (!data.articles.length) throw { name: "Data not found" }; //if data not found throw error

      res.status(200).json({
        totalData: data.totalResults,
        articles: data.articles,
      });
    } catch (err) {
      next(err);
    }
  }
}
