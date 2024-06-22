import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('text');
  const author = useField('text');
  const url = useField('url');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0,
    });
    setNotification(`Created: ${content.value}`);
    navigate('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    url.reset();
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
            type={content.type}
            value={content.value}
            onChange={content.onChange}
            autoComplete='off'
          />
        </div>
        <div>
          <label htmlFor='create-author'>Author</label>
          <input
            id='create-author'
            name='author'
            type={author.type}
            value={author.value}
            onChange={author.onChange}
            autoComplete='off'
          />
        </div>
        <div>
          <label htmlFor='create-url'>Url</label>
          <input
            id='create-url'
            name='url'
            type={url.type}
            value={url.value}
            onChange={url.onChange}
            autoComplete='url'
          />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default CreateNew;
