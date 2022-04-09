require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fetch = require('cross-fetch')

const app = express()
let port = process.env.PORT || 9999

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// get OneMap Token
app.post('/getToken', (req,res) => {
    // console.log(req.body.data1, "da body")
    // console.log(req.params)
    fetch('https://developers.onemap.sg/privateapi/auth/post/getToken', {
        method: 'POST',
        headers: {
        'cache-control': 'no-cache, max-age=0',
        'content-type': 'application/json'
        },
        body: JSON.stringify({
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    })
    }).then(response => {
        return response.json()
    })
    .then(data => res.json(data))
    .catch(error => console.log(error))
})

// OneMap Routing Service
app.post('/route', (req,res) => {
    
    const url = `https://developers.onemap.sg/privateapi/routingsvc/route?start=${req.body.start}&end=${req.body.end}&routeType=${req.body.routeType}&token=${req.body.token}`
    
    fetch(url, {
        method: 'GET',
        headers: {
        'cache-control': 'no-cache, max-age=0',
        'content-type': 'application/json'
        },
        // body: req.body,
    }).then(response => {
        return response.json()
    })
    .then(data => res.json(data))
    .catch(error => console.log(error))
})



app.listen(port)