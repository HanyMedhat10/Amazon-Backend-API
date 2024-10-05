const mongoose = require("mongoose");
const ratingSchema = require("./rating");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true /* delete space around the string */,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  // images: {
  // type: Array,
  // default: [],
  // },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  
  ratings: [ratingSchema],
  // userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = {Product, productSchema};
