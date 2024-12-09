const { test, after, before, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('../utils/test_helper') // Ensure this path is correct
const Blog = require('../models/blog')
const api = supertest(app)

const user_id = '675769c99da61adfb77ce7c2'

const initialNotes = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: user_id,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: user_id,
    __v: 0
  }
]


describe('testing backend for blogs:', () => {
  let token
  before(async () => {
    token = await helper.loginUser()
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialNotes[0])
    await blogObject.save()
    blogObject = new Blog(initialNotes[1])
    await blogObject.save()
  })

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
      likes: 4,
      user: user_id
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
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
      .set({ Authorization: `Bearer ${token}` })
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

  test('an invalid blog responds with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Gregor',
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(400)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const title = blogsAtEnd.find(blog => blog.title === blogsAtStart[1].title)
    assert(title)

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })


  test('update likes for a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 2
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const updatedResponse = await api.get('/api/blogs')
    const updatedBlogFromDb = updatedResponse.body.find(blog => blog.id === blogToUpdate.id)

    assert(updatedBlogFromDb)
    assert.strictEqual(updatedBlogFromDb.likes, blogToUpdate.likes + 2)
  })

})


after(async () => {
  await mongoose.connection.close()
})