import express, { json } from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import mongodb from "mongoose";
import { config } from "dotenv";
import postRoute from "./routes/post/posts.js";
import homeRoute from "./routes/home.js";
import githubRoute from "./routes/githubjobs.js";
import webScrapRoute from "./routes/similarweb/index.js";
// import userInterfaceRoute from "./UserInterface/index.js";
// import testRoute from "./routes/demo/test.js";
import swaggerDoc from "./config/swaggerDoc.js";

config();
const PORT = process.env.PORT || 80;

// Import Routes
import authRoute from "./routes/oAuth/auth.js";
import clientRoute from "./routes/client/registerClient.js";

// Connect DB
const db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@auth-cluster.gnkyo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongodb.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("DB Connection Healthy...!!! "));

// Middleware
app.use(json());
app.use(cors());
app.use(helmet());

swaggerDoc(app);
// userInterfaceRoute(app);

// Routes Middleware
app.use("/", homeRoute);
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/register", clientRoute);
app.use("/api/githubJobs", githubRoute);
app.use("/api/webScrapedData", webScrapRoute);
// app.use("/api/test", testRoute);

app.listen(PORT, () => console.log("Server Up at localhost:" + PORT));
