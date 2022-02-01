// Prices for services and ticket
const prices = require('../server_data/FestariPrices')

// calculate days
const calcDaySum = (days) => {
   let sum = days * prices.paivalippu
   if (days === 2) {
      let disc = prices.alennus2pv / 100
      sum = sum - sum * disc
   }
   if (days === 3) {
      let disc = prices.alennus3pv / 100
      sum = sum - sum * disc
   }
   return sum
}

// Calculate services
const calcServSum = (selections) => {
   let sum = 0
   selections.forEach(element => {
      if (element === 'majoitus') {
         sum = sum + prices.majoitus
      }
      if (element === 'suihku') {
         sum = sum + prices.suihku
      }
      if (element === 'lounas') {
         sum = sum + prices.lounas
      }
   })
   return sum
}

// Input days and service selections as object.
// Returns total sum of tickets and services as json
const calcTicketSum = (data) => {
   let sum = 0
   sum = sum + calcDaySum(data.days)
   sum = sum + calcServSum(data.selections)
   return {"ticketSum": sum}
}

module.exports = calcTicketSum