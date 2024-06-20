import PropTypes from 'prop-types';
import Anecdote from './Anecdote';
import styles from '../styles/anecdoteList.module.css';

const AnecdoteList = ({ anecdotes }) => {
  return (
    <section className={styles.container} id='anecdotes'>
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
