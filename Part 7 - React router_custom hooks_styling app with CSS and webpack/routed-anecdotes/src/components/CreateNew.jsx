import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreateNew = ({ addNew, setNotification }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      url,
      votes: 0,
    });
    setNotification(`Created: ${content}`);
    setContent('');
    setAuthor('');
    setUrl('');
    navigate('/');
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='create-content'>Content</label>
          <input
            id='create-content'
            name='content'
            type='text'
            autoComplete='off'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='create-author'>Author</label>
          <input
            id='create-author'
            name='author'
            type='text'
            autoComplete='off'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='create-url'>Url</label>
          <input
            id='create-url'
            name='url'
            type='url'
            autoComplete='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default CreateNew;
