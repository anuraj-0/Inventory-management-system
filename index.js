require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const dbConnection = require("./db/db");
const itemAPI = require("./routes/itemAPI");
const PORT = 3000;
const app = express();

app.use(express.json());

const startServer = async function () {
  try {
    await dbConnection();

    app.get("/", function (req, res) {
      res.send("Welcome to the JBD Inventory System");
    });

    app.use(itemAPI);

    app.listen(PORT, function () {
      logger.info(`Server is running on https://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("Error starting server:", err.message);
  }
};

startServer();
