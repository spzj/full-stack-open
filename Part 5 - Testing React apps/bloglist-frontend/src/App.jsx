import { useState, useEffect } from "react";

import CreateBlogForm from "./components/CreateBlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const storedUserKey = "bloglistUser";

const App = () => {
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  // Input handlers
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(storedUserKey, JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(storedUserKey);
    setUser(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });

      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      {!user && (
        <LoginForm
          {...{
            handleLogin,
            username,
            handleUsernameChange,
            password,
            handlePasswordChange,
          }}
        />
      )}

      {user && (
        <div>
          <h2>Blogs</h2>
          <div>{user.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
          <h2>Create</h2>
          <CreateBlogForm
            {...{
              title,
              author,
              url,
              handleTitleChange,
              handleAuthorChange,
              handleUrlChange,
              handleCreateBlog,
            }}
          />
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
