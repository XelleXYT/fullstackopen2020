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

  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)