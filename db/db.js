const mongoose = require("mongoose");
const logger = require("../utils/logger");

const dbUrl = process.env.DBURL;

const dbConnection = async function () {
  try {
    await mongoose.connect(dbUrl);
    logger.info("DB connected successfully!");
  } catch (err) {
    logger.error(`Error occurred: ${err.message}`);
  }
};

module.exports = dbConnection;
