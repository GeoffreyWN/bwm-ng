const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    startAt: {type: Date, required: 'Start DAte is required'},
    endAt: {type: Date, required: 'End at date is required'},
    totalPrice: Number,
    days: Number,
    guests: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rental: {type: Schema.Types.ObjectId, ref: 'Rental' }

})

module.exports = mongoose.model('Booking', bookingSchema)