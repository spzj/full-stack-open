import { useState, useEffect } from 'react'

import CreateBlogForm from './components/CreateBlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Modal from './components/Modal'
import Notification from './components/Notification'
import NotificationType from './constants'

import blogService from './services/blogs'
import loginService from './services/login'
import styles from './styles/app.module.css'

const storedUserKey = 'bloglistUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notifMessage, setNotifMessage] = useState('')
  const [notifType, setNotifType] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storedUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleOpenModal = () => setOpenModal(true)
  const closeModal = () => setOpenModal(false)

  const showNotification = (type, message, duration = 1500) => {
    setNotifType(type)
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, duration)
  }

  const handleLogin = async (loginDetails) => {
    try {
      const user = await loginService.login(loginDetails)

      window.localStorage.setItem(storedUserKey, JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      // Prevents notification messages from carrying over after login
      setNotifMessage('')
      setNotifType('')
    } catch (exception) {
      console.log(exception)
      showNotification(NotificationType.ERROR, 'Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(storedUserKey)
    setUser(null)

    // Prevents notification messages from carrying over after logout
    setNotifMessage('')
    setNotifType('')
  }

  const createBlog = async (blogDetails) => {
    try {
      const newBlog = await blogService.create(blogDetails)
      newBlog.user = user
      setBlogs((prevBlogs) => [...prevBlogs, newBlog])
      showNotification(NotificationType.SUCCESS, 'Blog created')
    } catch (exception) {
      console.log(exception)
      showNotification(NotificationType.ERROR, 'Blog failed to be created')
    }
  }

  const updateLikes = async (blogDetails) => {
    try {
      blogDetails.likes++
      const newBlog = await blogService.update(blogDetails.id, blogDetails)
      newBlog.user = blogDetails.user
      const updatedBlogs = blogs
        .map((blog) => (blog.id === blogDetails.id ? newBlog : blog))
        .sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (blogDetails) => {
    try {
      if (confirm('Delete blog post?')) {
        await blogService.remove(blogDetails.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogDetails.id))
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      {!user && (
        <div className={styles.loginContainer}>
          <LoginForm handleLogin={handleLogin} />
          <Notification message={notifMessage} type={notifType} />
        </div>
      )}

      {user && (
        <div className={styles.homeContainer}>
          <div className={styles.sideBar}>
            <div className={styles.userContainer}>
              <span aria-label="Bloglist Logo" className={styles.logo}>
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#1DA1F2"
                    d="M43.875,301.17c2.417,-8.751 5.292,-16.378 8.625,-22.879c3.333,-6.501 6.625,-12.919 9.875,-19.253c3.25,-6.334 6.083,-13.46 8.5,-21.378c2.417,-7.918 3.792,-16.212 4.125,-24.88c0.5,-14.335 -4.083,-23.67 -13.75,-28.004c-10.593,-6.413 -22.216,-10.29 -33.856,-14.173c-9.292,-3.1 -18.595,-6.203 -27.394,-10.603c6.021,-5.327 11.93,-10.98 17.862,-16.654c9.86,-9.431 19.783,-18.923 30.388,-27.082c-10.333,-6.834 -15.5,-16.586 -15.5,-29.255c0,-9.168 3.583,-17.211 10.75,-24.129c7.167,-6.918 14.917,-10.377 23.25,-10.377c7.167,0 13.75,2.876 19.75,8.627c6,5.751 10.75,12.127 14.25,19.128c-1.167,-7.835 -1.25,-15.127 -0.25,-21.879c1,-6.751 4.042,-12.835 9.125,-18.253c5.083,-5.417 12.208,-8.126 21.375,-8.126c9.333,0 17.333,3.376 24,10.127c6.667,6.751 10,14.96 10,24.629c0,7.834 -2.417,15.002 -7.25,21.503c1.333,0.167 2.583,0.417 3.75,0.751c1.167,0.333 2.167,0.625 3,0.875c0.833,0.25 1.75,0.708 2.75,1.375c1,0.667 1.792,1.125 2.375,1.375c0.583,0.25 1.333,0.917 2.25,2c0.917,1.084 1.542,1.751 1.875,2.001c0.333,0.25 1.042,1.125 2.125,2.625c1.083,1.501 1.75,2.459 2,2.876c0.25,0.417 1,1.583 2.25,3.5c1.25,1.917 2.042,3.126 2.375,3.626c5,7.335 9.708,18.336 14.125,33.005c4.417,14.67 8.167,28.88 11.25,42.633c3.083,13.752 5.208,21.962 6.375,24.629c9.5,8.168 19.792,15.044 30.875,20.628c11.083,5.585 21.292,8.46 30.625,8.627c10.5,0.166 21.792,-2.876 33.875,-9.127c12.083,-6.251 23.417,-14.127 34,-23.629c10.583,-9.501 20.833,-20.087 30.75,-31.755c9.917,-11.669 18.417,-22.754 25.5,-33.256c7.083,-10.501 12.708,-20.003 16.875,-28.504c2.5,7.001 4.5,13.293 6,18.878c1.5,5.584 2.667,12.919 3.5,22.003c0.833,9.085 0.542,17.295 -0.875,24.63c-1.417,7.334 -4.625,15.127 -9.625,23.378c-5,8.252 -11.917,15.461 -20.75,21.629c0.333,0.333 2.583,0.625 6.75,0.875c4.167,0.25 8.542,0.75 13.125,1.5c4.583,0.751 9.458,3.293 14.625,7.627c5.167,4.334 9,10.251 11.5,17.753c-8.833,0 -16.667,2.708 -23.5,8.126c-6.833,5.418 -11.167,10.96 -13,16.628c5.833,-1.334 13.75,0.792 23.75,6.376c10,5.584 16.583,13.044 19.75,22.379c-7.5,0.666 -13.417,3.25 -17.75,7.751c-4.333,4.501 -8.667,12.502 -13,24.004c-5.667,15.336 -14.625,27.921 -26.875,37.756c-12.25,9.835 -25.792,16.336 -40.625,19.504c-14.833,3.167 -30.583,4.25 -47.25,3.25c-16.667,-1 -32.375,-4.001 -47.125,-9.001c-14.75,-5.001 -28.042,-11.461 -39.875,-19.379c-11.833,-7.918 -20.5,-16.544 -26,-25.879c11.667,27.005 28.583,48.05 50.75,63.136c22.167,15.085 45.5,22.712 70,22.878c18,0.167 36.083,-5.5 54.25,-17.002c-5.167,11.835 -13.375,22.378 -24.625,31.63c-11.25,9.251 -23.5,16.378 -36.75,21.379c-13.25,5 -25.875,8.751 -37.875,11.251c-12,2.501 -22.917,3.918 -32.75,4.251c-61.833,1.834 -109.75,-10.752 -143.75,-37.756c-34,-27.005 -50.333,-64.594 -49,-112.769c0.333,-10.002 1.708,-19.378 4.125,-28.13Zm60.125,-141.17c13.255,0 24,-10.745 24,-24c0,-13.255 -10.745,-24 -24,-24c-13.255,0 -24,10.745 -24,24c0,13.255 10.745,24 24,24Z"
                  />
                </svg>
              </span>
              <span className={styles.usernameText}>{user.name}</span>
            </div>
            <button
              aria-label="Logout"
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              <span className={styles.logoutIcon}>
                <svg
                  viewBox="0 -960 960 960"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h292.66v66.67H186.67v586.66h292.66V-120H186.67Zm470.66-176.67-47-48 102-102H360v-66.66h351l-102-102 47-48 184 184-182.67 182.66Z" />
                </svg>
              </span>
              <span className={styles.logoutText}>Logout</span>
            </button>
          </div>

          <div className={styles.feedContainer}>
            <div className={styles.headerSticky}>
              <div className={styles.headerContainer}>
                <h2>Blogs</h2>
                <button
                  aria-label="Create Blog"
                  type="button"
                  className={styles.createButton}
                  onClick={handleOpenModal}
                >
                  Create
                </button>
              </div>
            </div>
            <div className={styles.blogs}>
              {blogs.map((blog) => (
                <div className={styles.blogContainer} key={blog.id}>
                  <Blog
                    blog={blog}
                    user={user}
                    updateLikes={updateLikes}
                    deleteBlog={deleteBlog}
                  />
                </div>
              ))}
            </div>
          </div>
          <Modal openModal={openModal} closeModal={closeModal}>
            <CreateBlogForm createBlog={createBlog} />
            <Notification type={notifType} message={notifMessage} />
          </Modal>
        </div>
      )}
    </div>
  )
}

export default App
