const mongoose = require('mongoose')
const Schema = mongoose.Schema

const habitantSchema = new Schema({
    name: String,
    age: Number,
    homeId: String
})

module.exports = mongoose.model('Habitant',habitantSchema)