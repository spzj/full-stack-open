const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name')
  return response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog({
    ...request.body,
    user: user.id,
  })

  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', 'username name')
    .populate('comments', 'content timestamp', 'Comment')

  if (blog) {
    return response.json(blog)
  } else {
    return response.status(404).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user

  if (!blogToDelete) {
    return response.status(404).end()
  } else if (blogToDelete.user.toString() === user.id.toString()) {
    await blogToDelete.deleteOne()
    return response.status(204).end()
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)

  if (!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.set({ ...request.body })
  await blogToUpdate.save()
  return response.status(200).json(blogToUpdate)
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  const comment = new Comment({ ...request.body, blog: blog.id })
  const savedComment = await comment.save()
  blog.comments.push(savedComment.id)
  await blog.save()
  return response.status(200).json(blog)
})

module.exports = blogsRouter
