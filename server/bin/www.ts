import MongoConnect from "../config/mongodb";
import app from "..";

const port = process.env.PORT || 3000;

MongoConnect()
  .then(() => {
    app.listen(port, () =>
      console.log(`example app listening on port ${port}`)
    );
  })
  .catch((err) => console.log(err));
