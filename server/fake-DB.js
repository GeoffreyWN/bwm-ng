const Rental = require('./models/rental')
const User = require('./models/user')
const Booking = require('./models/booking')
const fakeDbData = require('./data.json')

class fakeDB {
    constructor() {
        ﻿this.rentals = fakeDbData.rentals;

            this.users = fakeDbData.users
    }

    async cleanDb() {
        await Rental.deleteMany({})
        await User.deleteMany({})
        await Booking.deleteMany({})
    }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.rentals.forEach((rentals)=>{
            const newRental = new Rental(rentals)

            newRental.user = user
            user.rentals.push(newRental)

            newRental.save()
        })

        user.save()
        user2.save()
    }

    async seedDb() {
      await  this.cleanDb();
        this.pushDataToDb();
    }
}



module.exports = fakeDB;