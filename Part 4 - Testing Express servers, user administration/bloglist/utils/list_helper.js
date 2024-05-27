const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, b) => totalLikes + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  let blogWithMaxLikes = {}
  let maxLikes = -1

  blogs.forEach((b) => {
    if (b.likes > maxLikes) {
      maxLikes = b.likes
      blogWithMaxLikes = b
    }
  })

  return blogWithMaxLikes
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return {}
  let authorToFreq = {}
  let maxBlogs = 0
  let topAuthor = ''

  blogs.forEach((b) => {
    const author = b.author
    authorToFreq[author] = 1 + (authorToFreq[author] ?? 0)
    if (authorToFreq[author] > maxBlogs) {
      maxBlogs = authorToFreq[author]
      topAuthor = author
    }
  })

  return { author: topAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return {}
  let authorToLikes = {}
  let maxLikes = 0
  let topAuthor = ''

  blogs.forEach((b) => {
    const author = b.author
    authorToLikes[author] = b.likes + (authorToLikes[author] ?? 0)
    if (authorToLikes[author] > maxLikes) {
      maxLikes = authorToLikes[author]
      topAuthor = author
    }
  })

  return { author: topAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
