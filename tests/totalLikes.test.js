const { test, describe } = require('node:test')
const assert = require('node:assert')
const func = require('../utils/list_helper').totalLikes
const { singleBlog, multipleBlogsMultipleFav, multipleBlogsSingleFav } = require('../utils/for_testing')

describe('total likes', () => {

  test('of all blogs', () => {
    const result = func(multipleBlogsMultipleFav)
    assert.strictEqual(result, 43)
  })

  test('of all blogs', () => {
    const result = func(multipleBlogsSingleFav)
    assert.strictEqual(result, 36)
  })


  test('of a single blog', () => {
    const result = func(singleBlog)
    assert.strictEqual(result, 5)
  })

  test('of an empty list', () => {
    const result = func([])
    assert.strictEqual(result, 0)
  })


})