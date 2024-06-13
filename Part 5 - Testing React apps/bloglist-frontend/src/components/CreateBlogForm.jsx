import formStyles from "../styles/form.module.css";

const CreateBlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleCreateBlog
}) => {
  return (
    <form className={formStyles.form} onSubmit={handleCreateBlog}>
      <div>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        ></input>
        <label>Title</label>
      </div>
      <div>
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
          required
        ></input>
        <label>Author</label>
      </div>
      <div>
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          required
        ></input>
        <label>Url</label>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlogForm;
