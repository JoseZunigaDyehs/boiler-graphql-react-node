const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())

mongoose.connect('mongodb://admin:cipres8893@ds143573.mlab.com:43573/test-graphql-node', { useNewUrlParser: true })
mongoose.connection.once('open',()=>{
    console.log('connectado con mongo');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000,()=>{
    console.log('EN EL PUERTO 4000')
})