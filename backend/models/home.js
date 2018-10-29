const mongoose = require('mongoose')
const Schema = mongoose.Schema

const homeSchema = new Schema({
    name: String
})

module.exports = mongoose.model('Home',homeSchema)