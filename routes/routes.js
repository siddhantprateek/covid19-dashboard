const express = require('express')
const axios = require('axios')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const res = require('express/lib/response');

const router = express.Router()

var schema = buildSchema(`
    type Cases {
        NewConfirmed: Int,
        TotalConfirmed: Int,
        NewDeaths: Int,
        TotalDeaths: Int,
        NewRecovered: Int,
        TotalRecovered: Int,
        Date: String
    }

    type Countries {
        Country: String,
        Slug: String,
        ISO2: String
    }

    type Query {
        hello: String,
        cases: [Cases],
        countries: [Countries],
    }
`);

var root = {
    hello: () => {
        return 'Hello world!';
    },
    cases: () => {
        var cases = []
        cases = getCases()
        return cases
    },
    countries: () => {
        var countries = []
        countries = getCountries()
        return countries
    },
};

router.get('/summary', async (req, res) => {
    try {
        const response = await axios.get('https://api.covid19api.com/summary')
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error);
    }
})

const getCountries = async () => {
    const response = await axios.get('https://api.covid19api.com/countries')
    return response.data
}

const getCases = async () => {
    const response = await axios.get('https://api.covid19api.com/world')
    return response.data
}


router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

module.exports = router