const express = require('express')
const cors = require('cors')
const app = express()
const request = require('request')

const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        start: 1,
        limit: 5000,
        convert: 'USD'
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
        'Access-Control-Allow-Origin': '*',
        'X-CMC_PRO_API_KEY': '6ae65f3b-d149-4512-a292-204a2320f848'
    },
    json: true,
    gzip: true
};

app.use(cors())

app.get('/:coin', function (req, res) {
    request('https://graphs2.coinmarketcap.com/currencies/' + req.params.coin, requestOptions, function (err, response, body) {
        res.json(JSON.parse(body));
    })
})

app.get('/ticker/:coin', function (req, res) {
    request('https://pro-api.coinmarketcap.com/v1/ticker/' + req.params.coin, requestOptions, function (err, response, body) {
        res.json(JSON.parse(body));
    })
})

app.listen(8000, () => console.log('Example app listening on port 3000!'))