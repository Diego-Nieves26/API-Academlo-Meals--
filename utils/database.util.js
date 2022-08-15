const mogoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const MONGO_URL = process.env.MONGO_URI;

mogoose.connection.once("open", () => {
  console.log("MongoDB conection ready!");
});

mogoose.connection.on("error", (err) => {
  console.log(err);
});

const connectMongo = async () => {
  await mogoose.connect(MONGO_URL);
};

module.exports = { connectMongo };
