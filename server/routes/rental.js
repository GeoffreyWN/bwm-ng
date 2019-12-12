const express = require('express');
const router = express.Router();
const Rental = require('../models/rental')
const UserCtrl = require('../controllers/user')
const {normalizeErrors} = require('../helpers/mongoose')


router.get('/secret', UserCtrl.authMiddleware, (req, res)=>{
    res.json({"secret": true});
})

router.get('/', (req, res)=>{

    Rental.find({})
          .select('-bookings')
          .exec((err, foundRentals)=>{
            if(err) { 
               return res.status(422).send({errors: normalizeErrors(err.errors)})
            //    return res.status(422).json({errors: {title: 'Error', details: 'UNknown error occurred'}})
               
            }

          return res.status(200).json(foundRentals)
          })
})


router.get('/:id', (req, res)=>{
    const rentalId = req.params.id;

    Rental.findById(rentalId)
          .populate('user', 'username -_id')
          .populate('bookings', ' startAt endAt -_id')
          .exec((err, foundRental)=>{
              if (err) {
                  return res.status(422).send({errors: {title: 'Rental Error', details: 'Rental not found'}})
              }

              return res.json(foundRental)
          })
})

module.exports = router;