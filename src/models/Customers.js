import mongoose from "mongoose";

const customerCollections = "Customers";

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  terminals: {
    type: Array,
    default: [],
  },
});

export const customerModel = mongoose.model(
  customerCollections,
  customersSchema
);
