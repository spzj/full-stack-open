import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { updateAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

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
    <article>
      <div>{anecdote.content}</div>
      <span>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </span>
    </article>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
};

export default Anecdote;
