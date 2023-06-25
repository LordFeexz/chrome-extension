import MongoConnect from "../config/mongodb";
import app from "..";

const port = process.env.PORT || 3001;

MongoConnect()
  .then(() => {
    console.log("success connect to db");
    app.listen(port, () =>
      console.log(`example app listening on port ${port}`)
    );
  })
  .catch((err) => console.log(err));
