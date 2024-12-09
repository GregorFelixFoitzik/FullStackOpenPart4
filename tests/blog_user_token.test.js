const mongoose = require('mongoose')
const app = require('../app')
const request = require('supertest')(app)
const assert = require('assert')
const { describe, test, before, after } = require('node:test')
const helper = require('../utils/test_helper') // Ensure this path is correct


describe('first tries', () => {
  var auth = {}
  before(async () => {
    await helper.loginUser(auth)
  })


  test('should require authorization', async () => {
    request
      .get('/api/blogs')
      .expect(401)
  })

  test('should respond with JSON array', async () => {
    await request
      .get('/api/blogs')
      .set('Authorization', 'Bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/)

    const response = await request.get('/api/blogs')
    console.log('response.body', response.body)
    assert(response.body.length > 0)

  })

  // test('post valid blog', async () => {
  //   const newBlog = {
  //     title: 'Test Blog 420',
  //     author: 'GregorFoitzik',
  //     url: 'http://testurl.com',
  //     likes: 5
  //   }

  //   await request
  //     .post('/api/blogs')
  //     .set('Authorization', 'Bearer ' + auth.token)
  //     .send(newBlog)
  //     .expect(201)
  //     .expect('Content-Type', /json/)

  //   const response = await request.get('/api/blogs')
  //   console.log('response.body', response.body)
  //   const blogs = response.body

  //   const addedBlog = blogs.find(blog => blog.title === 'Test Blog 420')
  //   console.log('addedBlog', addedBlog)
  //   // assert(addedBlog)
  //   assert.strictEqual(addedBlog.author, 'GregorFoitzik')
  //   assert.strictEqual(addedBlog.url, 'http://testurl.com')
  //   assert.strictEqual(addedBlog.likes, 5)
  // })
})

after(async () => {
  await mongoose.connection.close()
})