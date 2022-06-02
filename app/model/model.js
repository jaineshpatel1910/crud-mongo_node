var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phone: String
})

module.exports = user = new mongoose.model('User', schema)
