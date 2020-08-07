const http = require('http')
const express = require('express')
const app = express()

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "+34-612345678"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "+34-622345678"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "+34-632345678"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "+34-642345678"
    }
  ]

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)