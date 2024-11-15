const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('there are two notes', async () => {
//   const response = await api.get('/api/notes')

//   assert.strictEqual(response.body.length, 2)
// })

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')

//   const contents = response.body.map(e => e.content)
//   // is the argument truthy
//   assert(contents.includes('HTML is easy'))
// })

// https://stackoverflow.com/a/69302548
test.only('verify id property of blog posts', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})


after(async () => {
  await mongoose.connection.close()
})