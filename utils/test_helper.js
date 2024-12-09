const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const request = require('supertest')(app)


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const loginUser = async () => {
  const response = await request
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })
  return response.body.token
}

module.exports = {
  blogsInDb,
  usersInDb,
  loginUser
}