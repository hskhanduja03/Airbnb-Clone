const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    guests: {
      type: Number,
      required: true
    },
    stayNights: {
      type: Number,
      required: true
    }
  });
  
  const bookingModel = mongoose.model('Booking', bookingSchema);
  
  module.exports = bookingModel;
  
