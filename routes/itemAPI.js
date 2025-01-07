const {
  addItem,
  getItems,
  updateItem,
  searchItem,
} = require("../controllers/itemController");
const express = require("express");
const router = express.Router();

router.post("/items", addItem);
router.get("/items", getItems);
router.put("/items/:id", updateItem);
router.get("/items/search", searchItem);

module.exports = router;
