const PORT = process.env.PORT || 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://coinmarketcap.com/'

axios(url)
    .then(response => {
    const html = response.data
    const coins = []
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

        app.get('/coins', function (req, res) {
        res.send(coins.splice(1,10))
        })
}).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json('Welcome to  Crypto API.')
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))