import { PORT } from "./config/constants";
import { employeeRouter } from "./routes";
import mongoose from "mongoose";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

var app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/resource-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors());
app.get("/products", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.use("/employees", employeeRouter);
