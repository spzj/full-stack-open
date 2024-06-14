import { useState, useEffect } from "react";

import CreateBlogForm from "./components/CreateBlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Modal from "./components/Modal";
import Notification from "./components/Notification";
import NotificationType from "./constants";

import blogService from "./services/blogs";
import loginService from "./services/login";
import styles from "./styles/app.module.css";

const storedUserKey = "bloglistUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenModal = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storedUserKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (type, message, duration = 1500) => {
    setNotifType(type);
    setNotifMessage(message);
    setTimeout(() => {
      setNotifMessage(null);
    }, duration);
  };

  const handleLogin = async (loginDetails) => {
    try {
      const user = await loginService.login(loginDetails);

      window.localStorage.setItem(storedUserKey, JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      // Prevents notification messages from carrying over after login
      setNotifMessage(null);
      setNotifType(null);
    } catch (exception) {
      console.log(exception);
      showNotification(NotificationType.ERROR, "Wrong username or password");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(storedUserKey);
    setUser(null);

    // Prevents notification messages from carrying over after logout
    setNotifMessage(null);
    setNotifType(null);
  };

  const createBlog = async (blogDetails) => {
    try {
      const newBlog = await blogService.create(blogDetails);

      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      showNotification(NotificationType.SUCCESS, "Blog created");
    } catch (exception) {
      console.log(exception);
      showNotification(NotificationType.ERROR, "Blog failed to be created");
    }
  };

  return (
    <div>
      {!user && (
        <div className={styles.loginContainer}>
          <LoginForm handleLogin={handleLogin} />
          <Notification message={notifMessage} type={notifType} />
        </div>
      )}

      {user && (
        <div>
          <h2>Blogs</h2>
          <div>{user.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
          <button onClick={handleOpenModal}>Create</button>
          <Modal openModal={openModal} closeModal={closeModal}>
            <CreateBlogForm createBlog={createBlog} />
            <Notification type={notifType} message={notifMessage} />
          </Modal>

          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
