const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = require('./initial_blogs')

const initialUsers = [
  {
    username: 'user1',
    name: 'User 1',
    passwordHash:
      '$2b$10$uyRc75Ov6eNHkXoKQBgd0.l/APkakBMaMJLvUlvabfINSQ2aqnRda',
  },
  {
    username: 'user2',
    name: 'User 2',
    passwordHash:
      '$2b$10$Hl/8IrfL2bVMGNMHJhvFIOuSquvKfRBH4.LMj.4kUJsGMnDWi1VNC',
  },
]

const initializeDatabase = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  await User.insertMany(initialUsers)
  const users = await User.find({})

  const blogs = initialBlogs.map((b, index) => ({
    ...b,
    user: users[index % initialUsers.length].id,
  }))
  await Blog.insertMany(blogs)

  const savedBlogs = await Blog.find({})
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    user.blogs = savedBlogs
      .filter((_, index) => index % users.length === i)
      .map((b) => b.id)
    await user.save()
  }
}

module.exports = { initializeDatabase }
