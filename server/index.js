const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const Rental = require('./models/rental')
const FakeDb = require('./fake-DB')
const rentalRouter = require('./routes/rental')

mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(()=>{
    const fakeDB = new FakeDb();

    fakeDB.seedDb();
})

const app = express();

app.use('/api/v1/rentals', rentalRouter)

// app.get('/', (req, res)=> {
//     res.json({"success is here": true})
// })

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port : ${this.PORT}`)
} )
