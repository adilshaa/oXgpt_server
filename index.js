import Express, { json } from "express";
import { Routers } from "./app.control.js";
import bodyParser from "body-parser";
import cors from "cors";
export const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use("/", Routers);

app.listen(8000, () => {
  console.log("server is ready" + " " + 8000);
});
