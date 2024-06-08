const { test, before, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const routePath = '/api/blogs'

describe('when there are some initial blogs saved', () => {
  before(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('all blogs are returned as json', async () => {
    const response = await api
      .get(routePath)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('when retrieving a specific blog by id', () => {
  before(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

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
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeeds with statuscode 201 if data is complete', async () => {
    await api
      .post(routePath)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

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
      .expect(201)
      .expect('Content-Type', /application\/json/)

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

    await api.post(routePath).send(newBlogWithoutTitle).expect(400)
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('fails with status code 400 if url is missing', async () => {
    const newBlogWithoutUrl = { ...helper.newBlog }
    delete newBlogWithoutUrl.url

    await api.post(routePath).send(newBlogWithoutUrl).expect(400)
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('when deleting an existing blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeeds with statuscode 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`${routePath}/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((b) => b.title)

    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const validNonexistingId = await helper.nonExistingId()

    await api.delete(`${routePath}/${validNonexistingId}`).expect(404)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const invalidId = '123'

    await api.delete(`${routePath}/${invalidId}`).expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('when updating an existing blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('succeeds with statuscode 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`${routePath}/${blogToUpdate.id}`)
      .send(helper.newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((b) => b.title)

    assert(titles.includes(helper.newBlog.title))
    assert(!titles.includes(blogToUpdate.title))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('fails with statuscode 404 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const validNonexistingId = await helper.nonExistingId()

    await api
      .put(`${routePath}/${validNonexistingId}`)
      .send(helper.newBlog)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((b) => b.title)

    assert(!titles.includes(helper.newBlog.title))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const invalidId = '123'

    await api.put(`${routePath}/${invalidId}`).send(helper.newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((b) => b.title)

    assert(!titles.includes(helper.newBlog.title))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
