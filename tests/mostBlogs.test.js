const { test, describe } = require('node:test')
const assert = require('node:assert')
const func = require('../utils/list_helper').mostBlogs
const { 
  singleBlog, 
  multipleBlogsMultipleFav, 
  multipleBlogsMultipleFavMostActive, 
  multipleBlogsSingleFav 
} = require('../utils/for_testing')

describe('select most active author', () => {


  test('of multiple blogs with one favorite', () => {
    const result = func(multipleBlogsSingleFav)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })

  test('of a single blog', () => {
    const result = func(singleBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of multiple blogs with multiple most active', () => {
    const result = func(multipleBlogsMultipleFav)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 },)
  })

  test('of multiple blogs with multiple most active', () => {
    const result = func(multipleBlogsMultipleFavMostActive)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 },)
  })

  test('of an empty list', () => {
    const result = func([])
    assert.deepStrictEqual(result, null)
  })


})