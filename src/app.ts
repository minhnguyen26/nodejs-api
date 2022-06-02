import cors from "cors";
import dotenv from "dotenv";
import dotenvParseVariables from "dotenv-parse-variables";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import router from "./routes";

/* ENV */
let env = dotenv.config();
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed!, { assignToProcessEnv: true });

/* CONSTANT */
const app = express();
const HOST: string = process.env.HOST || "127.0.0.1";
const PORT: number = +(process.env.PORT || 8000);

/* LOGGING */
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}

/* PASSPORT */
// require("./middlewares/passport")(passport);

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

/* STATIC */
const staticPath = path.join(__dirname, "public");
app.use("/static", express.static(staticPath));

/* ROUTING */
router(app);

/* CONNECT TO DB */
require("./configs/database")();

/* START SERVER */
app.listen(PORT, HOST, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode at http://${HOST}:${PORT}`);
});
