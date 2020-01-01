const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const bookingCtrl = require('../controllers/booking')

router.post('', userCtrl.authMiddleware, bookingCtrl.createBooking)
router.get('/manage', userCtrl.authMiddleware, bookingCtrl.getUserBookings)

module.exports = router;