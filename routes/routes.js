const express = require('express')
const axios = require('axios')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

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

    type CountryCase {
        Country: String,
        CountryCode: String,
        Province: String,
        City: String,
        CityCode: String,
        Lat: String,
        Lon: String,
        Cases: Int,
        Status:  String,
        Date:  String
    }

    type Query {
        hello: String,
        cases: [Cases],
        countries: [Countries],
        countrycases: [CountryCase],
        getCountryCase(countrySlug: String!): CountryCase
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
    countrycases: () => {
        var data = []
        data = getCountryCases()
        return data
    },
    getCountryCase: ({countrySlug}) => {
        var data = []
        data = getCountry_Cases(countrySlug)
        return data
    }
};

router.get('/summary', async (req, res) => {
    try {
        const response = await axios.get('https://api.covid19api.com/summary')
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error);
    }
})

router.get('/world', async (req, res) => {
    try {
        const response = await axios.get('https://api.covid19api.com/world')
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error);
    }
})

router.get('/news', async (req, res) => {
    URL = "https://newsapi.org/v2/everything?q=covid19&sortBy=publishedAt&apiKey=53b8f261e3ac4b1d8cced017462c4c22"
    try {
        const response = await axios.get(URL)
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error);
    }
})

router.get('/country/:countryslug', async (req, res) => {
    const slug = req.params.countryslug
    try {
        const response = await axios.get(`https://api.covid19api.com/dayone/country/${slug}`)
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error);
    }
})

router.get('/country/:slug/from/:fromdate/to/:todate', async (req, res) => {
    const { slug, fromdate, todate } = req.params 
    try {
        const response = await axios.get(`https://api.covid19api.com/country/${slug}?from=${fromdate}T00:00:00Z&to=${todate}T00:00:00Z`)
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

const getCountryCases = async () => {
    const response = await axios.get(`https://api.covid19api.com/dayone/country/costa-rica/status/confirmed`)
    return response.data
}

const getCountry_Cases = async ({countrySlug}) => {
    const response = await axios.get(`https://api.covid19api.com/dayone/country/${countrySlug}/status/confirmed`)
    return response.data
}
router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

module.exports = router