const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        min: [4, 'Too short, Minimum of 4 characters is expected'] ,
        max: [32, 'Too long, a maximum of 32 characters'],
        required: true
    },
    email:{
        type: String,
        min: [4, 'Too short, Minimum of 4 characters is expected'] ,
        max: [32, 'Too long, a maximum of 32 characters'],
        required: 'Email is required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type: String,
        min: [6, 'Too short, Minimum of 6 characters is expected'] ,
        max: [32, 'Too long, a maximum of 32 characters'],
        required: 'Password is required'
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
})

userSchema.methods.hasSamePassword = function (requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function (next) {
    const user= this;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password= hash;
            next();
        })
    })
})


module.exports = mongoose.model('User', userSchema)