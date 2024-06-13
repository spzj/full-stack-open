import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const storedUserKey = "bloglistUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storedUserKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      )}

      {user && (
        <div>
          <h2>Blogs</h2>
          <div>{user.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
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
