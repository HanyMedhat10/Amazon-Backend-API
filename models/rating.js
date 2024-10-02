const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    userId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    // comment: {
    //     type: String,
    //     required: true
    // },
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //     required: true
    // }
});

// const Rating = mongoose.model("Rating", ratingSchema);

module.exports = ratingSchema;