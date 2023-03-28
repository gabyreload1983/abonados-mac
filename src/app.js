import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/web/views.router.js";
import macRouter from "./routes/api/mac.router.js";
import mongoose from "mongoose";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/mac", macRouter);
app.use("/", viewsRouter);

const URI = `mongodb+srv://${process.env.MONGO_CREDENTIALS}@gabysystem.c81cfnu.mongodb.net/abonados?retryWrites=true&w=majority`;

try {
  await mongoose.connect(URI);
  console.log("Connected to Atlas mongoDB");
} catch (error) {
  console.log(error);
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port 8080"));
