import express from "express";
import morgan from "morgan";
import routes from "./router/router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
