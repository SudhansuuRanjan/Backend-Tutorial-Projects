const PORT = process.env.PORT || 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()


const sites = [
    {
        name: 'coinmarketcap',
        address: 'https://coinmarketcap.com/',
        base: ''
    },
]

const coins = []

sites.forEach(site => {
  axios.get(site.address)
    .then(response => {
    const html = response.data
    const $ = cheerio.load(html);

        $('tr', html).each(function(){
            const coinName =  $(this).find('.iworPT').text()
            const price = $(this).find('.cLgOOr').text()
            const unit = $(this).find('.gGIpIK').text()

            coins.push({
                coinName,
                price,
                unit
            })
        })
})
})

app.get('/', (req, res) => {
    res.json('Welcome to  Crypto API. Add /coins at the end to get cryptocurrency live prices')
})

app.get('/coins', function (req, res) {
    res.json(coins.slice(1,10))
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))