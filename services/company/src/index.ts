import * as express from "express";

const app: express.Application = express();

export { app };
import "./config/";
import "./routes/";

// need a api to read company info
// need to be able to access mongodb
