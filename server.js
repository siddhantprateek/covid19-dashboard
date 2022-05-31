const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// const { ApolloServer, gql } = require('apollo-server');

const app = express()
const PORT = process.env.PORT || 4000


// data


// The root provides a resolver function for each API endpoint


// middleware
app.use(express.json())
app.use(cors())


// routes
app.use('/', router)

app.get('/', (req, res) => {
    res.send('server running marvellously')
})

app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})