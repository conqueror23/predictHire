import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { app } from "../";

// read port config from env
// this part cannot using import maybe dotenv not supported?
const dotenv = require("dotenv");
const { PORT } = dotenv.config().parsed;

app.use(cors());

app.use(express.json({ limit: "50mb" }));

// parse application/json
app.use(bodyParser.json({ type: "application/*+json", limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

//listening port settings
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
