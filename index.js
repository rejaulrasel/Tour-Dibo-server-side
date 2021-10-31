const express = require('express')
const app = express()
const port = 5000;

app.get('/', (req,res) => {
    res.send('tour dibo server')
})

app.listen(port, () => {
    console.log('running server on port', port)
})