import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
  return (
    <article>
      <h2>{anecdote.content}</h2>
      <h3>{anecdote.author}</h3>
      <a href={anecdote.url}>{anecdote.url}</a>
    </article>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
};

export default Anecdote;
