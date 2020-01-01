const express = require('express');
const router = express.Router();
const Rental = require('../models/rental')
const User = require('../models/user')
const UserCtrl = require('../controllers/user')
const {normalizeErrors} = require('../helpers/mongoose')


router.get('/secret', UserCtrl.authMiddleware, (req, res)=>{
    res.json({"secret": true});
})

router.get('/manage', UserCtrl.authMiddleware, (req, res)=>{
    const user = res.locals.user;

    Rental.where({user})
    .populate('bookings')
    .exec((err, foundRentals)=>{
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }
        return res.json(foundRentals)
    })
});

router.get('/:id', (req, res)=>{
    const rentalId = req.params.id;

    Rental.findById(rentalId)
          .populate('user', 'username -_id')
          .populate('bookings', ' startAt endAt -_id')
          .exec((err, foundRental)=>{
              if (err) {
                  return res.status(422).send({errors: [{title: 'Rental Error', details: 'Rental not found'}]})
              }

              return res.json(foundRental)
          })
})



router.delete('/:id', UserCtrl.authMiddleware, (req, res)=>{
    const user = res.locals.user

    Rental.findById(req.params.id)
    .populate('user', '_id')
    .populate({
        path: 'bookings',
        select: 'startAt',
        match: { startAt: {$gt: new Date()}}
    }).exec((err, foundRental)=>{
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }

        if (user.id !== foundRental.user.id) {
            return res.status(422).send({errors: [{title: 'Invalid user', detail: "You do not own this rental"}]})
        }

        if (foundRental.bookings.length > 0) {
            return res.status(422).send({errors: [{title: 'Active bookings', detail: "This rental has active bookings"}]})
        }

        foundRental.remove((err)=>{
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)})
            }

            return res.json({"status": "deleted"})
        });
    })
});

router.post('', UserCtrl.authMiddleware, (req, res)=>{
    const{title, city, street, category, shared, image, bedrooms, description, dailyRate} = req.body;
    const user = res.locals.user;

    const rental = new Rental({title, city, street, category, shared, image, bedrooms, description, dailyRate})
    rental.user = user;

    Rental.create(rental, (err, newRental)=>{
        if (err) {
            return res.status(422).json({errors: normalizeErrors(err.errors)})
        }
        User.update({_id: user.id}, {$push: {rentals: newRental}}, ()=>{});

    return res.json(newRental)
    }) 
})

router.get('/', (req, res)=>{
    const city = req.query.city
    const query = city? {city: city.toLowerCase()} : {}

        Rental.find(query)
          .select('-bookings')
          .exec((err, foundRentals)=>{
            if(err) { 
               return res.status(422).send({errors: normalizeErrors(err.errors)})
            }

            if( city && foundRentals.length === 0) {
                return res.status(422).send({errors: [{title: 'Sorry, rentals do not exist', detail: `Rentals within ${city} city were not found!`}]})
            }

          return res.status(200).json(foundRentals)
          })
    

})


module.exports = router;