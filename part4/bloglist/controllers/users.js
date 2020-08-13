const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    if (request.body.password && request.body.password.length >= 3){
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

        const user = new User({
            username: request.body.username,
            name: request.body.name,
            passwordHash
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } else {
        return response.status(400).json({'error':'Invalid password'})
    }
})

module.exports = usersRouter