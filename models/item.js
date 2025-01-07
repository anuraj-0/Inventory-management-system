const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);

const itemJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  cost: Joi.number().min(1).max(10000),
});

const validItem = function (item) {
  return itemJoiSchema.validate(item);
};

itemSchema.index({ name: 1 });
const Item = mongoose.model("Item", itemSchema);

module.exports = { Item, validItem };
