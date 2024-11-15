const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // if multiple blogs have the same number of likes, the first one is returned
  return blogs.reduce((blog, favorite) => blog.likes >= favorite.likes ? blog : favorite)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = blogs.reduce((ath, blog) => {
    ath[blog.author] = (ath[blog.author] || 0) + 1
    return ath
  }, {})
  
  const authorWithMostBlogs = Object.keys(authors).reduce((current, most) => authors[current] > authors[most] ? current : most)
  return { author: authorWithMostBlogs, blogs: authors[authorWithMostBlogs] }

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = blogs.reduce((ath, blog) => {
    ath[blog.author] = (ath[blog.author] || 0) + blog.likes
    return ath
  }, {})
  
  const authorWithMostBlogs = Object.keys(authors).reduce((current, most) => authors[current] > authors[most] ? current : most)
  return { author: authorWithMostBlogs, likes: authors[authorWithMostBlogs] }

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}