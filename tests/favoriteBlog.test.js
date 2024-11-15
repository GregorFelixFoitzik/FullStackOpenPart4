const { test, describe } = require('node:test')
const assert = require('node:assert')
const func = require('../utils/list_helper').favoriteBlog
const { singleBlog, multipleBlogsMultipleFav, multipleBlogsSingleFav } = require('../utils/for_testing')

describe('select favorite blog', () => {

  test('of multiple blogs with one favorite', () => {
    const result = func(multipleBlogsSingleFav)
    assert.deepStrictEqual(result, 
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
    )
  })

  test('of a single blog', () => {
    const result = func(singleBlog)
    assert.deepStrictEqual(result, 
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    )
  })

  test('of multiple blogs with multiple favorites', () => {
    const result = func(multipleBlogsMultipleFav)
    assert.deepStrictEqual(result, 
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 12,
        __v: 0
      }
    )
  })

  test('of an empty list', () => {
    const result = func([])
    assert.deepStrictEqual(result, null)
  })


})