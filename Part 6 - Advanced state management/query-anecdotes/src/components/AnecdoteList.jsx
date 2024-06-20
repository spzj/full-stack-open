import PropTypes from 'prop-types';
import Anecdote from './Anecdote';

const AnecdoteList = ({ anecdotes }) => {
  return (
    <section id='anecdotes'>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </section>
  );
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};

export default AnecdoteList;
