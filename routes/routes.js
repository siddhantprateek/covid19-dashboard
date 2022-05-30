const express = require('express')
const axios = require('axios')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const router = express.Router()

var schema = buildSchema(`
    type Cases {
        NewConfirmed: String,
        TotalConfirmed: String,
        NewDeaths: String,
        TotalDeaths: String,
        NewRecovered: String,
        TotalRecovered: String,
    }

    type Book {
        title: String
        author: String
    }

    type Query {
        hello: String,
        cases: [Cases],
        books: [Book]
    }
`);

var root = {
    hello: () => {
        return 'Hello world!';
    },
    cases: () => cases,
    books: () => books,
};

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const cases = [
    {
        NewConfirmed: '742188',
        TotalConfirmed: '411117686',
        NewDeaths: '3002',
        TotalDeaths: '5811650',
        NewRecovered: '0',
        TotalRecovered: '0',
    },
    {
        NewConfirmed: '888676',
        TotalConfirmed: '414591874',
        NewDeaths: '6973',
        TotalDeaths: '5832881',
        NewRecovered: '0',
        TotalRecovered: '0',
    },
];



router.get('/world', async (req, res) => {
    try {
        const response = await axios.get('https://api.covid19api.com/world')
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error);
    }
})

router.get('/summary', async (req, res) => {
    try {
        const response = await axios.get('https://api.covid19api.com/summary')
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error);
    }
})

router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

module.exports = router