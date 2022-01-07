const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.amazon.in/s?i=kitchen&bbn=5925789031&rh=n%3A5925789031%2Cp_85%3A10440599031%2Cp_n_format_browse-bin%3A19560801031%2Cp_72%3A1318476031&pd_rd_r=753c7618-44d0-4af5-8b83-a0ecef550b5b&pd_rd_w=csWkU&pd_rd_wg=T4Q0h&pf_rd_p=c23d85f9-a975-45da-a975-a559eb688bbf&pf_rd_r=T77B1M2XD5EAMR8NZ3BK&ref=pd_gw_unk'

axios(url)
   .then(response => {
       const html = response.data
       const $ = cheerio.load(html);
       const products = []
       $('.s-result-item',html).each(function(){
           const productURL = "https://www.amazon.in" + $(this).find('.a-link-normal').attr('href')
           const imgURL =  $(this).find('.s-image').attr('src')
           const productName =   $(this).find('.s-image').attr('alt')
           const price =  $(this).find('.a-price-symbol').text() + $(this).find('.a-price-whole').text()
           products.push({
               price,
               productName,
               imgURL,
               productURL
           })
       })
        app.get('/', function (req, res) {
        res.send(products)
        })
   }).catch(err => console.log(err))
app.listen(3000 , () => console.log(`server running on PORT 3000`))