const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {author:1,title:1,url:1})
    
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    if (!request.body.password || request.body.password.length <= 3) {
        return response.status(400).json({
            'error':'Invalid password'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const user = new User(
        {
            username: request.body.username,
            name: request.body.name,
            passwordHash
        }
    )

    const result = await user.save()
    response.status(201).json(result)
})

module.exports = usersRouter