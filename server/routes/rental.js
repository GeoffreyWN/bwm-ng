const express = require('express');
const router = express.Router();
const Rental = require('../models/rental')


router.get('/', (req, res)=>{
    Rental.find({}, (err, data)=>{
        if(err) { throw Error; }

        res.status(200).json(data)
    })
})


router.get('/:id', (req, res)=>{
    const rentalId = req.params.id;
    console.log(req.params.id)
    Rental.findById(req.params.id, (err, data)=>{
        // Rental.findOne({_id: rentalId}, (err, data)=>{
       // if(err) { console.log('error occurred maze'); throw Error; }

       if (err) {
           //status(422) unprocessable entity
        //    res.status(422).send({errors: [{title: 'Rental Error', detail: 'Rental NOT found'}]})
           res.status(422).json('oh noes!' + err);
       }

        res.status(200).json(data)
    })
})

module.exports = router;