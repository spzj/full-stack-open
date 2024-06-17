const { test, before, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
const routePath = '/api/users'

describe('when there are some initial users saved', () => {
  before(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('all users are returned as json', async () => {
    const response = await api
      .get(routePath)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialUsers.length)
  })
})

describe('when adding a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('succeeds with statuscode 201 if data is complete', async () => {
    await api
      .post(routePath)
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map((u) => u.username)

    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
    assert(usernames.includes(helper.newUser.username))
  })

  test('fails with status code 400 if username is missing', async () => {
    const newUserWithoutUsername = { ...helper.newUser }
    delete newUserWithoutUsername.username

    await api.post(routePath).send(newUserWithoutUsername).expect(400)
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('fails with status code 400 if username is less than 3 characters', async () => {
    const newUser = {
      username: 'a',
      name: 'testuser3',
      password: '123',
    }

    await api.post(routePath).send(newUser).expect(400)
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('fails with status code 400 if password is missing', async () => {
    const newUserWithoutPassword = { ...helper.newUser }
    delete newUserWithoutPassword.password

    await api.post(routePath).send(newUserWithoutPassword).expect(400)
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('fails with status code 400 if password is less than 3 characters', async () => {
    const newUser = {
      username: 'testuser3',
      name: 'testuser3',
      password: '1',
    }

    await api.post(routePath).send(newUser).expect(400)
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
