const express = require('express')
const app = express()
const cors = require('cors')
const calcTicketSum = require('./server_modules/CalcTicketSum')
const festariPrices = require('./server_data/FestariPrices')

app.use(express.json())
app.use(cors())

// request brings selected days and response sends sum of the
// order to the front end
app.post('/api/calcTicketSum', (req, res) => {
   const body = req.body
   res.send(calcTicketSum(body))
})

// Return prices to front end
app.get('/api/prices', (req, res) => {
   res.json(festariPrices)
})

// Server listens localhost port 5000
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})