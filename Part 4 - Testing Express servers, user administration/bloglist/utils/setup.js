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
  await User.insertMany(initialUsers)

  const users = await User.find({})
  const blogs = initialBlogs.map((b, index) => ({ ...b, user: users[index % initialUsers.length].id }))

  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
}

module.exports = { initializeDatabase }
