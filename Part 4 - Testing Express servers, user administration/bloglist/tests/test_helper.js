const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'testuser1',
    name: 'testuser1',
    passwordHash:
      '$2b$10$abjhgD29HtujQ5Wd6p9m4uAp7QLUtxE4n3IFq6QEF5kePRMTbCig6',
  },
  {
    username: 'testuser2',
    name: 'testuser2',
    passwordHash:
      '$2b$10$/htxmdgrBirfDGOVStMTI.6JXADPEhF5c.jTztYxi5dJVPKWyLCcq',
  },
]

const newUser = {
  username: 'testuser3',
  name: 'testuser3',
  password: '123',
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const newBlog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Temporary blog',
    author: 'Temporary author',
    url: 'someurl',
    likes: 0,
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialUsers,
  newUser,
  usersInDb,
  initialBlogs,
  newBlog,
  nonExistingId,
  blogsInDb,
}
