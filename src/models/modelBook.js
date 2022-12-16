const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    nameBook: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('book', bookSchema)

module.exports = Book