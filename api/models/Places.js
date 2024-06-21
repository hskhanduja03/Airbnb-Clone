const mongoose = require("mongoose")

const placeSchema = mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:String,
    address:String,
    description:String,
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    photos:[String],
    perks:[String],
    maxGuests:Number
})

const PlaceModel = mongoose.model('Place', placeSchema)

module.exports = PlaceModel;