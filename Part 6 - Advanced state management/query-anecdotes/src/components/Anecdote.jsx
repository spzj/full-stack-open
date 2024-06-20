import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { updateAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';
import styles from '../styles/anecdote.module.css';

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === newAnecdote.id ? newAnecdote : a))
      );
    },
  });

  const dispatch = useNotificationDispatch();
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'VOTE', payload: anecdote.content });
  };
  return (
    <article className={styles.anecdote}>
      <div>{anecdote.content}</div>
      <div className={styles.voteContainer}>
        <span className={styles.voteCount}>{anecdote.votes}</span>
        <button className={styles.voteButton} onClick={() => handleVote(anecdote)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'>
            <path d='M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z' />
          </svg>
        </button>
      </div>
    </article>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
};

export default Anecdote;
