const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/dev')
const Rental = require('./models/rental')
const FakeDb = require('./fake-DB')
const rentalRouter = require('./routes/rental'),
        userRouter = require('./routes/users')

//db connection and seeding
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(()=>{
    const fakeDB = new FakeDb();

    // fakeDB.seedDb();
})


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
// app.options('/products/:id', cors())
app.use(cors(corsOptions))



app.use('/api/v1/rentals', rentalRouter)
app.use('/api/v1/users', userRouter)



// app.get('/', (req, res)=> {
//     res.json({"success is here": true})
// })

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port : ${this.PORT}`)
} )
