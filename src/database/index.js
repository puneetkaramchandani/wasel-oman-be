const mongoose = require("mongoose");

async function connectToDatabase() {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.SERVER_DB_HOST, {
    dbName: process.env.SERVER_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const database = mongoose.connection;
  database.on("error", console.error.bind(console, "Connection Error"));
  database.once("open", () => {
    console.log("Database Connected");
  });
}

module.exports = connectToDatabase;
