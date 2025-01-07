const { Item, validItem } = require("../models/item");
const logger = require("../utils/logger");

const addItem = async function (req, res) {
  try {
    // Validate the incoming data with Joi
    const { error } = validItem(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message); // If validation fails, send error
    }

    // If validation passes, add the item in the database
    const item = new Item(req.body);
    await item.save();
    logger.info("Item added successfully!");
    res.send(item);
  } catch (err) {
    logger.error(`Error while saving item:${err.message}`);
    res.send(err);
  }
};

const getItems = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const items = await Item.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.send({ items: items, page: page });
    logger.info("Items fetched successfully!");
  } catch (err) {
    logger.error(`Error fetching items:${err.message}`);
    res.send(err);
  }
};

const updateItem = async function (req, res) {
  try {
    // Validate the incoming data with Joi
    const { error } = validItem(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message); // If validation fails, send error
    }

    // If validation passes, update the item in the database
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(item);
    logger.info("Items updated successfully!");
  } catch (err) {
    logger.error(`Error updating item:${err.message}`);
    res.send(err);
  }
};

const searchItem = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const searchItem = await Item.find({ name: req.query.keyword })
      .skip((page - 1) * limit)
      .limit(limit);
    res.send({ keyword: searchItem, page: page });
    logger.info("Search complete!");
  } catch (err) {
    logger.error(`Error while searching item:${err.message}`);
    res.send(err);
  }
};

module.exports = {
  addItem,
  getItems,
  updateItem,
  searchItem,
};
