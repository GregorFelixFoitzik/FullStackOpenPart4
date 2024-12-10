const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
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

const initializeTestDatabase = async () => {
  await User.deleteMany({})

  // this user will be always in the test db
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    username: 'root',
    passwordHash: passwordHash,
    blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8'],
  })
  await user.save()


  const rootUser = await User.findOne({ username: 'root' })
  const initialNotes = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: rootUser.id,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: rootUser.id,
      __v: 0
    }
  ]
  await Blog.deleteMany({})
  let blogObject = new Blog(initialNotes[0])
  await blogObject.save()
  blogObject = new Blog(initialNotes[1])
  await blogObject.save()
}

module.exports = {
  blogsInDb,
  usersInDb,
  loginUser,
  initializeTestDatabase
}