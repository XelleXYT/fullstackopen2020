const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
        let userObject = new User(user)
        await userObject.save()
    }
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('create a new user', async () => {
    const newUser = {
        username: 'Prueba4',
        name: 'Prueba4',
        password: 'Prueba4'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')

    const usernames = response.body.map(r => r.username)

    expect(response.body).toHaveLength(helper.initialUsers.length+1)
    expect(usernames).toContain('Prueba4')
})

test('failed to create a new invalid user', async () => {
    const newUser = {
        username: 'Prueba5',
        name: 'Prueba5',
        password: 'P5'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
})

afterAll(() => {
    mongoose.connection.close()
})