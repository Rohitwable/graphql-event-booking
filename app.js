const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')
const app = express()


app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))
mongoose.
    connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ds221416.mlab.com:21416/${process.env.MONGO_DB}`)
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })

