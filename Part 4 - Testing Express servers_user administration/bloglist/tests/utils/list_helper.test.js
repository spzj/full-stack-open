const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../../utils/list_helper')

const listWithNoBlog = []

const listWithOneBlog = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
]

// List taken from https://github.com/fullstack-hy2020/misc/blob/master/blogs_for_test.md
const listOfBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

test('dummy returns one', () => {
  const result = listHelper.dummy(listWithNoBlog)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.favoriteBlog(listWithNoBlog)
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals to that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list returns blog with max likes', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    const blogWithMaxLikes = listOfBlogs[2]
    assert.deepStrictEqual(result, blogWithMaxLikes)
  })
})

describe('most blogs', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.mostBlogs(listWithNoBlog)
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals to author of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = { author: listWithOneBlog[0].author, blogs: 1 }
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list returns author with most blogs', () => {
    const result = listHelper.mostBlogs(listOfBlogs)
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    assert.deepStrictEqual(result, expected)
  })
})

describe('most likes', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.mostLikes(listWithNoBlog)
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals to author of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = { author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes }
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list returns author with most likes', () => {
    const result = listHelper.mostLikes(listOfBlogs)
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    assert.deepStrictEqual(result, expected)
  })
})
