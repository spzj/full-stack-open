const { test, before, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
const routePath = '/api/blogs'
let TOKEN = ''

describe('blog api tests', () => {
  before(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
    const loginInfo = { username: 'testuser1', password: '123' }
    const response = await api.post('/api/login').send(loginInfo)
    TOKEN = response.body.token
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    const users = await helper.usersInDb()
    const blogs = helper.initialBlogs.map((b) => ({ ...b, user: users[0].id }))
    await Blog.insertMany(blogs)
  })

  describe('when there are some initial blogs saved', () => {
    test('all blogs are returned as json', async () => {
      const response = await api
        .get(routePath)
        .expect('Content-Type', /application\/json/)
        .expect(200)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe('when retrieving a specific blog by id', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]
      blogToView.user = blogToView.user.toString()

      const response = await api
        .get(`${routePath}/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(response.body, blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api.get(`${routePath}/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '123'
      await api.get(`${routePath}/${invalidId}`).expect(400)
    })
  })

  describe('when adding a new blog', () => {
    test('succeeds with statuscode 201 if data is complete', async () => {
      await api
        .post(routePath)
        .send(helper.newBlog)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect('Content-Type', /application\/json/)
        .expect(201)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      assert(titles.includes(helper.newBlog.title))
    })

    test('succeeds with statuscode 201 if missing likes are defaulted to 0', async () => {
      const newBlogWithoutLikes = { ...helper.newBlog }
      delete newBlogWithoutLikes.likes

      await api
        .post(routePath)
        .send(newBlogWithoutLikes)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect('Content-Type', /application\/json/)
        .expect(201)

      const blogsAtEnd = await helper.blogsInDb()
      const savedBlog = blogsAtEnd.find(
        (b) => b.title === newBlogWithoutLikes.title
      )

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      assert(savedBlog.likes === 0)
    })

    test('fails with status code 400 if title is missing', async () => {
      const newBlogWithoutTitle = { ...helper.newBlog }
      delete newBlogWithoutTitle.title

      await api
        .post(routePath)
        .send(newBlogWithoutTitle)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 400 if url is missing', async () => {
      const newBlogWithoutUrl = { ...helper.newBlog }
      delete newBlogWithoutUrl.url

      await api
        .post(routePath)
        .send(newBlogWithoutUrl)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with statuscode 401 if token is invalid', async () => {
      await api
        .post(routePath)
        .send(helper.newBlog)
        .set({ Authorization: 'Bearer invalidtokenstring' })
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      assert(!titles.includes(helper.newBlog.title))
    })
  })

  describe('when deleting an existing blog', () => {
    test('succeeds with statuscode 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`${routePath}/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(!titles.includes(blogToDelete.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const invalidId = '123'

      await api
        .delete(`${routePath}/${invalidId}`)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with statuscode 401 if token is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`${routePath}/${blogToDelete.id}`)
        .set({ Authorization: 'Bearer invalidtokenstring' })
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(titles.includes(blogToDelete.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const validNonexistingId = await helper.nonExistingId()

      await api
        .delete(`${routePath}/${validNonexistingId}`)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  describe('when updating an existing blog', () => {
    test('succeeds with statuscode 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`${routePath}/${blogToUpdate.id}`)
        .send(helper.newBlog)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(titles.includes(helper.newBlog.title))
      assert(!titles.includes(blogToUpdate.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const invalidId = '123'

      await api
        .put(`${routePath}/${invalidId}`)
        .send(helper.newBlog)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(!titles.includes(helper.newBlog.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with statuscode 401 if token is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`${routePath}/${blogToUpdate.id}`)
        .send(helper.newBlog)
        .set({ Authorization: 'Bearer invalidtokenstring' })
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(!titles.includes(helper.newBlog.title))
      assert(titles.includes(blogToUpdate.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with statuscode 404 if id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const validNonexistingId = await helper.nonExistingId()

      await api
        .put(`${routePath}/${validNonexistingId}`)
        .send(helper.newBlog)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((b) => b.title)

      assert(!titles.includes(helper.newBlog.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
