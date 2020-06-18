import mongoose, { ConnectionOptions } from "mongoose";
import env from "./config/environment";

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(env.DB.URI, dbOptions);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB is ready");
});

connection.on("error", (err) => {
  console.error(err);
  process.exit(0);
});
