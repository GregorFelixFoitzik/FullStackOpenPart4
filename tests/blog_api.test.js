const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')

const api = supertest(app)

describe('testing backend for blogs:', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // https://stackoverflow.com/a/69302548
  test('verify id property of blog posts', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
      assert( blog.id !== undefined)
      assert( blog._id === undefined)
    })
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Gregor',
      url: 'https://www.google.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.title === 'Test Blog')

    assert(addedBlog)
    assert.strictEqual(addedBlog.author, 'Gregor')
    assert.strictEqual(addedBlog.url, 'https://www.google.com')
    assert.strictEqual(addedBlog.likes, 4)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog wihtout likes',
      author: 'Gregor',
      url: 'https://www.google.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.title === 'Test Blog wihtout likes')

    assert(addedBlog)
    assert.strictEqual(addedBlog.author, 'Gregor')
    assert.strictEqual(addedBlog.url, 'https://www.google.com')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test.only('an invalid blog responds with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Gregor',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})