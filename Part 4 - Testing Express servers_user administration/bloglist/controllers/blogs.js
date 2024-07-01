const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user

  if (!blogToDelete) {
    response.status(404).end()
  } else if (blogToDelete.user.toString() === user.id.toString()) {
    await blogToDelete.deleteOne()
    response.status(204).end()
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user
  const blogToUpdate = await Blog.findById(request.params.id)

  if (!blogToUpdate) {
    return response.status(404).end()
  }

  if (blogToUpdate.user.toString() === user.id.toString()) {
    blogToUpdate.set({ title, author, url, likes: likes ? likes : 0 })
  } else if (
    blogToUpdate.title === title &&
    blogToUpdate.author === author &&
    blogToUpdate.url === url &&
    blogToUpdate.likes === likes - 1
  ) {
    blogToUpdate.set({ likes: likes })
  }

  try {
    await blogToUpdate.validate()
    await blogToUpdate.save()
    return response.status(200).json(blogToUpdate)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

module.exports = blogsRouter
